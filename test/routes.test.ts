import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { filterTypesenseRoutes, typesenseServerRoutes } from '../src/module'

const srcDir = resolve(__dirname, '../src')
const apiDir = join(srcDir, 'runtime/server/api/typesense')

const handlerFile = (handler: string) => `${join(srcDir, handler)}.ts`

function listHandlerFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory() ? listHandlerFiles(full) : [full]
  })
}

describe('route table', () => {
  it('points every route at an existing handler file', () => {
    const missing = typesenseServerRoutes.filter(r => !existsSync(handlerFile(r.handler)))
    expect(missing).toEqual([])
  })

  it('has no duplicate route and method pairs', () => {
    const keys = typesenseServerRoutes.map(r => `${r.method ?? 'all'} ${r.route}`)
    expect(keys.filter((key, i) => keys.indexOf(key) !== i)).toEqual([])
  })

  it('registers every handler file', () => {
    const registered = new Set(typesenseServerRoutes.map(r => handlerFile(r.handler)))
    const orphans = listHandlerFiles(apiDir).filter(file => !registered.has(file)).map(file => relative(srcDir, file))
    expect(orphans).toEqual([])
  })

  it('wraps every handler with defineTypesenseHandler', () => {
    const unwrapped = listHandlerFiles(apiDir)
      .filter(file => !readFileSync(file, 'utf8').includes('export default defineTypesenseHandler('))
      .map(file => relative(srcDir, file))
    expect(unwrapped).toEqual([])
  })

  it('declares route params that the handlers read', () => {
    const paramPattern = /getRouterParam\(event, '(\w+)'\)/g
    const mismatched = typesenseServerRoutes.flatMap((r) => {
      const source = readFileSync(handlerFile(r.handler), 'utf8')
      return [...source.matchAll(paramPattern)]
        .map(m => m[1])
        .filter(param => !r.route.includes(`:${param}`))
        .map(param => `${r.route} (${param})`)
    })
    expect(mismatched).toEqual([])
  })
})

describe('filterTypesenseRoutes', () => {
  const route = (path: string, method?: 'get' | 'post' | 'put' | 'delete') => ({ route: path, method, handler: './x' })
  const routes = [
    route('/api/typesense/status'),
    route('/api/typesense/collections', 'get'),
    route('/api/typesense/collections', 'post'),
    route('/api/typesense/collections/:name', 'delete'),
    route('/api/typesense/documents/:collection/search', 'post'),
    route('/api/typesense/documents/:collection/multi-search', 'post'),
    route('/api/typesense/documents/:collection/import', 'post'),
    route('/api/typesense/keys', 'get'),
    route('/api/typesense/key/scoped/:key', 'post'),
  ]
  const paths = (list: ReturnType<typeof route>[]) => list.map(r => `${r.method ?? 'all'} ${r.route}`)

  it('keeps everything by default', () => {
    expect(filterTypesenseRoutes(routes)).toEqual(routes)
    expect(filterTypesenseRoutes(routes, {})).toEqual(routes)
  })

  it('readOnly keeps reads, status, search and multi-search only', () => {
    expect(paths(filterTypesenseRoutes(routes, { readOnly: true }))).toEqual([
      'all /api/typesense/status',
      'get /api/typesense/collections',
      'post /api/typesense/documents/:collection/search',
      'post /api/typesense/documents/:collection/multi-search',
      'get /api/typesense/keys',
    ])
  })

  it('excludes by prefix on path segment boundaries', () => {
    const kept = paths(filterTypesenseRoutes(routes, { exclude: ['/api/typesense/key'] }))
    expect(kept).toContain('get /api/typesense/keys')
    expect(kept).not.toContain('post /api/typesense/key/scoped/:key')
  })

  it('ignores trailing slashes and matches exact routes', () => {
    const kept = paths(filterTypesenseRoutes(routes, { exclude: ['/api/typesense/keys/', '/api/typesense/status'] }))
    expect(kept).not.toContain('get /api/typesense/keys')
    expect(kept).not.toContain('all /api/typesense/status')
  })

  it('combines readOnly and exclude', () => {
    const kept = paths(filterTypesenseRoutes(routes, { readOnly: true, exclude: ['/api/typesense/keys'] }))
    expect(kept).not.toContain('get /api/typesense/keys')
    expect(kept).toContain('get /api/typesense/collections')
  })

  it('never lets a real read-only config expose a write route', () => {
    const writes = filterTypesenseRoutes(typesenseServerRoutes, { readOnly: true })
      .filter(r => r.method && r.method !== 'get')
      .map(r => `${r.method} ${r.route}`)
    expect(writes).toEqual([
      'post /api/typesense/documents/:collection/search',
      'post /api/typesense/documents/:collection/multi-search',
    ])
  })
})

import { describe, it, expect, vi } from 'vitest'
import { buildOpenApiDocument } from '../src/openapi'
import { filterTypesenseRoutes, typesenseServerRoutes } from '../src/routes'

const httpMethods = ['get', 'post', 'put', 'patch', 'delete']

const operations = (doc: ReturnType<typeof buildOpenApiDocument>) =>
  Object.entries(doc.paths).flatMap(([path, item]) =>
    Object.entries(item).map(([method, operation]) => ({ path, method, operation: operation as Record<string, any> })), // eslint-disable-line @typescript-eslint/no-explicit-any
  )

describe('buildOpenApiDocument', () => {
  const doc = buildOpenApiDocument(typesenseServerRoutes)

  it('describes an OpenAPI 3.1 document', () => {
    expect(doc.openapi).toBe('3.1.0')
    expect(doc.info.title).toBeTruthy()
    expect(doc.components.schemas.Error).toBeDefined()
    expect(doc.servers).toEqual([{ url: '/' }])
  })

  it('has one operation for every registered route', () => {
    expect(operations(doc)).toHaveLength(typesenseServerRoutes.length)
  })

  it('only uses http methods and OpenAPI path templates', () => {
    for (const { path, method } of operations(doc)) {
      expect(httpMethods).toContain(method)
      expect(path).not.toMatch(/:\w/)
      expect(path.startsWith('/api/typesense/')).toBe(true)
    }
  })

  it('declares every path parameter as required', () => {
    for (const { path, operation } of operations(doc)) {
      const names = [...path.matchAll(/\{(\w+)\}/g)].map(m => m[1])
      expect(operation.parameters.map((p: { name: string }) => p.name)).toEqual(names)
      expect(operation.parameters.every((p: { in: string, required: boolean }) => p.in === 'path' && p.required)).toBe(true)
    }
  })

  it('gives every operation a unique id, a tag from the declared tags and a summary', () => {
    const ops = operations(doc)
    const ids = ops.map(o => o.operation.operationId)
    expect(new Set(ids).size).toBe(ids.length)

    const declared = doc.tags.map(t => t.name)
    for (const { operation } of ops) {
      expect(operation.summary).toBeTruthy()
      expect(declared).toContain(operation.tags[0])
      expect(operation.tags[0]).not.toBe('Other')
    }
  })

  it('treats the method-less status route as a GET', () => {
    expect(doc.paths['/api/typesense/status']).toHaveProperty('get')
  })

  it('merges methods on the same path and documents error responses', () => {
    expect(Object.keys(doc.paths['/api/typesense/collections/{name}'])).toEqual(['get', 'patch', 'delete'])
    const search = doc.paths['/api/typesense/documents/{collection}/search'].post as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(search.summary).toBe('Search a collection')
    expect(search.requestBody.required).toBe(true)
    expect(search.responses.default.content['application/json'].schema.$ref).toBe('#/components/schemas/Error')
  })

  it('marks body-less write routes as not requiring a body and never gives reads a body', () => {
    const clear = doc.paths['/api/typesense/operations/cache/clear'].post as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(clear.requestBody.required).toBe(false)
    for (const { method, operation } of operations(doc)) {
      if (method === 'get' || method === 'delete')
        expect(operation).not.toHaveProperty('requestBody')
    }
  })

  it('only describes the routes that were passed in', () => {
    const readOnly = buildOpenApiDocument(filterTypesenseRoutes(typesenseServerRoutes, { readOnly: true }))
    const methods = operations(readOnly).map(o => o.method)
    expect(methods.filter(m => m !== 'get')).toEqual(['post', 'post'])
    expect(readOnly.paths).not.toHaveProperty('/api/typesense/keys')
    expect(readOnly.tags.map(t => t.name)).not.toContain('API Keys')

    const withoutOps = buildOpenApiDocument(filterTypesenseRoutes(typesenseServerRoutes, { exclude: ['/api/typesense/operations'] }))
    expect(Object.keys(withoutOps.paths).some(p => p.startsWith('/api/typesense/operations'))).toBe(false)
  })

  it('applies custom info', () => {
    const custom = buildOpenApiDocument([], { title: 'My search', version: '2.0.0', description: 'Docs' })
    expect(custom.info).toEqual({ title: 'My search', version: '2.0.0', description: 'Docs' })
    expect(custom.paths).toEqual({})
  })
})

describe('openapi route handler', () => {
  it('serves the generated document', async () => {
    const generated = buildOpenApiDocument(typesenseServerRoutes)
    vi.doMock('#typesense/openapi', () => ({ default: generated }))
    vi.doMock('h3', () => ({ defineEventHandler: <T>(fn: T) => fn }))

    const { default: handler } = await import('../src/runtime/server/openapi.get')
    expect((handler as unknown as () => unknown)()).toBe(generated)
  })
})

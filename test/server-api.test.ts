import { describe, it, expect, vi, afterEach } from 'vitest'
import { validateTypesenseConfig } from '../src/module'
import { useTypesenseServerApi } from '../src/runtime/server/composables/typesenseServerApi'

const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('validateTypesenseConfig', () => {
  it('throws when client mode uses an admin key', () => {
    expect(() => validateTypesenseConfig({
      url: 'http://localhost:8108',
      apiKey: 'admin-key',
      clientMode: true,
    }, { TYPESENSE_ADMIN_KEY: 'admin-key' })).toThrowError(/admin key/i)
  })

  it('warns when required values are missing', () => {
    expect(validateTypesenseConfig({ clientMode: true })).toEqual([
      'Missing Typesense Base Url!',
      'Missing Typesense Api Key!',
      'Client mode requires a search-only API key. Admin keys must stay on the server.',
    ])
  })
})

describe('useTypesenseServerApi', () => {
  it('exposes all api clients', () => {
    const api = useTypesenseServerApi('http://typesense.test', 'key')
    expect(Object.keys(api).sort()).toEqual([
      'analyticsApi',
      'collectionsApi',
      'conversationsApi',
      'curationSetsApi',
      'debugApi',
      'documentsApi',
      'healthApi',
      'keysApi',
      'operationsApi',
      'presetsApi',
      'searchModelsApi',
      'stemmingApi',
      'stopwordsApi',
      'synonymsApi',
    ])
  })

  it('calls the configured base url with the api key header', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true }))
    vi.stubGlobal('fetch', fetchMock)

    const { healthApi } = useTypesenseServerApi('http://typesense.test', 'secret')
    const health = await healthApi.health()

    expect(health.ok).toBe(true)
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('http://typesense.test/health')
    expect(new Headers(init.headers).get('X-TYPESENSE-API-KEY')).toBe('secret')
  })

  it('rejects on non-2xx responses', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope', { status: 401 })))

    const { collectionsApi } = useTypesenseServerApi('http://typesense.test', 'bad')
    await expect(collectionsApi.getCollections()).rejects.toThrow()
  })
})

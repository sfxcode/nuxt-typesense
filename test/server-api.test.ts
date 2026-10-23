import { describe, it, expect, vi, afterEach } from 'vitest'
import { useTypesenseServerApi } from '../src/runtime/server/composables/typesenseServerApi'

const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })

afterEach(() => {
  vi.unstubAllGlobals()
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

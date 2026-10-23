import { describe, it, expect, vi, afterEach } from 'vitest'
import { useTypesenseServerApi } from '../src/runtime/server/composables/typesenseServerApi'

afterEach(() => {
  vi.unstubAllGlobals()
})

const stubFetch = (body: unknown = {}) => {
  const fetchMock = vi.fn(async () => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } }))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

const lastCall = (fetchMock: ReturnType<typeof stubFetch>) => fetchMock.mock.calls.at(-1) as unknown as [string, RequestInit]

// curationSets is supported by Typesense but missing from the upstream OpenAPI spec;
// scripts/patch-api.mjs adds it after code generation.
describe('collection curationSets added by patch-api', () => {
  const api = () => useTypesenseServerApi('http://typesense.test', 'key')

  it('sends curation_sets when updating a collection and reads it back', async () => {
    const fetchMock = stubFetch({ name: 'products', fields: [], curation_sets: ['cur_a'], num_documents: 0, created_at: 1 })
    const result = await api().collectionsApi.updateCollection({
      collectionName: 'products',
      collectionUpdateSchema: { fields: [], curationSets: ['cur_a'], synonymSets: ['syn_a'] },
    })

    const body = JSON.parse(String(lastCall(fetchMock)[1].body))
    expect(body).toMatchObject({ curation_sets: ['cur_a'], synonym_sets: ['syn_a'] })
    expect(result.curationSets).toEqual(['cur_a'])
  })

  it('sends curation_sets when creating a collection', async () => {
    const fetchMock = stubFetch({ name: 'products', fields: [], curation_sets: ['cur_a'], num_documents: 0, created_at: 1 })
    await api().collectionsApi.createCollection({
      collectionSchema: { name: 'products', fields: [{ name: 'name', type: 'string' }], curationSets: ['cur_a'] },
    })

    expect(JSON.parse(String(lastCall(fetchMock)[1].body))).toMatchObject({ curation_sets: ['cur_a'] })
  })

  it('omits curation_sets when not set', async () => {
    const fetchMock = stubFetch({ name: 'products', fields: [], num_documents: 0, created_at: 1 })
    await api().collectionsApi.updateCollection({ collectionName: 'products', collectionUpdateSchema: { fields: [] } })

    expect(JSON.parse(String(lastCall(fetchMock)[1].body))).not.toHaveProperty('curation_sets')
  })
})

describe('stemming dictionary import patched by patch-api', () => {
  it('sends the JSON Lines body as plain text, not JSON-encoded', async () => {
    const fetchMock = stubFetch('ok')
    const lines = '{"word":"people","root":"person"}\n{"word":"mice","root":"mouse"}'
    await useTypesenseServerApi('http://typesense.test', 'key').stemmingApi.importStemmingDictionary({ id: 'demo', body: lines })

    const [url, init] = lastCall(fetchMock)
    expect(new URL(url).searchParams.get('id')).toBe('demo')
    expect(new Headers(init.headers).get('Content-Type')).toBe('text/plain')
    expect(init.body).toBe(lines)
  })
})

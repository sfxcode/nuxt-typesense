import { describe, it, expect, vi, afterEach } from 'vitest'

// Nitro provides h3 and #imports at runtime; stand-ins keep real handlers runnable under plain vitest
vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({ typesense: { url: 'http://typesense.test', apiKey: 'key' } }),
}))

vi.mock('h3', () => {
  class HTTPError extends Error {
    statusCode: number
    constructor(input: { statusCode: number, message: string }) {
      super(input.message)
      this.statusCode = input.statusCode
    }
  }
  return {
    createError: (input: { statusCode: number, message: string }) => new HTTPError(input),
    isError: (e: unknown) => e instanceof HTTPError,
    defineEventHandler: <T>(fn: T) => fn,
    getRouterParam: (event: { params: Record<string, string> }, name: string) => event.params[name],
    getMethod: (event: { method: string }) => event.method,
    readBody: async (event: { body: unknown }) => event.body,
  }
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

describe('server handlers end to end', () => {
  it('returns the upstream result on success', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(200, { name: 'products', num_documents: 3, fields: [], created_at: 1 })))
    const { default: handler } = await import('../src/runtime/server/api/typesense/collections/[name].get')

    const result = await handler({ params: { name: 'products' } } as never)
    expect(result).toMatchObject({ name: 'products' })
  })

  it('maps an upstream 404 to a 404 with the Typesense message', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(404, { message: 'No collection with name `nope` found.' })))
    const { default: handler } = await import('../src/runtime/server/api/typesense/collections/[name].get')

    await expect(handler({ params: { name: 'nope' } } as never)).rejects.toMatchObject({
      statusCode: 404,
      message: 'No collection with name `nope` found.',
    })
  })

  it('maps an unreachable server to 502', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new TypeError('fetch failed')
    }))
    const { default: handler } = await import('../src/runtime/server/api/typesense/collections/[name].get')

    await expect(handler({ params: { name: 'products' } } as never)).rejects.toMatchObject({ statusCode: 502 })
  })

  it('rejects a missing collection name with 400', async () => {
    const { default: handler } = await import('../src/runtime/server/api/typesense/documents/[collection]/search.post')

    await expect(handler({ params: {}, context: {}, body: {} } as never)).rejects.toMatchObject({ statusCode: 400 })
  })

  it('requires an id when upserting synonym items', async () => {
    const { default: handler } = await import('../src/runtime/server/api/typesense/synonyms/[synonymSetName]/items/index')

    await expect(handler({ params: { synonymSetName: 'set' }, method: 'POST', body: { synonyms: ['a', 'b'] } } as never))
      .rejects.toMatchObject({ statusCode: 400 })
  })
})

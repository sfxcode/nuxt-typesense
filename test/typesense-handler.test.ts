import { describe, it, expect, vi } from 'vitest'
import { describeTypesenseError } from '../src/runtime/utils/typesenseErrors'
import { defineTypesenseHandler } from '../src/runtime/server/composables/typesenseHandler'
import { useTypesenseError } from '../src/runtime/composables/typesenseError'
import { FetchError, RequiredError, ResponseError } from '../src/runtime/api/runtime'

// h3 is provided by Nitro at runtime and is not resolvable from plain vitest
vi.mock('h3', () => {
  class HTTPError extends Error {
    statusCode: number
    constructor(input: { statusCode: number, message: string, cause?: unknown }) {
      super(input.message)
      this.statusCode = input.statusCode
      this.cause = input.cause
    }
  }
  return {
    createError: (input: { statusCode: number, message: string }) => new HTTPError(input),
    isError: (e: unknown) => e instanceof HTTPError,
    defineEventHandler: <T>(fn: T) => fn,
  }
})

const jsonResponse = (status: number, body: unknown, statusText = '') =>
  new Response(JSON.stringify(body), { status, statusText })

describe('describeTypesenseError', () => {
  it('keeps upstream status, status text and message', async () => {
    const info = await describeTypesenseError(new ResponseError(jsonResponse(404, { message: 'Not Found' }, 'Not Found')))
    expect(info).toMatchObject({ statusCode: 404, statusMessage: 'Not Found', message: 'Not Found' })
  })

  it('passes through other upstream statuses', async () => {
    for (const status of [400, 401, 409, 422, 503]) {
      const info = await describeTypesenseError(new ResponseError(jsonResponse(status, { message: `m${status}` })))
      expect(info.statusCode).toBe(status)
      expect(info.message).toBe(`m${status}`)
    }
  })

  it('falls back to status text for non-JSON bodies', async () => {
    const info = await describeTypesenseError(new ResponseError(new Response('oops', { status: 401, statusText: 'Unauthorized' })))
    expect(info).toMatchObject({ statusCode: 401, message: 'Unauthorized' })
  })

  it('falls back to a generic message when there is no body message or status text', async () => {
    const info = await describeTypesenseError(new ResponseError(jsonResponse(500, {})))
    expect(info).toMatchObject({ statusCode: 500, message: 'Typesense request failed' })
    expect(info.statusMessage).toBeUndefined()
  })

  it('does not consume the original response body', async () => {
    const response = jsonResponse(400, { message: 'bad' })
    await describeTypesenseError(new ResponseError(response))
    expect(response.bodyUsed).toBe(false)
  })

  it('maps connection failures to 502', async () => {
    const info = await describeTypesenseError(new FetchError(new Error('ECONNREFUSED')))
    expect(info.statusCode).toBe(502)
    expect(info.message).toMatch(/unreachable/i)
  })

  it('maps missing parameters to 400, using the field name when there is no message', async () => {
    expect((await describeTypesenseError(new RequiredError('collectionName', 'missing'))).message).toBe('missing')
    const info = await describeTypesenseError(new RequiredError('collectionName'))
    expect(info).toMatchObject({ statusCode: 400, message: 'Missing required parameter: collectionName' })
  })

  it('wraps unknown errors and non-errors as 500', async () => {
    expect(await describeTypesenseError(new Error('boom'))).toMatchObject({ statusCode: 500, message: 'boom' })
    expect(await describeTypesenseError('weird')).toMatchObject({ statusCode: 500, message: 'Unexpected error' })
  })

  it('keeps the original error as cause', async () => {
    const original = new FetchError(new Error('down'))
    expect((await describeTypesenseError(original)).cause).toBe(original)
  })
})

describe('defineTypesenseHandler', () => {
  const event = {} as never

  it('returns the handler result on success', async () => {
    const handler = defineTypesenseHandler(async () => ({ ok: true }))
    expect(await handler(event)).toEqual({ ok: true })
  })

  it('converts client errors into HTTP errors with the upstream status', async () => {
    const handler = defineTypesenseHandler(async () => {
      throw new ResponseError(jsonResponse(404, { message: 'Collection not found' }))
    })
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 404, message: 'Collection not found' })
  })

  it('converts unreachable servers into 502', async () => {
    const handler = defineTypesenseHandler(async () => {
      throw new FetchError(new Error('ECONNREFUSED'))
    })
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 502 })
  })

  it('rethrows existing HTTP errors unchanged', async () => {
    const { createError } = await import('h3')
    const httpError = createError({ statusCode: 400, message: 'Collection name is required' })
    const handler = defineTypesenseHandler(async () => {
      throw httpError
    })
    await expect(handler(event)).rejects.toBe(httpError)
  })

  it('converts synchronous-style unexpected errors into 500', async () => {
    const handler = defineTypesenseHandler(async () => {
      throw new TypeError('bad input')
    })
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 500, message: 'bad input' })
  })
})

describe('useTypesenseError', () => {
  it('describes errors thrown by the browser API clients', async () => {
    const { describeError } = useTypesenseError()

    expect(await describeError(new ResponseError(jsonResponse(404, { message: 'Not Found' })))).toMatchObject({ statusCode: 404, message: 'Not Found' })
    expect(await describeError(new FetchError(new Error('offline')))).toMatchObject({ statusCode: 502 })
  })
})

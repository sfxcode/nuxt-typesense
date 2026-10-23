import { describe, it, expect } from 'vitest'
import { describeTypesenseError } from '../src/runtime/server/composables/typesenseErrors'
import { FetchError, RequiredError, ResponseError } from '../src/runtime/api/runtime'

describe('describeTypesenseError', () => {
  it('keeps upstream status and message', async () => {
    const response = new Response(JSON.stringify({ message: 'Not Found' }), { status: 404, statusText: 'Not Found' })
    const error = await describeTypesenseError(new ResponseError(response, 'Response returned an error code'))
    expect(error.statusCode).toBe(404)
    expect(error.message).toBe('Not Found')
  })

  it('falls back to status text for non-JSON bodies', async () => {
    const error = await describeTypesenseError(new ResponseError(new Response('oops', { status: 401, statusText: 'Unauthorized' })))
    expect(error.statusCode).toBe(401)
    expect(error.message).toBe('Unauthorized')
  })

  it('maps connection failures to 502 and missing params to 400', async () => {
    expect((await describeTypesenseError(new FetchError(new Error('ECONNREFUSED')))).statusCode).toBe(502)
    expect((await describeTypesenseError(new RequiredError('collectionName', 'missing'))).statusCode).toBe(400)
  })

  it('wraps unknown errors as 500', async () => {
    const error = await describeTypesenseError(new Error('boom'))
    expect(error.statusCode).toBe(500)
    expect(error.message).toBe('boom')
  })
})

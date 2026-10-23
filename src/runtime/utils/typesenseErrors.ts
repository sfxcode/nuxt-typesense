import { FetchError, RequiredError, ResponseError } from '../api/runtime'

export interface TypesenseErrorInfo {
  statusCode: number
  statusMessage?: string
  message: string
  cause: unknown
}

async function upstreamMessage(response: Response) {
  try {
    const body = await response.clone().json() as { message?: string }
    if (body?.message)
      return body.message
  }
  catch {
    // body was not JSON; fall back to the status text
  }
  return response.statusText || 'Typesense request failed'
}

/**
 * Translate errors from the generated Typesense client into HTTP error data:
 * upstream status codes and messages are preserved, connection failures become 502
 * and missing required parameters become 400.
 */
export async function describeTypesenseError(error: unknown): Promise<TypesenseErrorInfo> {
  if (error instanceof ResponseError) {
    return {
      statusCode: error.response.status,
      statusMessage: error.response.statusText || undefined,
      message: await upstreamMessage(error.response),
      cause: error,
    }
  }

  if (error instanceof RequiredError)
    return { statusCode: 400, message: error.message || `Missing required parameter: ${error.field}`, cause: error }

  if (error instanceof FetchError)
    return { statusCode: 502, message: 'Typesense server is unreachable', cause: error }

  return { statusCode: 500, message: error instanceof Error ? error.message : 'Unexpected error', cause: error }
}

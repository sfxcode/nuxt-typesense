import { createError, defineEventHandler, isError } from 'h3'
import type { EventHandler, EventHandlerRequest, EventHandlerResponse } from 'h3'
import { describeTypesenseError } from '../../utils/typesenseErrors'

/** Wraps a handler so errors from the Typesense client become proper HTTP errors. */
export function defineTypesenseHandler<T extends EventHandlerRequest, D extends EventHandlerResponse>(handler: EventHandler<T, D>) {
  return defineEventHandler<T>(async (event) => {
    try {
      return await handler(event)
    }
    catch (error) {
      throw isError(error) ? error : createError(await describeTypesenseError(error))
    }
  })
}

import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { keysApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const keyIdParam = getRouterParam(event, 'id')

  if (!keyIdParam) {
    throw createError({
      statusCode: 400,
      message: 'Key ID is required',
    })
  }

  const keyId = Number.parseInt(keyIdParam, 10)

  if (Number.isNaN(keyId)) {
    throw createError({
      statusCode: 400,
      message: 'Key ID must be a valid number',
    })
  }

  return await keysApi.getKey({
    keyId,
  })
})

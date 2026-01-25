import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { collectionsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const aliasName = getRouterParam(event, 'alias')

  if (!aliasName) {
    throw createError({
      statusCode: 400,
      message: 'Alias name is required',
    })
  }

  return await collectionsApi.getAlias({
    aliasName,
  })
})

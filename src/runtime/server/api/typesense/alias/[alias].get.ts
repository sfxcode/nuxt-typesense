import { useRuntimeConfig } from '#imports'
import { getRouterParam, createError } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
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

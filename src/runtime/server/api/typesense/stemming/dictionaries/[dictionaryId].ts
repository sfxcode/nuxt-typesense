import { useRuntimeConfig } from '#imports'
import { createError, getRouterParam } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { stemmingApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const dictionaryId = getRouterParam(event, 'dictionaryId')
  if (!dictionaryId) {
    throw createError({ statusCode: 400, message: 'Dictionary ID is required' })
  }

  return await stemmingApi.getStemmingDictionary({ dictionaryId })
})

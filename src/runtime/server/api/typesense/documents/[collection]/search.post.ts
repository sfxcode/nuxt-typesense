import { useRuntimeConfig } from '#imports'
import { createError, readBody } from 'h3'
import type { SearchParameters } from '../../../../../api/models'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { documentsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const collection = event.context.params?.collection
  if (!collection) {
    throw createError({ statusCode: 400, message: 'Collection name is required' })
  }
  const searchParameters = await readBody<SearchParameters>(event)

  return await documentsApi.searchCollection({
    collectionName: collection,
    searchParameters,
  })
})

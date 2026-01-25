import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody } from 'h3'
import type { SearchParameters } from '../../../../../api/models'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { documentsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const collection = event.context.params?.collection
  if (!collection) {
    throw new Error('Collection name is required')
  }
  const searchParameters = await readBody<SearchParameters>(event)

  return await documentsApi.searchCollection({
    collectionName: collection,
    searchParameters,
  })
})

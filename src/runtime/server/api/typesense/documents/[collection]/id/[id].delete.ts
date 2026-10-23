import { useRuntimeConfig } from '#imports'
import { getRouterParam, createError } from 'h3'
import { useTypesenseServerApi } from '../../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { documentsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const collectionName = getRouterParam(event, 'collection')
  const documentId = getRouterParam(event, 'id')

  if (!collectionName) {
    throw createError({
      statusCode: 400,
      message: 'Collection name is required',
    })
  }

  if (!documentId) {
    throw createError({
      statusCode: 400,
      message: 'Document ID is required',
    })
  }

  return await documentsApi.deleteDocument({
    collectionName,
    documentId,
  })
})

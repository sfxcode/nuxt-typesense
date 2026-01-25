import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import type { ExportDocumentsExportDocumentsParametersParameter } from '../../../../../api/models'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { documentsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const collectionName = getRouterParam(event, 'collection')

  if (!collectionName) {
    throw createError({
      statusCode: 400,
      message: 'Collection name is required',
    })
  }

  const query = getQuery(event) as ExportDocumentsExportDocumentsParametersParameter

  return await documentsApi.exportDocuments({
    collectionName,
    exportDocumentsParameters: query,
  })
})

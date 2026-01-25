import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import type { ImportDocumentsImportDocumentsParametersParameter } from '../../../../../api/models'

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

  const body = await readBody<{
    documents: string
    parameters?: ImportDocumentsImportDocumentsParametersParameter
  }>(event)

  if (!body.documents) {
    throw createError({
      statusCode: 400,
      message: 'Documents data is required',
    })
  }

  return await documentsApi.importDocuments({
    collectionName,
    body: body.documents,
    importDocumentsParameters: body.parameters,
  })
})

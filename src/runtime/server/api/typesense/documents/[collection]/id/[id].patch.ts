import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { useTypesenseServerApi } from '../../../../../composables/typesenseServerApi'
import type { DirtyValues } from '../../../../../../api/models'

export default defineEventHandler(async (event) => {
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

  const body = await readBody<{
    document?: object
    dirtyValues?: DirtyValues
  }>(event)

  return await documentsApi.updateDocument({
    collectionName,
    documentId,
    body: body.document || body,
    dirtyValues: body.dirtyValues,
  })
})

import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import type { DirtyValues, IndexAction } from '../../../../../api/models'

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
    document?: object
    action?: IndexAction
    dirtyValues?: DirtyValues
  }>(event)

  return await documentsApi.indexDocument({
    collectionName,
    body: body.document || body,
    action: body.action,
    dirtyValues: body.dirtyValues,
  })
})

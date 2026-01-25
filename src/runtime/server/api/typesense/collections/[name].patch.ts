import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import type { CollectionUpdateSchema } from '~/src/runtime/api'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { collectionsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const collectionName = getRouterParam(event, 'name')

  if (!collectionName) {
    throw createError({
      statusCode: 400,
      message: 'Collection name is required',
    })
  }

  const collectionUpdateSchema = await readBody<CollectionUpdateSchema>(event)

  return await collectionsApi.updateCollection({
    collectionName,
    collectionUpdateSchema,
  })
})

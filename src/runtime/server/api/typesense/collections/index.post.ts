import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import type { CollectionSchema } from '~/src/runtime/api'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { collectionsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const collectionSchema = await readBody<CollectionSchema>(event)

  return await collectionsApi.createCollection({
    collectionSchema,
  })
})

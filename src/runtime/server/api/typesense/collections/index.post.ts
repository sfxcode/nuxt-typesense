import { useRuntimeConfig } from '#imports'
import { readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import type { CollectionSchema } from '../../../../api'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { collectionsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const collectionSchema = await readBody<CollectionSchema>(event)

  return await collectionsApi.createCollection({
    collectionSchema,
  })
})

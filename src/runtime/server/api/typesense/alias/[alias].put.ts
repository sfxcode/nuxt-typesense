import { useRuntimeConfig } from '#imports'
import { getRouterParam, readBody, createError } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import type { CollectionAliasSchema } from '../../../../api'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { collectionsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const aliasName = getRouterParam(event, 'alias')

  if (!aliasName) {
    throw createError({
      statusCode: 400,
      message: 'Alias name is required',
    })
  }

  const collectionAliasSchema = await readBody<CollectionAliasSchema>(event)

  return await collectionsApi.upsertAlias({
    aliasName,
    collectionAliasSchema,
  })
})

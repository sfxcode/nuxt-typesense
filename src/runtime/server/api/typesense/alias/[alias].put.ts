import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import type { CollectionAliasSchema } from '~/src/runtime/api'

export default defineEventHandler(async (event) => {
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

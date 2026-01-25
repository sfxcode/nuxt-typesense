import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import type { ApiKeySchema } from '~/src/runtime/api'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { keysApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const apiKeySchema = await readBody<ApiKeySchema>(event)

  return await keysApi.createKey({
    apiKeySchema,
  })
})

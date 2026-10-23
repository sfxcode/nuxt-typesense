import { useRuntimeConfig } from '#imports'
import { readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import type { ApiKeySchema } from '../../../../api'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { keysApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const apiKeySchema = await readBody<ApiKeySchema>(event)

  return await keysApi.createKey({
    apiKeySchema,
  })
})

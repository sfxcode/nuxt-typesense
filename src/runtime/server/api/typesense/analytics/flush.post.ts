import { useRuntimeConfig } from '#imports'
import { defineEventHandler } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { analyticsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  return await analyticsApi.flushAnalytics()
})

import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { analyticsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const analyticsEvent = await readBody(event)
  return await analyticsApi.createAnalyticsEvent({ analyticsEvent })
})

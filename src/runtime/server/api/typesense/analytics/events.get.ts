import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getQuery } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { analyticsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const query = getQuery(event)
  return await analyticsApi.getAnalyticsEvents({
    userId: String(query.userId || ''),
    name: String(query.name || ''),
    n: Number(query.n || 10),
  })
})

import { useRuntimeConfig } from '#imports'
import { getQuery } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { analyticsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const query = getQuery(event)
  return await analyticsApi.getAnalyticsEvents({
    userId: String(query.userId || ''),
    name: String(query.name || ''),
    n: Number(query.n || 10),
  })
})

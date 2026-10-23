import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { stopwordsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const setId = getRouterParam(event, 'setId')
  if (!setId) {
    throw createError({ statusCode: 400, message: 'Stopwords set ID is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await stopwordsApi.retrieveStopwordsSet({ setId })
    case 'PUT': {
      const stopwordsSetUpsertSchema = await readBody(event)
      return await stopwordsApi.upsertStopwordsSet({ setId, stopwordsSetUpsertSchema })
    }
    case 'DELETE':
      return await stopwordsApi.deleteStopwordsSet({ setId })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

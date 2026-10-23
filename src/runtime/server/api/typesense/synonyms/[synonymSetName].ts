import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { synonymsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const synonymSetName = getRouterParam(event, 'synonymSetName')
  if (!synonymSetName) {
    throw createError({ statusCode: 400, message: 'Synonym set name is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await synonymsApi.retrieveSynonymSet({ synonymSetName })
    case 'PUT': {
      const synonymSetCreateSchema = await readBody(event)
      return await synonymsApi.upsertSynonymSet({ synonymSetName, synonymSetCreateSchema })
    }
    case 'DELETE':
      return await synonymsApi.deleteSynonymSet({ synonymSetName })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

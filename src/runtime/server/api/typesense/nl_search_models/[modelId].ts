import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { searchModelsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const modelId = getRouterParam(event, 'modelId')
  if (!modelId) {
    throw createError({ statusCode: 400, message: 'Model ID is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await searchModelsApi.retrieveNLSearchModel({ modelId })
    case 'PUT': {
      const body = await readBody(event)
      return await searchModelsApi.updateNLSearchModel({ modelId, body })
    }
    case 'DELETE':
      return await searchModelsApi.deleteNLSearchModel({ modelId })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

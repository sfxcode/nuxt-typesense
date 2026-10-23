import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getMethod, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { searchModelsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  switch (getMethod(event)) {
    case 'GET':
      return await searchModelsApi.retrieveAllNLSearchModels()
    case 'POST': {
      const nLSearchModelCreateSchema = await readBody(event)
      return await searchModelsApi.createNLSearchModel({ nLSearchModelCreateSchema })
    }
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

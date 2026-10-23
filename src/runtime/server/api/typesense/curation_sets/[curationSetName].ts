import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { curationSetsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const curationSetName = getRouterParam(event, 'curationSetName')
  if (!curationSetName) {
    throw createError({ statusCode: 400, message: 'Curation set name is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await curationSetsApi.retrieveCurationSet({ curationSetName })
    case 'PUT': {
      const curationSetCreateSchema = await readBody(event)
      return await curationSetsApi.upsertCurationSet({ curationSetName, curationSetCreateSchema })
    }
    case 'DELETE':
      return await curationSetsApi.deleteCurationSet({ curationSetName })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

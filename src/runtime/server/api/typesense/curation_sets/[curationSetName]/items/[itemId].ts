import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { curationSetsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const curationSetName = getRouterParam(event, 'curationSetName')
  const itemId = getRouterParam(event, 'itemId')
  if (!curationSetName || !itemId) {
    throw createError({ statusCode: 400, message: 'Curation set name and item id are required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await curationSetsApi.retrieveCurationSetItem({ curationSetName, itemId })
    case 'PUT': {
      const curationItemCreateSchema = await readBody(event)
      return await curationSetsApi.upsertCurationSetItem({ curationSetName, itemId, curationItemCreateSchema })
    }
    case 'DELETE':
      return await curationSetsApi.deleteCurationSetItem({ curationSetName, itemId })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

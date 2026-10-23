import { useRuntimeConfig } from '#imports'
import { createError, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { synonymsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const synonymSetName = getRouterParam(event, 'synonymSetName')
  const itemId = getRouterParam(event, 'itemId')
  if (!synonymSetName || !itemId) {
    throw createError({ statusCode: 400, message: 'Synonym set name and item id are required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await synonymsApi.retrieveSynonymSetItem({ synonymSetName, itemId })
    case 'PUT': {
      const synonymItemUpsertSchema = await readBody(event)
      return await synonymsApi.upsertSynonymSetItem({ synonymSetName, itemId, synonymItemUpsertSchema })
    }
    case 'DELETE':
      return await synonymsApi.deleteSynonymSetItem({ synonymSetName, itemId })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

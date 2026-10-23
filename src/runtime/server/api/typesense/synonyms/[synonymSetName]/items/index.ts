import { useRuntimeConfig } from '#imports'
import { createError, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { synonymsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const synonymSetName = getRouterParam(event, 'synonymSetName')
  if (!synonymSetName) {
    throw createError({ statusCode: 400, message: 'Synonym set name is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await synonymsApi.retrieveSynonymSetItems({ synonymSetName })
    case 'POST': {
      const synonymItemUpsertSchema = await readBody(event)
      return await synonymsApi.upsertSynonymSetItem({
        synonymSetName,
        itemId: String((synonymItemUpsertSchema as any)?.id || ''),
        synonymItemUpsertSchema,
      })
    }
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

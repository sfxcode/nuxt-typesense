import { useRuntimeConfig } from '#imports'
import { createError, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { curationSetsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const curationSetName = getRouterParam(event, 'curationSetName')
  if (!curationSetName) {
    throw createError({ statusCode: 400, message: 'Curation set name is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await curationSetsApi.retrieveCurationSetItems({ curationSetName })
    case 'POST': {
      const curationItemCreateSchema = await readBody(event)
      return await curationSetsApi.upsertCurationSetItem({ curationSetName, itemId: String((curationItemCreateSchema as any)?.id || ''), curationItemCreateSchema })
    }
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

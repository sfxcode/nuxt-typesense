import { useRuntimeConfig } from '#imports'
import { createError, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { presetsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const presetId = getRouterParam(event, 'presetId')
  if (!presetId) {
    throw createError({ statusCode: 400, message: 'Preset ID is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await presetsApi.retrievePreset({ presetId })
    case 'PUT': {
      const presetUpsertSchema = await readBody(event)
      return await presetsApi.upsertPreset({ presetId, presetUpsertSchema })
    }
    case 'DELETE':
      return await presetsApi.deletePreset({ presetId })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

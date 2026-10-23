import { useRuntimeConfig } from '#imports'
import { createError, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { conversationsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const modelId = getRouterParam(event, 'modelId')
  if (!modelId) {
    throw createError({ statusCode: 400, message: 'Model ID is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await conversationsApi.retrieveConversationModel({ modelId })
    case 'PUT': {
      const conversationModelUpdateSchema = await readBody(event)
      return await conversationsApi.updateConversationModel({ modelId, conversationModelUpdateSchema })
    }
    case 'DELETE':
      return await conversationsApi.deleteConversationModel({ modelId })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

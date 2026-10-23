import { useRuntimeConfig } from '#imports'
import { createError, getMethod, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { conversationsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  switch (getMethod(event)) {
    case 'GET':
      return await conversationsApi.retrieveAllConversationModels()
    case 'POST': {
      const conversationModelCreateSchema = await readBody(event)
      return await conversationsApi.createConversationModel({ conversationModelCreateSchema })
    }
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

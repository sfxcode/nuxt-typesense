import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getMethod, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { analyticsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  switch (getMethod(event)) {
    case 'GET':
      return await analyticsApi.retrieveAnalyticsRules({})
    case 'POST': {
      const createAnalyticsRuleRequest = await readBody(event)
      return await analyticsApi.createAnalyticsRule({ createAnalyticsRuleRequest })
    }
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

import { useRuntimeConfig } from '#imports'
import { createError, getMethod, getRouterParam, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { analyticsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const ruleName = getRouterParam(event, 'ruleName')
  if (!ruleName) {
    throw createError({ statusCode: 400, message: 'Rule name is required' })
  }

  switch (getMethod(event)) {
    case 'GET':
      return await analyticsApi.retrieveAnalyticsRule({ ruleName })
    case 'PUT': {
      const analyticsRuleUpdate = await readBody(event)
      return await analyticsApi.upsertAnalyticsRule({ ruleName, analyticsRuleUpdate })
    }
    case 'DELETE':
      return await analyticsApi.deleteAnalyticsRule({ ruleName })
    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

import { useRuntimeConfig } from '#imports'
import { createError, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import type { MultiSearchParameters, MultiSearchSearchesParameter } from '../../../../../api/models'
import { defineTypesenseHandler } from '../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { documentsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const body = await readBody<{
    multiSearchParameters: MultiSearchParameters
    multiSearchSearchesParameter?: MultiSearchSearchesParameter
  }>(event)

  if (!body.multiSearchParameters) {
    throw createError({ statusCode: 400, message: 'multiSearchParameters is required' })
  }

  return await documentsApi.multiSearch({
    multiSearchParameters: body.multiSearchParameters,
    multiSearchSearchesParameter: body.multiSearchSearchesParameter,
  })
})

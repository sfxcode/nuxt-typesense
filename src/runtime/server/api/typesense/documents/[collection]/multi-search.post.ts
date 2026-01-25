import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import type { MultiSearchParameters, MultiSearchSearchesParameter } from '../../../../../api/models'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { documentsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const body = await readBody<{
    multiSearchParameters: MultiSearchParameters
    multiSearchSearchesParameter?: MultiSearchSearchesParameter
  }>(event)

  if (!body.multiSearchParameters) {
    throw new Error('multiSearchParameters is required')
  }

  return await documentsApi.multiSearch({
    multiSearchParameters: body.multiSearchParameters,
    multiSearchSearchesParameter: body.multiSearchSearchesParameter,
  })
})

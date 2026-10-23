import { useRuntimeConfig } from '#imports'

import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { stopwordsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  return await stopwordsApi.retrieveStopwordsSets()
})

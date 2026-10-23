import { useRuntimeConfig } from '#imports'
import { readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { stemmingApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const importDictionary = await readBody(event)
  return await stemmingApi.importStemmingDictionary({
    id: String((importDictionary as any)?.id || ''),
    body: (importDictionary as any)?.body,
  })
})

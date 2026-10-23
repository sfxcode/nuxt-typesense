import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { stemmingApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const importDictionary = await readBody(event)
  return await stemmingApi.importStemmingDictionary({
    id: String((importDictionary as any)?.id || ''),
    body: (importDictionary as any)?.body,
  })
})

import { useRuntimeConfig } from '#imports'
import { readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { operationsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const snapshotPath = await readBody(event)
  return await operationsApi.takeSnapshot({ snapshotPath: String((snapshotPath as any)?.snapshotPath || '') })
})

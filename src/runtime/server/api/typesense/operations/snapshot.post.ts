import { useRuntimeConfig } from '#imports'
import { readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'
import { defineTypesenseHandler } from '../../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { operationsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const body = await readBody<{ snapshotPath?: string }>(event)
  return await operationsApi.takeSnapshot({ snapshotPath: String(body?.snapshotPath || '') })
})

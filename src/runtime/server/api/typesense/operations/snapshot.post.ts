import { useRuntimeConfig } from '#imports'
import { defineEventHandler, readBody } from 'h3'
import { useTypesenseServerApi } from '../../../composables/typesenseServerApi'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { operationsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const snapshotPath = await readBody(event)
  return await operationsApi.takeSnapshot({ snapshotPath: String((snapshotPath as any)?.snapshotPath || '') })
})

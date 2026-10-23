import { useRuntimeConfig } from '#imports'

import { useTypesenseServerApi } from '../../composables/typesenseServerApi'
import type { TypesenseStatus } from '../../../../types'
import { defineTypesenseHandler } from '../../composables/typesenseHandler'

export default defineTypesenseHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { healthApi, debugApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)

  const health = await healthApi.health()
  const debug = await debugApi.debug()

  return {
    name: 'TYPESENSE',
    url: config.typesense.url,
    version: debug.version,
    healthy: health.ok,

  } as TypesenseStatus
})

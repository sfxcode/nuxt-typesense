import { useRuntimeConfig } from '#imports'
import { defineEventHandler } from 'h3'
import { useTypesenseServerApi } from '../../composables/typesenseServerApi'
import type { TypesenseStatus } from '../../../../types'

export default defineEventHandler(async (event) => {
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

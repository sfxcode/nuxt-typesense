import { addImportsDir, addServerImportsDir, addServerHandler, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import defu from 'defu'
import { name, version } from '../package.json'
import type { ModuleOptions } from './options'
import { validateTypesenseConfig } from './options'
import type { TypesenseRoute } from './routes'
import { filterTypesenseRoutes, typesenseServerRoutes } from './routes'

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    typesense: { url: string, apiKey: string }
  }
  interface PublicRuntimeConfig {
    typesense: { url: string, apiKey: string, clientMode: boolean }
  }
}

export * from './types'
export * from './runtime/api/models'
export type { ModuleOptions }
export { typesenseServerRoutes }

const logger = useLogger('nuxt-typesense')

function registerTypesenseRoutes(routes: TypesenseRoute[], resolver: ReturnType<typeof createResolver>) {
  routes.forEach(({ route, method, handler }) => {
    addServerHandler({
      route,
      ...(method && { method }),
      handler: resolver.resolve(handler),
    })
  })
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: name,
    version: version,
    configKey: 'typesense',
  },
  async setup(options, nuxt) {
    const { warnings, errors } = validateTypesenseConfig(options)

    warnings.forEach(message => logger.warn(message))
    if (errors.length)
      throw new Error(`[nuxt-typesense] ${errors.join(' ')}`)

    if (options.clientMode) {
      nuxt.options.runtimeConfig.public.typesense = defu(nuxt.options.runtimeConfig.public.typesense,
        {
          url: options.url,
          apiKey: options.apiKey,
          clientMode: options.clientMode,
        },
      )
    }
    else {
      nuxt.options.runtimeConfig.typesense = defu(nuxt.options.runtimeConfig.typesense,
        {
          url: options.url,
          apiKey: options.apiKey,
        },
      )
    }

    const resolver = createResolver(import.meta.url)

    if (options.clientMode)
      addImportsDir(resolver.resolve('./runtime/composables'))
    else {
      addServerImportsDir(resolver.resolve('./runtime/server/composables'))
    }

    registerTypesenseRoutes(filterTypesenseRoutes(typesenseServerRoutes, options.routes), resolver)

    logger.success('Typesense routes registered')
  },
})

import { addImportsDir, addServerImportsDir, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import consola from 'consola'
import defu from 'defu'
import { name, version } from '../package.json'

export interface ModuleOptions {
  url?: string
  apiKey?: string
  clientMode?: boolean
}

export * from './types'
export * from './runtime/api/models'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: name,
    version: version,
    configKey: 'typesense',
  },
  async setup(options, nuxt) {
    if (!options.url || options.url.length === 0)
      consola.warn('Missing Typesense Base Url !')
    if (!options.apiKey || options.apiKey.length === 0)
      consola.warn('Missing Typesense Api Key !')

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

    // Define server routes configuration
    const serverRoutes: Array<{
      route: string
      method?: 'get' | 'post' | 'patch' | 'delete' | 'put' | 'head' | 'options' | 'trace' | 'connect'
      handler: string
    }> = [
      { route: '/api/typesense/status', handler: './runtime/server/api/typesense/status' },

      // Collection routes
      { route: '/api/typesense/collections', method: 'get', handler: './runtime/server/api/typesense/collections/index.get' },
      { route: '/api/typesense/collections', method: 'post', handler: './runtime/server/api/typesense/collections/index.post' },
      { route: '/api/typesense/collections/:name', method: 'get', handler: './runtime/server/api/typesense/collections/[name].get' },
      { route: '/api/typesense/collections/:name', method: 'patch', handler: './runtime/server/api/typesense/collections/[name].patch' },
      { route: '/api/typesense/collections/:name', method: 'delete', handler: './runtime/server/api/typesense/collections/[name].delete' },

      // Alias routes
      { route: '/api/typesense/alias/:alias', method: 'get', handler: './runtime/server/api/typesense/alias/[alias].get' },
      { route: '/api/typesense/alias/:alias', method: 'put', handler: './runtime/server/api/typesense/alias/[alias].put' },
      { route: '/api/typesense/alias/:alias', method: 'delete', handler: './runtime/server/api/typesense/alias/[alias].delete' },

      // Document routes
      { route: '/api/typesense/documents/:collection', method: 'post', handler: './runtime/server/api/typesense/documents/[collection]/index.post' },
      { route: '/api/typesense/documents/:collection/search', method: 'post', handler: './runtime/server/api/typesense/documents/[collection]/search.post' },
      { route: '/api/typesense/documents/:collection/multi-search', method: 'post', handler: './runtime/server/api/typesense/documents/[collection]/multi-search.post' },
      { route: '/api/typesense/documents/:collection/export', method: 'get', handler: './runtime/server/api/typesense/documents/[collection]/export.get' },
      { route: '/api/typesense/documents/:collection/import', method: 'post', handler: './runtime/server/api/typesense/documents/[collection]/import.post' },
      { route: '/api/typesense/documents/:collection/delete', method: 'post', handler: './runtime/server/api/typesense/documents/[collection]/delete.post' },
      { route: '/api/typesense/documents/:collection/update', method: 'post', handler: './runtime/server/api/typesense/documents/[collection]/update.post' },
      { route: '/api/typesense/documents/:collection/id/:id', method: 'get', handler: './runtime/server/api/typesense/documents/[collection]/id/[id].get' },
      { route: '/api/typesense/documents/:collection/id/:id', method: 'patch', handler: './runtime/server/api/typesense/documents/[collection]/id/[id].patch' },
      { route: '/api/typesense/documents/:collection/id/:id', method: 'delete', handler: './runtime/server/api/typesense/documents/[collection]/id/[id].delete' },

      // Keys routes
      { route: '/api/typesense/keys', method: 'get', handler: './runtime/server/api/typesense/keys/index.get' },
      { route: '/api/typesense/keys', method: 'post', handler: './runtime/server/api/typesense/keys/index.post' },
      { route: '/api/typesense/keys/:id', method: 'get', handler: './runtime/server/api/typesense/keys/[id].get' },
      { route: '/api/typesense/keys/:id', method: 'delete', handler: './runtime/server/api/typesense/keys/[id].delete' },

    ]
    // Register all server routes
    serverRoutes.forEach(({ route, method, handler }) => {
      addServerHandler({
        route,
        ...(method && { method }),
        handler: resolver.resolve(handler),
      })
    })

    consola.success('nuxt-typesense available')
  },
})

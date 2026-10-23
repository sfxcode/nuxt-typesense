import { addImportsDir, addServerImportsDir, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import { consola } from 'consola'
import defu from 'defu'
import { name, version } from '../package.json'

export interface ModuleOptions {
  url?: string
  apiKey?: string
  clientMode?: boolean
  /**
   * Limit which `/api/typesense/*` proxy routes are registered. The proxy uses the
   * server API key, so every registered route is callable by anyone who can reach the app.
   */
  routes?: {
    /** Only register read routes: GET requests plus search and multi-search. Key listing and debug info are dropped too. */
    readOnly?: boolean
    /** Route prefixes to skip, e.g. `['/api/typesense/keys', '/api/typesense/operations']`. */
    exclude?: string[]
  }
}

export function validateTypesenseConfig(options: ModuleOptions, env: Record<string, string | undefined> = process.env) {
  const warnings: string[] = []
  const errors: string[] = []

  if (!options.url)
    warnings.push('Missing Typesense Base Url!')

  if (!options.apiKey)
    warnings.push('Missing Typesense Api Key!')

  if (options.clientMode && options.apiKey) {
    const adminKeys = [env.TYPESENSE_ADMIN_KEY, env.NUXT_TYPESENSE_ADMIN_KEY].filter(Boolean)
    if (adminKeys.includes(options.apiKey))
      errors.push('Client mode cannot use an admin key. Use only a search-only API key in browser code.')
  }

  return { warnings, errors }
}

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

type TypesenseRoute = {
  route: string
  method?: 'get' | 'post' | 'patch' | 'delete' | 'put' | 'head' | 'options' | 'trace' | 'connect'
  handler: string
}

export const typesenseServerRoutes: TypesenseRoute[] = [
  { route: '/api/typesense/status', handler: './runtime/server/api/typesense/status' },

  { route: '/api/typesense/collections', method: 'get', handler: './runtime/server/api/typesense/collections/index.get' },
  { route: '/api/typesense/collections', method: 'post', handler: './runtime/server/api/typesense/collections/index.post' },
  { route: '/api/typesense/collections/:name', method: 'get', handler: './runtime/server/api/typesense/collections/[name].get' },
  { route: '/api/typesense/collections/:name', method: 'patch', handler: './runtime/server/api/typesense/collections/[name].patch' },
  { route: '/api/typesense/collections/:name', method: 'delete', handler: './runtime/server/api/typesense/collections/[name].delete' },

  { route: '/api/typesense/alias/:alias', method: 'get', handler: './runtime/server/api/typesense/alias/[alias].get' },
  { route: '/api/typesense/alias/:alias', method: 'put', handler: './runtime/server/api/typesense/alias/[alias].put' },
  { route: '/api/typesense/alias/:alias', method: 'delete', handler: './runtime/server/api/typesense/alias/[alias].delete' },

  { route: '/api/typesense/analytics/events', method: 'get', handler: './runtime/server/api/typesense/analytics/events.get' },
  { route: '/api/typesense/analytics/events', method: 'post', handler: './runtime/server/api/typesense/analytics/events.post' },
  { route: '/api/typesense/analytics/flush', method: 'post', handler: './runtime/server/api/typesense/analytics/flush.post' },
  { route: '/api/typesense/analytics/rules', method: 'get', handler: './runtime/server/api/typesense/analytics/rules/index' },
  { route: '/api/typesense/analytics/rules', method: 'post', handler: './runtime/server/api/typesense/analytics/rules/index' },
  { route: '/api/typesense/analytics/rules/:ruleName', method: 'get', handler: './runtime/server/api/typesense/analytics/rules/[ruleName]' },
  { route: '/api/typesense/analytics/rules/:ruleName', method: 'put', handler: './runtime/server/api/typesense/analytics/rules/[ruleName]' },
  { route: '/api/typesense/analytics/rules/:ruleName', method: 'delete', handler: './runtime/server/api/typesense/analytics/rules/[ruleName]' },
  { route: '/api/typesense/analytics/status', method: 'get', handler: './runtime/server/api/typesense/analytics/status.get' },

  { route: '/api/typesense/conversations/models', method: 'get', handler: './runtime/server/api/typesense/conversations/models/index' },
  { route: '/api/typesense/conversations/models', method: 'post', handler: './runtime/server/api/typesense/conversations/models/index' },
  { route: '/api/typesense/conversations/models/:modelId', method: 'get', handler: './runtime/server/api/typesense/conversations/models/[modelId]' },
  { route: '/api/typesense/conversations/models/:modelId', method: 'put', handler: './runtime/server/api/typesense/conversations/models/[modelId]' },
  { route: '/api/typesense/conversations/models/:modelId', method: 'delete', handler: './runtime/server/api/typesense/conversations/models/[modelId]' },

  { route: '/api/typesense/curation_sets', method: 'get', handler: './runtime/server/api/typesense/curation_sets/index' },
  { route: '/api/typesense/curation_sets/:curationSetName', method: 'get', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]' },
  { route: '/api/typesense/curation_sets/:curationSetName', method: 'put', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]' },
  { route: '/api/typesense/curation_sets/:curationSetName', method: 'delete', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]' },
  { route: '/api/typesense/curation_sets/:curationSetName/items', method: 'get', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]/items/index' },
  { route: '/api/typesense/curation_sets/:curationSetName/items', method: 'post', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]/items/index' },
  { route: '/api/typesense/curation_sets/:curationSetName/items/:itemId', method: 'get', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]/items/[itemId]' },
  { route: '/api/typesense/curation_sets/:curationSetName/items/:itemId', method: 'put', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]/items/[itemId]' },
  { route: '/api/typesense/curation_sets/:curationSetName/items/:itemId', method: 'delete', handler: './runtime/server/api/typesense/curation_sets/[curationSetName]/items/[itemId]' },

  { route: '/api/typesense/debug', method: 'get', handler: './runtime/server/api/typesense/debug.get' },

  { route: '/api/typesense/nl_search_models', method: 'get', handler: './runtime/server/api/typesense/nl_search_models/index' },
  { route: '/api/typesense/nl_search_models', method: 'post', handler: './runtime/server/api/typesense/nl_search_models/index' },
  { route: '/api/typesense/nl_search_models/:modelId', method: 'get', handler: './runtime/server/api/typesense/nl_search_models/[modelId]' },
  { route: '/api/typesense/nl_search_models/:modelId', method: 'put', handler: './runtime/server/api/typesense/nl_search_models/[modelId]' },
  { route: '/api/typesense/nl_search_models/:modelId', method: 'delete', handler: './runtime/server/api/typesense/nl_search_models/[modelId]' },

  { route: '/api/typesense/config', method: 'post', handler: './runtime/server/api/typesense/operations/config.post' },
  { route: '/api/typesense/metrics.json', method: 'get', handler: './runtime/server/api/typesense/operations/metrics.json.get' },
  { route: '/api/typesense/operations/cache/clear', method: 'post', handler: './runtime/server/api/typesense/operations/cache/clear.post' },
  { route: '/api/typesense/operations/db/compact', method: 'post', handler: './runtime/server/api/typesense/operations/db/compact.post' },
  { route: '/api/typesense/operations/schema_changes', method: 'get', handler: './runtime/server/api/typesense/operations/schema_changes.get' },
  { route: '/api/typesense/operations/snapshot', method: 'post', handler: './runtime/server/api/typesense/operations/snapshot.post' },
  { route: '/api/typesense/operations/vote', method: 'post', handler: './runtime/server/api/typesense/operations/vote.post' },
  { route: '/api/typesense/stats.json', method: 'get', handler: './runtime/server/api/typesense/operations/stats.json.get' },

  { route: '/api/typesense/presets', method: 'get', handler: './runtime/server/api/typesense/presets/index' },
  { route: '/api/typesense/presets/:presetId', method: 'get', handler: './runtime/server/api/typesense/presets/[presetId]' },
  { route: '/api/typesense/presets/:presetId', method: 'put', handler: './runtime/server/api/typesense/presets/[presetId]' },
  { route: '/api/typesense/presets/:presetId', method: 'delete', handler: './runtime/server/api/typesense/presets/[presetId]' },

  { route: '/api/typesense/stemming/dictionaries', method: 'get', handler: './runtime/server/api/typesense/stemming/dictionaries/index' },
  { route: '/api/typesense/stemming/dictionaries/import', method: 'post', handler: './runtime/server/api/typesense/stemming/dictionaries/import.post' },
  { route: '/api/typesense/stemming/dictionaries/:dictionaryId', method: 'get', handler: './runtime/server/api/typesense/stemming/dictionaries/[dictionaryId]' },

  { route: '/api/typesense/stopwords', method: 'get', handler: './runtime/server/api/typesense/stopwords/index' },
  { route: '/api/typesense/stopwords/:setId', method: 'get', handler: './runtime/server/api/typesense/stopwords/[setId]' },
  { route: '/api/typesense/stopwords/:setId', method: 'put', handler: './runtime/server/api/typesense/stopwords/[setId]' },
  { route: '/api/typesense/stopwords/:setId', method: 'delete', handler: './runtime/server/api/typesense/stopwords/[setId]' },

  { route: '/api/typesense/synonym_sets', method: 'get', handler: './runtime/server/api/typesense/synonyms/index' },
  { route: '/api/typesense/synonym_sets/:synonymSetName', method: 'get', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]' },
  { route: '/api/typesense/synonym_sets/:synonymSetName', method: 'put', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]' },
  { route: '/api/typesense/synonym_sets/:synonymSetName', method: 'delete', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]' },
  { route: '/api/typesense/synonym_sets/:synonymSetName/items', method: 'get', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]/items/index' },
  { route: '/api/typesense/synonym_sets/:synonymSetName/items', method: 'post', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]/items/index' },
  { route: '/api/typesense/synonym_sets/:synonymSetName/items/:itemId', method: 'get', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]/items/[itemId]' },
  { route: '/api/typesense/synonym_sets/:synonymSetName/items/:itemId', method: 'put', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]/items/[itemId]' },
  { route: '/api/typesense/synonym_sets/:synonymSetName/items/:itemId', method: 'delete', handler: './runtime/server/api/typesense/synonyms/[synonymSetName]/items/[itemId]' },

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

  { route: '/api/typesense/keys', method: 'get', handler: './runtime/server/api/typesense/keys/index.get' },
  { route: '/api/typesense/keys', method: 'post', handler: './runtime/server/api/typesense/keys/index.post' },
  { route: '/api/typesense/keys/:id', method: 'get', handler: './runtime/server/api/typesense/keys/[id].get' },
  { route: '/api/typesense/keys/:id', method: 'delete', handler: './runtime/server/api/typesense/keys/[id].delete' },

  { route: '/api/typesense/key/scoped/:key', method: 'post', handler: './runtime/server/api/typesense/key/scoped/[key].post' },
]

const readOnlyPostRoutes = new Set([
  '/api/typesense/documents/:collection/search',
  '/api/typesense/documents/:collection/multi-search',
])

// GET routes that still return sensitive metadata, so readOnly drops them too
const readOnlyBlockedPrefixes = ['/api/typesense/keys', '/api/typesense/debug']

const matchesPrefix = (route: string, prefix: string) => route === prefix || route.startsWith(`${prefix}/`)

export function filterTypesenseRoutes(routes: TypesenseRoute[], options: ModuleOptions['routes'] = {}) {
  const exclude = (options.exclude ?? []).map(prefix => prefix.replace(/\/+$/, ''))

  return routes.filter(({ route, method }) => {
    if (exclude.some(prefix => matchesPrefix(route, prefix)))
      return false
    if (options.readOnly && readOnlyBlockedPrefixes.some(prefix => matchesPrefix(route, prefix)))
      return false
    if (options.readOnly && method && method !== 'get' && !(method === 'post' && readOnlyPostRoutes.has(route)))
      return false
    return true
  })
}

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

    warnings.forEach(message => consola.warn(`[nuxt-typesense] ${message}`))
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

    consola.success('nuxt-typesense available')
  },
})

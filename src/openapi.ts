import type { TypesenseRoute } from './routes'

const prefix = '/api/typesense/'

// Route groups, keyed by the first path segment after /api/typesense/
const groups: Record<string, { tag: string, description: string }> = {
  'status': { tag: 'Status', description: 'Server status and version.' },
  'collections': { tag: 'Collections', description: 'Create, inspect, update and delete collections.' },
  'alias': { tag: 'Aliases', description: 'Stable names that point at a collection.' },
  'documents': { tag: 'Documents', description: 'Index, search, export, import and delete documents.' },
  'keys': { tag: 'API Keys', description: 'Manage API keys.' },
  'key': { tag: 'API Keys', description: 'Manage API keys.' },
  'analytics': { tag: 'Analytics', description: 'Analytics rules and events.' },
  'conversations': { tag: 'Conversations', description: 'Conversational search models.' },
  'curation_sets': { tag: 'Curation', description: 'Pin or hide results for a query.' },
  'nl_search_models': { tag: 'NL Search', description: 'Natural language search models.' },
  'presets': { tag: 'Presets', description: 'Stored search parameters.' },
  'stemming': { tag: 'Stemming', description: 'Word form dictionaries.' },
  'stopwords': { tag: 'Stopwords', description: 'Words removed from queries.' },
  'synonym_sets': { tag: 'Synonyms', description: 'Query synonym sets and their items.' },
  'operations': { tag: 'Operations', description: 'Snapshots, cache, compaction and leader election.' },
  'debug': { tag: 'Operations', description: 'Snapshots, cache, compaction and leader election.' },
  'config': { tag: 'Operations', description: 'Snapshots, cache, compaction and leader election.' },
  'metrics.json': { tag: 'Operations', description: 'Snapshots, cache, compaction and leader election.' },
  'stats.json': { tag: 'Operations', description: 'Snapshots, cache, compaction and leader election.' },
}

const summaries: Record<string, string> = {
  'get /api/typesense/status': 'Server status and version',
  'post /api/typesense/documents/:collection/search': 'Search a collection',
  'post /api/typesense/documents/:collection/multi-search': 'Run several searches in one request',
  'get /api/typesense/documents/:collection/export': 'Export documents as JSON Lines',
  'post /api/typesense/documents/:collection/import': 'Import documents from JSON Lines',
  'post /api/typesense/documents/:collection/delete': 'Delete documents matching a filter',
  'post /api/typesense/documents/:collection/update': 'Update documents matching a filter',
  'post /api/typesense/key/scoped/:key': 'Generate a scoped search key',
  'get /api/typesense/alias': 'List aliases',
  'post /api/typesense/operations/snapshot': 'Take a snapshot on the server',
  'post /api/typesense/operations/vote': 'Trigger a leader election',
  'post /api/typesense/operations/cache/clear': 'Clear the search cache',
  'post /api/typesense/operations/db/compact': 'Compact the database',
  'post /api/typesense/stemming/dictionaries/import': 'Import a stemming dictionary from JSON Lines',
}

// Write routes that work without a request body
const noBody = new Set([
  'post /api/typesense/analytics/flush',
  'post /api/typesense/operations/cache/clear',
  'post /api/typesense/operations/db/compact',
  'post /api/typesense/operations/vote',
])

const verbs: Record<string, string> = { get: 'Get', post: 'Create', put: 'Upsert', patch: 'Update', delete: 'Delete' }

const toOpenApiPath = (route: string) => route.replace(/:(\w+)/g, '{$1}')

function pathParameters(route: string) {
  return [...route.matchAll(/:(\w+)/g)].map(([, name]) => ({
    name,
    in: 'path' as const,
    required: true,
    schema: { type: 'string' },
  }))
}

function operationId(method: string, route: string) {
  const segments = route.slice(prefix.length).split('/').map(s => s.startsWith(':') ? `by_${s.slice(1)}` : s)
  return `${method}_${segments.join('_')}`.replace(/\W/g, '_')
}

function summaryFor(method: string, route: string) {
  const known = summaries[`${method} ${route}`]
  if (known)
    return known
  const noun = route.slice(prefix.length).split('/').filter(s => !s.startsWith(':')).join(' ').replace(/_/g, ' ')
  return `${verbs[method] ?? method} ${noun}`
}

export interface OpenApiInfo {
  title?: string
  version?: string
  description?: string
}

/**
 * Describes the registered proxy routes as an OpenAPI 3.1 document. Request and response
 * bodies are the plain Typesense JSON shapes, so they are documented as generic objects.
 */
export function buildOpenApiDocument(routes: TypesenseRoute[], info: OpenApiInfo = {}) {
  const paths: Record<string, Record<string, unknown>> = {}
  const usedTags = new Map<string, string>()

  for (const { route, method: declared } of routes) {
    // A route without a method (the status route) only reads
    const method = declared ?? 'get'
    const key = `${method} ${route}`
    const group = groups[route.slice(prefix.length).split('/')[0] ?? ''] ?? { tag: 'Other', description: 'Other routes.' }
    usedTags.set(group.tag, group.description)

    const hasBody = ['post', 'put', 'patch'].includes(method)
    const operation: Record<string, unknown> = {
      tags: [group.tag],
      summary: summaryFor(method, route),
      operationId: operationId(method, route),
      parameters: pathParameters(route),
      ...(hasBody && {
        requestBody: {
          required: !noBody.has(key),
          content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } },
        },
      }),
      responses: {
        200: { description: 'OK', content: { 'application/json': { schema: {} } } },
        default: { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
      },
    }

    const openApiPath = toOpenApiPath(route)
    ;(paths[openApiPath] ??= {})[method] = operation
  }

  return {
    openapi: '3.1.0',
    info: {
      title: info.title ?? 'Typesense proxy routes',
      version: info.version ?? '1.0.0',
      description: info.description ?? 'Routes registered by @sfxcode/nuxt-typesense. They call Typesense with the server API key and add no authentication.',
    },
    // relative to wherever the document is served, so it works behind any host or base path
    servers: [{ url: '/' }],
    tags: [...usedTags].map(([name, description]) => ({ name, description })),
    paths,
    components: {
      schemas: {
        Error: {
          type: 'object',
          description: 'Typesense errors keep their status code and message. An unreachable server is 502 and a missing parameter is 400.',
          properties: {
            statusCode: { type: 'integer' },
            statusMessage: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  }
}

export type OpenApiDocument = ReturnType<typeof buildOpenApiDocument>

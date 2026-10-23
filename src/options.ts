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

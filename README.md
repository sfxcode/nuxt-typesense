# Nuxt Typesense

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

A Nuxt module for integrating [Typesense](https://typesense.org/) - a fast, typo-tolerant search engine - into your Nuxt 4 application.

> 📖 **[Read the full documentation](https://sfxcode.github.io/nuxt-typesense/)** for detailed guides, API references, and examples.

## Features

- 🚀 **Full Typesense API Support** - TypeScript API client generated from the Typesense OpenAPI spec
- 🔒 **Server mode by default** - API key stays on the server, the module registers `/api/typesense/*` proxy routes
- 🖥️ **Optional client mode** - auto-imported composables that talk to Typesense directly from the browser
- ⚡️ **Type Safety** - Full TypeScript support, including typed `runtimeConfig.typesense`
- 🎨 **SSR Compatible** - Works with Nuxt's SSR

## Requirements

- Nuxt `^4.x`
- Node.js `^22.22.3 || ^24.15.0` (the versions Nuxt 4.6 supports)

## Quick Setup

1. Add the module to your project:

```bash
pnpm add @sfxcode/nuxt-typesense
# or: yarn add @sfxcode/nuxt-typesense
# or: npm install @sfxcode/nuxt-typesense
```

2. Add it to the `modules` section of `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],

  typesense: {
    url: process.env.TYPESENSE_URL, // e.g. http://localhost:8108
    apiKey: process.env.TYPESENSE_API_KEY,
  },
})
```

```bash
# .env
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=your-api-key-here
```

That's it ✨ The module logs a warning at startup if `url` or `apiKey` is missing.

## Module Options

```typescript
interface ModuleOptions {
  url?: string // Typesense server URL
  apiKey?: string // Typesense API key
  clientMode?: boolean // default: false
  routes?: { readOnly?: boolean, exclude?: string[] } // limit the proxy routes (server mode)
  openAPI?: boolean | { path?: string, title?: string, version?: string, description?: string } // serve /api/typesense/openapi.json (server mode)
}
```

The two modes decide where the key lives and what is available:

| | Server mode (`clientMode: false`, default) | Client mode (`clientMode: true`) |
|---|---|---|
| Key stored in | private `runtimeConfig.typesense` | **public** `runtimeConfig.public.typesense` |
| Server routes `/api/typesense/*` | ✅ registered | ✅ registered |
| Server util `useTypesenseServerApi(url, apiKey)` | ✅ auto-imported in Nitro | ✅ auto-imported in Nitro |
| Composables (`useTypesenseApi`, …) | ❌ not available | ✅ auto-imported |

> **⚠️ Important**: `clientMode` changes where the key is exposed. In browser mode the key is shipped to every visitor, so use only a **search-only API key** there. Keep admin or write-capable keys in server mode and use the registered `/api/typesense/*` proxy routes or `useTypesenseServerApi()` for private operations.
>
> At build time the module throws if `clientMode: true` uses an `apiKey` equal to `TYPESENSE_ADMIN_KEY` or `NUXT_TYPESENSE_ADMIN_KEY`. Other ways of supplying an admin key are not detected.

## Usage

### Server mode: call the proxy routes

Use the registered routes from components (`useFetch`) or other server code:

```vue
<script setup lang="ts">
const { data: status } = await useFetch('/api/typesense/status')
const { data: collections } = await useFetch('/api/typesense/collections')
</script>
```

Search a collection (the body is the search parameters):

```typescript
const results = await $fetch('/api/typesense/documents/products/search', {
  method: 'POST',
  body: { q: 'laptop', query_by: 'name,description', per_page: 20 },
})
```

Routes registered by the module:

| Area | Routes |
|------|--------|
| Status | `GET /api/typesense/status` |
| Collections | `GET`/`POST /api/typesense/collections`, `GET`/`PATCH`/`DELETE /api/typesense/collections/:name` |
| Aliases | `GET`/`PUT`/`DELETE /api/typesense/alias/:alias` |
| Documents | `POST /api/typesense/documents/:collection` plus `/search`, `/multi-search`, `/export`, `/import`, `/delete`, `/update`, and `/id/:id` (`GET`/`PATCH`/`DELETE`) |
| API keys | `GET`/`POST /api/typesense/keys`, `GET`/`DELETE /api/typesense/keys/:id`, `POST /api/typesense/key/scoped/:key` |

See [Server Routes](./docs/api/server-routes.md) for request and response details.

### Server mode: use the API client in your own server routes

`useTypesenseServerApi` is auto-imported in Nitro and returns all generated API clients:

```typescript
// server/api/products/search.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { documentsApi } = useTypesenseServerApi(config.typesense.url, config.typesense.apiKey)
  const { q } = getQuery(event)

  return await documentsApi.searchCollection({
    collectionName: 'products',
    searchParameters: { q: String(q ?? '*'), queryBy: 'name,description' },
  })
})
```

### Client mode: composables

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_SEARCH_KEY, // search-only key!
    clientMode: true,
  },
})
```

```vue
<script setup lang="ts">
const { searchCollection } = useTypesenseDocuments()
const { collectionInfos } = useTypesenseCollections()

const results = await searchCollection('products', { q: 'laptop', queryBy: 'name' })
const collections = await collectionInfos()

// Or use the full API client set
const { documentsApi, healthApi } = useTypesenseApi()

// Access configuration
const url = useTypesenseUrl()
const apiKey = useTypesenseApiKey()
</script>
```

Available composables: `useTypesenseApi`, `useTypesenseDocuments`, `useTypesenseCollections`, `useTypesenseUrl`, `useTypesenseApiKey`.

### Available API clients

`useTypesenseApi()` (client) and `useTypesenseServerApi(url, apiKey)` (server) both return:

```typescript
{
  analyticsApi, // Analytics and event tracking
  collectionsApi, // Collection management
  conversationsApi, // Conversation models
  curationSetsApi, // Curation sets
  debugApi, // Debug operations
  documentsApi, // Document CRUD and search
  healthApi, // Health check
  keysApi, // API key management
  searchModelsApi, // NL search models
  operationsApi, // Cluster operations
  presetsApi, // Search presets
  stemmingApi, // Stemming dictionaries
  stopwordsApi, // Stopwords
  synonymsApi, // Synonyms
}
```

Note that the generated clients use camelCase parameter names (`queryBy`, `filterBy`, `perPage`), not Typesense's snake_case. The proxy routes forward the request body as search parameters, so use the same camelCase names there.

### Security best practices

| ✅ Do | ❌ Don't |
|-------|----------|
| Use server mode with an admin or scoped key | Put an admin key in `clientMode` |
| Use search-only keys for client mode | Hardcode API keys in source code |
| Create scoped keys per user/tenant | Share API keys between environments |
| Rotate keys regularly | Commit keys to version control |

> **🔒 Security Rule**: If it modifies data, it belongs on the server.

The proxy routes use the server key and have **no built-in authentication**. Limit what is exposed with the `routes` option, and protect `/api/typesense/**` with your own middleware on public sites:

```typescript
typesense: {
  routes: {
    readOnly: true, // GET routes, search and multi-search only (no key listing or debug)
    exclude: ['/api/typesense/operations'], // drop route groups by prefix
  },
}
```

See [Configuration](./docs/guide/configuration.md#routes) for details.

## Development

```bash
git clone https://github.com/sfxcode/nuxt-typesense.git
cd nuxt-typesense

pnpm install          # pnpm 12 (see "packageManager" in package.json)
pnpm run dev:prepare  # generate type stubs
pnpm run dev          # start the playground
```

The playground reads `TYPESENSE_URL` and `TYPESENSE_API_KEY` from the environment.

### Available scripts

```bash
pnpm run dev          # run the playground
pnpm run dev:build    # build the playground
pnpm run prepack      # build the module
pnpm run test         # run tests (vitest)
pnpm run test:watch   # tests in watch mode
pnpm run lint         # eslint
pnpm run api-codegen  # regenerate the API client, then apply patches
pnpm run release      # lint, test, build, version, publish
pnpm run docs:dev     # documentation dev server
```

For a full type check, run `npx nuxi typecheck playground`.

### Project structure

```
nuxt-typesense/
├── src/
│   ├── module.ts                 # Module definition and route registration
│   ├── types.ts                  # Shared types
│   └── runtime/
│       ├── api/                  # Generated Typesense API client (do not edit by hand)
│       ├── composables/          # Client-mode composables
│       ├── server/
│       │   ├── api/typesense/    # Server route handlers
│       │   └── composables/      # useTypesenseServerApi
│       ├── model/                # TypeScript models
│       └── utils/                # Helpers (removeUndefined)
├── scripts/patch-api.mjs         # Fixes applied after api-codegen
├── playground/                   # Development playground app
├── docs/                         # VitePress documentation
└── test/                         # Vitest tests
```

### Regenerating the API client

```bash
pnpm run api-codegen
```

This fetches the latest Typesense OpenAPI spec, regenerates `src/runtime/api`, and then runs `scripts/patch-api.mjs`. The generator output needs a few manual fixes, and the script applies them (it is safe to run repeatedly):

- `DocumentsApi`: send `searchParameters` and `multiSearchParameters` as query parameters and drop `undefined` values (`removeUndefined`)
- `runtime.ts`: add the `override` modifier on `FetchError.cause`
- `CreateAnalyticsRuleRequest`: remove a duplicated import
- `CreateAnalyticsRule200ResponseOneOfInner`: re-add the missing `instanceOf…` type guard

If the generator output changes so a patch no longer matches, the script fails with the missing snippet, so you can update it. Afterwards run `pnpm run lint`, `pnpm run test` and `npx nuxi typecheck playground`.

## Documentation

Full documentation is published at **https://sfxcode.github.io/nuxt-typesense/** (source in the `docs/` directory: Getting Started, Configuration, Core Concepts, API Reference, Examples).

```bash
pnpm run docs:dev      # dev server (http://localhost:5173)
pnpm run docs:build
pnpm run docs:preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- 📖 [Nuxt Typesense Documentation](https://sfxcode.github.io/nuxt-typesense/)
- 📖 [Typesense Documentation](https://typesense.org/docs/)
- 🎮 [Typesense API Explorer](https://typesense.org/api/)
- 💬 [Typesense Slack Community](https://join.slack.com/t/typesense-community/shared_invite/zt-2fetvh0pw-ft5y2YQlq4l_bPhhqpjXig)
- 🐙 [GitHub Repository](https://github.com/sfxcode/nuxt-typesense)

## License

[MIT License](./LICENSE) © 2024 sfxcode

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@sfxcode/nuxt-typesense/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@sfxcode/nuxt-typesense

[npm-downloads-src]: https://img.shields.io/npm/dm/@sfxcode/nuxt-typesense.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@sfxcode/nuxt-typesense

[license-src]: https://img.shields.io/npm/l/@sfxcode/nuxt-typesense.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@sfxcode/nuxt-typesense

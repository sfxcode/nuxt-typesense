# Nuxt Typesense

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

A Nuxt module for integrating [Typesense](https://typesense.org/) - a fast, typo-tolerant search engine - into your Nuxt 3 application.

> 📖 **[Read the full documentation](./docs/README.md)** for detailed guides, API references, and examples.

## Features

- 🚀 **Full Typesense API Support** - Complete TypeScript API client auto-generated from Typesense OpenAPI spec
- 🎯 **Auto-imported Composables** - Ready-to-use composables for all Typesense operations
- ⚡️ **Type Safety** - Full TypeScript support with type definitions
- 🔧 **Zero Config** - Simple setup with module configuration
- 🎨 **SSR Compatible** - Works seamlessly with Nuxt's SSR

## Quick Setup

1. Add `@sfxcode/nuxt-typesense` dependency to your project:

```bash
# Using pnpm
pnpm add @sfxcode/nuxt-typesense

# Using yarn
yarn add @sfxcode/nuxt-typesense

# Using npm
npm install @sfxcode/nuxt-typesense
```

2. Add `@sfxcode/nuxt-typesense` to the `modules` section of `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@sfxcode/nuxt-typesense'
  ],
  
  typesense: {
    url: 'http://localhost:8108',  // Your Typesense server URL
    apiKey: 'xyz'                   // Your Typesense API key
  }
})
```

3. You can also use environment variables:

```typescript
export default defineNuxtConfig({
  modules: [
    '@sfxcode/nuxt-typesense'
  ],
  
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
  }
})
```

Create a `.env` file:

```bash
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=your-api-key-here
```

That's it! You can now use Typesense in your Nuxt app ✨

## Usage

### 🔐 Security First: Client vs Server

> **⚠️ Important**: Use **search-only API keys** on the client-side and **admin keys** only on the server-side.

The module works seamlessly in both contexts:

| Operation | Client-Side | Server-Side | Recommended Key |
|-----------|-------------|-------------|-----------------|
| Search documents | ✅ | ✅ | Search-only key |
| Get collections | ✅ | ✅ | Search-only key |
| Create collections | ❌ | ✅ | Admin key |
| Manage API keys | ❌ | ✅ | Admin key |
| Import documents | ❌ | ✅ | Admin key |

### 🖥️ Client-Side Usage (Components & Pages)

Use composables in your Vue components for search and read operations:

```vue
<template>
  <div>
    <input v-model="query" placeholder="Search products..." />
    
    <div v-if="pending">Searching...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <p>Found {{ results?.found }} products</p>
      <div v-for="hit in results?.hits" :key="hit.document.id">
        <h3>{{ hit.document.name }}</h3>
        <p>${{ hit.document.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { documentsApi } = useTypesenseApi()
const query = ref('')

// Reactive search with useAsyncData
const { data: searchResponse, pending, error } = await useAsyncData(
  'product-search',
  async () => {
    if (!query.value) return null
    
    const response = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: query.value,
        query_by: 'name,description',
        per_page: 20
      }]
    })
    return response.results[0]
  },
  { watch: [query] }
)

const results = computed(() => searchResponse.value)
</script>
```

#### Helper Composables for Client-Side

```vue
<script setup lang="ts">
// Get collections (read-only)
const { collectionInfos } = useTypesenseCollections()
const collections = await collectionInfos()

// Access configuration
const serverUrl = useTypesenseUrl()
const apiKey = useTypesenseApiKey() // Use with caution, prefer server-side
</script>
```

### 🔒 Server-Side Usage (API Routes)

Use the full API in server routes for admin operations:

```typescript
// server/api/collections/create.post.ts
export default defineEventHandler(async (event) => {
  const { collectionsApi } = useTypesenseApi()
  
  // Use admin key for creating collections
  const collection = await collectionsApi.createCollection({
    collectionSchema: {
      name: 'products',
      fields: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'price', type: 'float', sort: true },
        { name: 'category', type: 'string', facet: true }
      ],
      default_sorting_field: 'id'
    }
  })
  
  return { success: true, collection }
})
```

#### Import Documents (Server-Only)

```typescript
// server/api/products/import.post.ts
export default defineEventHandler(async (event) => {
  const { documentsApi } = useTypesenseApi()
  const products = await readBody(event)
  
  // Convert to JSONL format
  const jsonl = products.map((p: any) => JSON.stringify(p)).join('\n')
  
  // Batch import (requires admin key)
  const result = await documentsApi.importDocuments({
    collectionName: 'products',
    body: jsonl,
    action: 'upsert'
  })
  
  return { success: true, result }
})
```

#### Manage API Keys (Server-Only)

```typescript
// server/api/keys/create.post.ts
export default defineEventHandler(async (event) => {
  const { keysApi } = useTypesenseApi()
  
  // Create a search-only key (requires admin key)
  const key = await keysApi.createKey({
    apiKeySchema: {
      description: 'Search-only key for frontend',
      actions: ['documents:search'],
      collections: ['products']
    }
  })
  
  return { key: key.value }
})
```

### 🔄 Hybrid Pattern: Server API + Client Consumption

**Recommended approach for production:**

```typescript
// server/api/search.ts - Server endpoint with admin key
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { documentsApi } = useTypesenseApi()
  
  const results = await documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: query.q as string,
      query_by: 'name,description',
      filter_by: query.filter as string
    }]
  })
  
  return results.results[0]
})
```

```vue
<!-- pages/search.vue - Client-side component -->
<script setup lang="ts">
const query = ref('')

// Call your server API instead of Typesense directly
const { data: results } = await useFetch('/api/search', {
  query: { q: query }
})
</script>
```

### 📦 Available API Clients

All operations through `useTypesenseApi()`:

```typescript
const {
  analyticsApi,      // Analytics and event tracking
  collectionsApi,    // Collection management (server-side for create/delete)
  conversationsApi,  // Conversation model management
  curationSetsApi,   // Curation and overrides
  debugApi,          // Debug operations
  documentsApi,      // Document CRUD and search (search ok for client)
  healthApi,         // Health check endpoint
  keysApi,           // API key management (server-side only)
  searchModelsApi,   // NL search models
  operationsApi,     // Cluster operations (server-side only)
  presetsApi,        // Search presets
  stemmingApi,       // Stemming dictionaries
  stopwordsApi,      // Stopwords management
  synonymsApi,       // Synonyms management
} = useTypesenseApi()
```


## Configuration

### Module Options

```typescript
interface ModuleOptions {
  url?: string      // Typesense server URL
  apiKey?: string   // Typesense API key
}
```

### Basic Configuration (Search-Only)

For client-side search operations, use a **search-only API key**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_SEARCH_KEY  // Search-only key
  }
})
```

```bash
# .env
TYPESENSE_URL=https://xxx.a1.typesense.net
TYPESENSE_SEARCH_KEY=search-only-api-key-here
```

### Advanced Configuration (Server + Client)

For applications with both search and admin operations:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  
  // Public search key (exposed to client)
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_SEARCH_KEY
  },
  
  // Private admin key (server-only)
  runtimeConfig: {
    typesense: {
      adminKey: process.env.TYPESENSE_ADMIN_KEY
    }
  }
})
```

```bash
# .env
TYPESENSE_URL=https://xxx.a1.typesense.net
TYPESENSE_SEARCH_KEY=search-only-key     # Client-safe
TYPESENSE_ADMIN_KEY=admin-key-secret     # Server-only
```

Use the admin key in server routes:

```typescript
// server/api/admin/collection.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  // Override with admin key for this request
  const { collectionsApi } = useTypesenseApi()
  
  // Note: You may need to create a new API instance with admin key
  // or implement a server-side only composable
  const collection = await collectionsApi.createCollection({
    collectionSchema: { /* ... */ }
  })
  
  return collection
})
```

### Security Best Practices

| ✅ Do | ❌ Don't |
|-------|----------|
| Use search-only keys in `nuxt.config.ts` | Expose admin keys to the client |
| Store admin keys in `runtimeConfig` | Hardcode API keys in source code |
| Use server API routes for admin operations | Perform admin operations from client |
| Create scoped keys per user/tenant | Share API keys between environments |
| Rotate keys regularly | Commit keys to version control |

> **🔒 Security Rule**: If it modifies data, it belongs on the server with an admin key.

## Common Patterns

### Pattern 1: Search Page (Client-Side)

```vue
<!-- pages/search.vue -->
<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <div v-if="pending">Loading...</div>
    <div v-else-if="results?.hits">
      <p>{{ results.found }} results</p>
      <div v-for="hit in results.hits" :key="hit.document.id">
        {{ hit.document.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { documentsApi } = useTypesenseApi()
const searchQuery = ref('')

const { data: searchData, pending } = await useAsyncData(
  'search',
  async () => {
    if (!searchQuery.value) return null
    const res = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: searchQuery.value,
        query_by: 'name,description'
      }]
    })
    return res.results[0]
  },
  { watch: [searchQuery] }
)

const results = computed(() => searchData.value)
</script>
```

### Pattern 2: Data Import (Server-Side)

```typescript
// server/api/seed.post.ts
export default defineEventHandler(async (event) => {
  const { collectionsApi, documentsApi } = useTypesenseApi()
  
  // 1. Create collection (if not exists)
  try {
    await collectionsApi.createCollection({
      collectionSchema: {
        name: 'products',
        fields: [
          { name: 'id', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'price', type: 'float' }
        ],
        default_sorting_field: 'id'
      }
    })
  } catch (e) {
    // Collection might already exist
  }
  
  // 2. Import data
  const products = [
    { id: '1', name: 'Laptop', price: 999 },
    { id: '2', name: 'Mouse', price: 29 }
  ]
  
  const jsonl = products.map(p => JSON.stringify(p)).join('\n')
  await documentsApi.importDocuments({
    collectionName: 'products',
    body: jsonl,
    action: 'upsert'
  })
  
  return { success: true }
})
```

### Pattern 3: Server API with Client Consumption

**Best for production - keeps admin key secure:**

```typescript
// server/api/products/search.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { documentsApi } = useTypesenseApi()
  
  const results = await documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: (query.q as string) || '*',
      query_by: 'name,description',
      filter_by: query.category ? `category:=${query.category}` : undefined,
      per_page: 20
    }]
  })
  
  return results.results[0]
})
```

```vue
<!-- pages/products.vue -->
<script setup lang="ts">
const category = ref('electronics')

const { data: results } = await useFetch('/api/products/search', {
  query: { q: '*', category }
})
</script>
```

### Pattern 4: Real-Time Updates

```typescript
// server/api/products/[id].put.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const updates = await readBody(event)
  const { documentsApi } = useTypesenseApi()
  
  // Update in your database first
  await updateProductInDB(id, updates)
  
  // Then sync to Typesense
  await documentsApi.updateDocument({
    collectionName: 'products',
    documentId: id!,
    body: updates
  })
  
  return { success: true }
})
```

## Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/sfxcode/nuxt-typesense.git
cd nuxt-typesense

# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Start the playground in development mode
pnpm run dev
```

### Available Scripts

```bash
# Run playground in development mode
pnpm run dev

# Build the playground
pnpm run dev:build

# Build the module
pnpm run prepack

# Run tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Lint code
pnpm run lint

# Regenerate API client from OpenAPI spec
pnpm run api-codegen

# Release a new version
pnpm run release
```

### Project Structure

```
nuxt-typesense/
├── src/
│   ├── module.ts                    # Module definition
│   └── runtime/
│       ├── api/                     # Auto-generated Typesense API clients
│       ├── composables/             # Auto-imported composables
│       │   ├── typesenseApi.ts
│       │   ├── typesenseApiKey.ts
│       │   ├── typesenseUrl.ts
│       │   └── typeSenseCollection.ts
│       └── model/                   # TypeScript models
├── playground/                      # Development playground app
└── test/                           # Test files
```

### Regenerating API Client

The API client is auto-generated from the Typesense OpenAPI specification. To update it:

```bash
pnpm run api-codegen
```

This will fetch the latest OpenAPI spec from Typesense and regenerate all TypeScript API clients.

## Documentation

Full documentation is available in the `docs/` directory and includes:

- **Getting Started Guide** - Installation and setup instructions
- **Configuration** - Module options and environment variables
- **Core Concepts** - Collections, documents, search, and API keys
- **API Reference** - Complete composables and client documentation
- **Examples** - Real-world usage examples

### Running Documentation Locally

```bash
# Start documentation dev server
pnpm run docs:dev

# Build documentation
pnpm run docs:build

# Preview built documentation
pnpm run docs:preview
```

Visit http://localhost:5173 to view the documentation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

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

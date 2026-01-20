# Nuxt Typesense

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

A Nuxt module for integrating [Typesense](https://typesense.org/) - a fast, typo-tolerant search engine - into your Nuxt 3 application.

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

### Using the Main API Composable

The module provides a `useTypesenseApi()` composable that gives you access to all Typesense API clients:

```vue
<script setup lang="ts">
const { 
  analyticsApi,
  collectionsApi,
  conversationsApi,
  curationSetsApi,
  debugApi,
  documentsApi,
  healthApi,
  keysApi,
  searchModelsApi,
  operationsApi,
  presetsApi,
  stemmingApi,
  stopwordsApi,
  synonymsApi,
} = useTypesenseApi()

// Example: Check health status
const checkHealth = async () => {
  const health = await healthApi.health()
  console.log('Health status:', health)
}

// Example: Get all collections
const getCollections = async () => {
  const collections = await collectionsApi.getCollections()
  console.log('Collections:', collections)
}

// Example: Search documents
const searchDocuments = async () => {
  const results = await documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: 'laptop',
      query_by: 'name,description'
    }]
  })
  console.log('Search results:', results)
}
</script>
```

### Using Helper Composables

#### Get Collections Info

```vue
<script setup lang="ts">
const { collectionInfos } = useTypesenseCollections()

const collections = await collectionInfos()
// Returns array of: { name, fields, defaultSortingField, numDocuments, date }
</script>
```

#### Access Configuration

```vue
<script setup lang="ts">
// Get Typesense server URL
const url = useTypesenseUrl()

// Get API key
const apiKey = useTypesenseApiKey()
</script>
```

### Complete Example Component

```vue
<template>
  <div>
    <h1>Typesense Collections</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="collection in collections" :key="collection.name">
        <strong>{{ collection.name }}</strong>
        <p>Documents: {{ collection.numDocuments }}</p>
        <p>Fields: {{ collection.fields.join(', ') }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { collectionInfos } = useTypesenseCollections()

const { data: collections, pending, error } = await useAsyncData(
  'typesense-collections',
  () => collectionInfos()
)
</script>
```

## Available API Clients

The module provides full access to all Typesense API endpoints through these clients:

- **analyticsApi** - Analytics and event tracking
- **collectionsApi** - Collection management (create, update, delete, list)
- **conversationsApi** - Conversation model management
- **curationSetsApi** - Curation and overrides
- **debugApi** - Debug operations
- **documentsApi** - Document CRUD operations and search
- **healthApi** - Health check endpoint
- **keysApi** - API key management
- **searchModelsApi** - NL search models
- **operationsApi** - Cluster operations
- **presetsApi** - Search presets
- **stemmingApi** - Stemming dictionaries
- **stopwordsApi** - Stopwords management
- **synonymsApi** - Synonyms management

All APIs are fully typed and auto-generated from the official [Typesense OpenAPI specification](https://github.com/typesense/typesense-api-spec).

## Configuration

### Module Options

```typescript
interface ModuleOptions {
  url?: string      // Typesense server URL
  apiKey?: string   // Typesense API key
}
```

Configure in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  typesense: {
    url: 'http://localhost:8108',
    apiKey: 'your-search-only-api-key'
  }
})
```

> ⚠️ **Security Note**: For production, use search-only API keys in your frontend. Never expose admin API keys in client-side code.

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

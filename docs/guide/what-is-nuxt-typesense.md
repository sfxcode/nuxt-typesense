# What is Nuxt Typesense?

Nuxt Typesense is a [Nuxt 3](https://nuxt.com/) module that provides seamless integration with [Typesense](https://typesense.org/), a fast, typo-tolerant search engine that you can host yourself or use as a managed service.

## Why Typesense?

Typesense is designed to be:

- **Fast**: Returns search results in milliseconds
- **Typo-tolerant**: Handles typos gracefully in search queries
- **Easy to use**: Simple API and straightforward configuration
- **Self-hostable**: Run on your own infrastructure
- **Real-time**: Index changes appear instantly in search results
- **Scalable**: Handles millions of documents with ease

## Why This Module?

This module provides several advantages for Nuxt developers:

### Full TypeScript Support

All API methods are fully typed with TypeScript, giving you:
- IntelliSense and autocompletion in your IDE
- Type safety for all API calls
- Automatic documentation as you type

### Auto-imported Composables

No need to import functions manually - just use them:

```vue
<script setup lang="ts">
// No imports needed! These are auto-imported
const { collectionsApi } = useTypesenseApi()
const url = useTypesenseUrl()
const apiKey = useTypesenseApiKey()
</script>
```

### Auto-generated API Client

The entire Typesense API client is automatically generated from the official [OpenAPI specification](https://github.com/typesense/typesense-api-spec), ensuring:
- Always up-to-date with the latest Typesense API
- Complete coverage of all API endpoints
- Consistency with official documentation

### SSR Compatible

Works seamlessly with:
- Server-side rendering (SSR)
- Static site generation (SSG)
- Client-side rendering (CSR)

## Key Features

### 🚀 Complete API Coverage

Access all Typesense features through dedicated API clients:
- Collections management
- Document CRUD operations
- Advanced search with faceting and filtering
- Synonyms and stopwords
- Curation and overrides
- Analytics
- API key management
- And more...

### 🎯 Developer Experience

- Zero configuration required to get started
- Environment variable support
- Helper composables for common operations
- Vue-friendly async patterns with `useAsyncData`

### ⚡️ Performance

- Efficient API client with minimal overhead
- Support for batch operations
- Configurable request parameters

## Use Cases

Nuxt Typesense is perfect for:

- **E-commerce sites**: Product search with faceting and filtering
- **Documentation sites**: Fast, typo-tolerant content search
- **SaaS applications**: In-app search for user data
- **Content platforms**: Article, blog, or media search
- **Enterprise search**: Internal knowledge base search

## Next Steps

Ready to get started? Head over to the [Getting Started](/guide/getting-started) guide!

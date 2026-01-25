# Composables

Auto-imported composables for working with Typesense.

## useTypesenseApi()

The main composable that provides access to all Typesense API clients.

### Usage

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
</script>
```

### Return Value

Returns an object containing all API clients:

#### `analyticsApi`
Analytics and event tracking operations.

```typescript
// Track an event
await analyticsApi.createAnalyticsEvent({
  analyticsEventCreateSchema: {
    type: 'search',
    name: 'product_search',
    data: {
      q: 'laptop',
      user_id: '123'
    }
  }
})
```

#### `collectionsApi`
Collection management operations.

```typescript
// Get all collections
const collections = await collectionsApi.getCollections()

// Get specific collection
const collection = await collectionsApi.getCollection({
  collectionName: 'products'
})

// Create collection
await collectionsApi.createCollection({
  collectionSchema: {
    name: 'products',
    fields: [...]
  }
})

// Delete collection
await collectionsApi.deleteCollection({
  collectionName: 'products'
})
```

#### `documentsApi`
Document CRUD and search operations.

```typescript
// Search documents
const results = await documentsApi.multiSearch({
  searches: [{
    collection: 'products',
    q: 'laptop',
    query_by: 'name,description'
  }]
})

// Index document
await documentsApi.indexDocument({
  collectionName: 'products',
  body: {
    id: '1',
    name: 'Laptop',
    price: 999
  }
})

// Get document
const doc = await documentsApi.getDocument({
  collectionName: 'products',
  documentId: '1'
})

// Update document
await documentsApi.updateDocument({
  collectionName: 'products',
  documentId: '1',
  body: { price: 899 }
})

// Delete document
await documentsApi.deleteDocument({
  collectionName: 'products',
  documentId: '1'
})

// Import documents (batch)
await documentsApi.importDocuments({
  collectionName: 'products',
  body: jsonlString,
  action: 'upsert'
})
```

#### `healthApi`
Health check operations.

```typescript
// Check health
const health = await healthApi.health()
console.log(health.ok) // true
```

#### `keysApi`
API key management.

```typescript
// List keys
const keys = await keysApi.retrieveKeys()

// Create key
await keysApi.createKey({
  apiKeySchema: {
    description: 'Search key',
    actions: ['documents:search'],
    collections: ['*']
  }
})

// Delete key
await keysApi.deleteKey({ keyId: 123 })

// Generate scoped key
const scopedKey = await keysApi.generateScopedSearchKey(
  'parent-key',
  {
    filter_by: 'user_id:=123',
    expires_at: Math.floor(Date.now() / 1000) + 3600
  }
})
```

#### `synonymsApi`
Synonym management.

```typescript
// Create synonym
await synonymsApi.upsertSearchSynonym({
  collectionName: 'products',
  synonymId: 'laptop-synonyms',
  searchSynonymSchema: {
    synonyms: ['laptop', 'notebook', 'portable computer']
  }
})

// List synonyms
const synonyms = await synonymsApi.retrieveSearchSynonyms({
  collectionName: 'products'
})
```

#### `curationSetsApi`
Curation and overrides management.

```typescript
// Create override
await curationSetsApi.upsertSearchOverride({
  collectionName: 'products',
  overrideId: 'featured-laptop',
  searchOverrideSchema: {
    rule: {
      query: 'laptop',
      match: 'exact'
    },
    includes: [
      { id: 'featured-1', position: 1 }
    ]
  }
})
```

#### `stopwordsApi`
Stopwords management.

```typescript
// Create stopwords set
await stopwordsApi.upsertStopwordsSet({
  stopwordId: 'common-words',
  stopwordsSetUpsertSchema: {
    stopwords: ['the', 'a', 'an', 'and', 'or']
  }
})
```

#### `operationsApi`
Cluster operations and metrics.

```typescript
// Get cluster metrics
const metrics = await operationsApi.getMetrics()

// Take snapshot
await operationsApi.createSnapshot({
  snapshotPath: '/tmp/snapshot'
})
```

#### `debugApi`
Debug operations.

```typescript
// Get debug info
const debug = await debugApi.debug()
```

## useTypesenseUrl()

Get the configured Typesense server URL.

### Usage

```vue
<script setup lang="ts">
const url = useTypesenseUrl()
console.log('Typesense URL:', url)
</script>
```

### Return Value

Returns a string with the Typesense server URL.

## useTypesenseApiKey()

Get the configured Typesense API key.

### Usage

```vue
<script setup lang="ts">
const apiKey = useTypesenseApiKey()
console.log('API Key:', apiKey.substring(0, 5) + '...')
</script>
```

### Return Value

Returns a string with the Typesense API key.

::: warning Security
Be careful not to expose the API key in logs or error messages.
:::

## useTypesenseCollections()

Helper composable for working with collections.

### Usage

```vue
<script setup lang="ts">
const { collectionInfos } = useTypesenseCollections()

const collections = await collectionInfos()
</script>
```

### Methods

#### `collectionInfos()`

Returns formatted collection information.

**Return Type:**

```typescript
interface TypesenseCollectionInfo {
  name: string
  fields: string[]
  defaultSortingField: string
  numDocuments: number
  date: string
}
```

**Example:**

```vue
<script setup lang="ts">
const { collectionInfos } = useTypesenseCollections()

const { data: collections } = await useAsyncData(
  'collections',
  () => collectionInfos()
)
</script>

<template>
  <div v-for="col in collections" :key="col.name">
    <h3>{{ col.name }}</h3>
    <p>Documents: {{ col.numDocuments }}</p>
    <p>Fields: {{ col.fields.join(', ') }}</p>
    <p>Default Sort: {{ col.defaultSortingField }}</p>
    <p>Created: {{ col.date }}</p>
  </div>
</template>
```

## Complete Example

Here's a complete example using multiple composables:

```vue
<template>
  <div>
    <h1>Typesense Dashboard</h1>
    
    <!-- Server Info -->
    <div class="info-card">
      <h2>Server Information</h2>
      <p><strong>URL:</strong> {{ serverUrl }}</p>
      <p><strong>Status:</strong> {{ health?.ok ? '✅ Healthy' : '❌ Unhealthy' }}</p>
    </div>
    
    <!-- Collections -->
    <div class="info-card">
      <h2>Collections ({{ collections?.length }})</h2>
      <ul>
        <li v-for="col in collections" :key="col.name">
          <strong>{{ col.name }}</strong> - {{ col.numDocuments }} documents
        </li>
      </ul>
    </div>
    
    <!-- Search -->
    <div class="search-card">
      <h2>Search</h2>
      <input v-model="query" @input="performSearch" placeholder="Search..." />
      <div v-if="results">
        <p>Found {{ results.found }} results</p>
        <div v-for="hit in results.hits" :key="hit.document.id">
          {{ hit.document.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Get configuration
const serverUrl = useTypesenseUrl()

// Get API clients
const { healthApi, documentsApi } = useTypesenseApi()

// Get collections helper
const { collectionInfos } = useTypesenseCollections()

// Load data
const { data: health } = await useAsyncData(
  'health',
  () => healthApi.health()
)

const { data: collections } = await useAsyncData(
  'collections',
  () => collectionInfos()
)

// Search
const query = ref('')
const results = ref(null)

async function performSearch() {
  if (!query.value) {
    results.value = null
    return
  }
  
  const response = await documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: query.value,
      query_by: 'name,description'
    }]
  })
  
  results.value = response.results[0]
}
</script>

<style scoped>
.info-card, .search-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}
</style>
```

## TypeScript Support

All composables are fully typed with TypeScript. You'll get full IntelliSense and type checking:

```typescript
// Type inference works automatically
const { documentsApi } = useTypesenseApi()

// Parameters are type-checked
const results = await documentsApi.multiSearch({
  searches: [{
    collection: 'products',
    q: 'laptop',
    query_by: 'name',  // Type-safe string
    per_page: 20       // Type-safe number
  }]
})

// Response is fully typed
const hits = results.results[0].hits
hits?.forEach(hit => {
  // hit.document is typed according to your schema
  console.log(hit.document.id)
})
```

## Next Steps

- Explore [API Clients](/api/clients)
- Check [Type Definitions](/api/types)
- See [Examples](/examples/basic-usage)

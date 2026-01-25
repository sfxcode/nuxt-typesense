# API Clients

Complete reference for all Typesense API clients.

## Overview

All API clients are auto-generated from the [Typesense OpenAPI specification](https://github.com/typesense/typesense-api-spec) and provide full TypeScript support.

## Available Clients

### AnalyticsApi

Track and analyze search analytics.

```typescript
const { analyticsApi } = useTypesenseApi()

// Create analytics event
await analyticsApi.createAnalyticsEvent({
  analyticsEventCreateSchema: {
    type: 'search',
    name: 'product_search',
    data: {
      q: 'laptop',
      userId: '123'
    }
  }
})

// Get analytics rules
const rules = await analyticsApi.retrieveAnalyticsRules()
```

### CollectionsApi

Manage collections (schemas).

```typescript
const { collectionsApi } = useTypesenseApi()

// List collections
const collections = await collectionsApi.getCollections()

// Get collection
const collection = await collectionsApi.getCollection({
  collectionName: 'products'
})

// Create collection
await collectionsApi.createCollection({
  collectionSchema: {
    name: 'products',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'price', type: 'float' }
    ],
    defaultSortingField: 'id'
  }
})

// Update collection
await collectionsApi.updateCollection({
  collectionName: 'products',
  collectionUpdateSchema: {
    fields: [
      { name: 'new_field', type: 'string', optional: true }
    ]
  }
})

// Delete collection
await collectionsApi.deleteCollection({
  collectionName: 'products'
})

// Collection aliases
await collectionsApi.upsertCollectionAlias({
  aliasName: 'products',
  collectionAliasSchema: {
    collectionName: 'products_v1'
  }
})
```

### DocumentsApi

CRUD operations and search for documents.

```typescript
const { documentsApi } = useTypesenseApi()

// Search (multi-search)
const results = await documentsApi.multiSearch({
  searches: [{
    collection: 'products',
    q: 'laptop',
    queryBy: 'name,description',
    filterBy: 'price:<1000',
    sortBy: 'price:asc',
    page: 1,
    perPage: 20
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
  body: {
    price: 899
  }
})

// Upsert document
await documentsApi.upsertDocument({
  collectionName: 'products',
  documentId: '1',
  body: {
    id: '1',
    name: 'Laptop',
    price: 899
  }
})

// Delete document
await documentsApi.deleteDocument({
  collectionName: 'products',
  documentId: '1'
})

// Delete by query
await documentsApi.deleteDocuments({
  collectionName: 'products',
  filterBy: 'price:<100'
})

// Import documents (batch)
const jsonl = documents.map(d => JSON.stringify(d)).join('\n')
await documentsApi.importDocuments({
  collectionName: 'products',
  body: jsonl,
  action: 'upsert',
  batchSize: 100
})

// Export documents
const exported = await documentsApi.exportDocuments({
  collectionName: 'products',
  filterBy: 'category:=Electronics'
})
```

### HealthApi

Check server health.

```typescript
const { healthApi } = useTypesenseApi()

const health = await healthApi.health()
console.log(health.ok) // true
```

### KeysApi

Manage API keys.

```typescript
const { keysApi } = useTypesenseApi()

// List keys
const keys = await keysApi.retrieveKeys()

// Get specific key
const key = await keysApi.retrieveKey({ keyId: 123 })

// Create key
await keysApi.createKey({
  apiKeySchema: {
    description: 'Search-only key',
    actions: ['documents:search'],
    collections: ['*'],
    expiresAt: Math.floor(Date.now() / 1000) + 86400
  }
})

// Delete key
await keysApi.deleteKey({ keyId: 123 })

// Generate scoped key
const scopedKey = await keysApi.generateScopedSearchKey(
  'parent-search-key',
  {
    filterBy: 'userId:=123',
    expiresAt: Math.floor(Date.now() / 1000) + 3600
  }
)
```

### SynonymsApi

Manage search synonyms.

```typescript
const { synonymsApi } = useTypesenseApi()

// List synonyms
const synonyms = await synonymsApi.retrieveSearchSynonyms({
  collectionName: 'products'
})

// Get synonym
const synonym = await synonymsApi.retrieveSearchSynonym({
  collectionName: 'products',
  synonymId: 'laptop-synonyms'
})

// Create/update synonym
await synonymsApi.upsertSearchSynonym({
  collectionName: 'products',
  synonymId: 'laptop-synonyms',
  searchSynonymSchema: {
    synonyms: ['laptop', 'notebook', 'portable computer']
  }
})

// Delete synonym
await synonymsApi.deleteSearchSynonym({
  collectionName: 'products',
  synonymId: 'laptop-synonyms'
})
```

### CurationSetsApi

Manage search overrides (curation).

```typescript
const { curationSetsApi } = useTypesenseApi()

// List overrides
const overrides = await curationSetsApi.retrieveSearchOverrides({
  collectionName: 'products'
})

// Get override
const override = await curationSetsApi.retrieveSearchOverride({
  collectionName: 'products',
  overrideId: 'featured-laptop'
})

// Create/update override
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
    ],
    excludes: [
      { id: 'excluded-1' }
    ]
  }
})

// Delete override
await curationSetsApi.deleteSearchOverride({
  collectionName: 'products',
  overrideId: 'featured-laptop'
})
```

### StopwordsApi

Manage stopwords.

```typescript
const { stopwordsApi } = useTypesenseApi()

// List stopwords sets
const sets = await stopwordsApi.retrieveAllStopwordsSets()

// Get stopwords set
const set = await stopwordsApi.retrieveStopwordsSet({
  stopwordId: 'common-words'
})

// Create/update stopwords set
await stopwordsApi.upsertStopwordsSet({
  stopwordId: 'common-words',
  stopwordsSetUpsertSchema: {
    stopwords: ['the', 'a', 'an', 'and', 'or', 'but']
  }
})

// Delete stopwords set
await stopwordsApi.deleteStopwordsSet({
  stopwordId: 'common-words'
})
```

### OperationsApi

Cluster operations and metrics.

```typescript
const { operationsApi } = useTypesenseApi()

// Get cluster metrics
const metrics = await operationsApi.getMetrics()

// Get API stats
const stats = await operationsApi.getStats()

// Create snapshot
await operationsApi.createSnapshot({
  snapshotPath: '/tmp/snapshot'
})

// Trigger vote
await operationsApi.vote()

// Toggle slow request log
await operationsApi.toggleSlowRequestLog({
  slowRequestLoggingConfigSchema: {
    time_ms: 2000
  }
})
```

### DebugApi

Debug operations.

```typescript
const { debugApi } = useTypesenseApi()

const debug = await debugApi.debug()
console.log(debug)
```

### PresetsApi

Manage search presets.

```typescript
const { presetsApi } = useTypesenseApi()

// List presets
const presets = await presetsApi.retrieveAllPresets()

// Get preset
const preset = await presetsApi.retrievePreset({
  presetId: 'my-preset'
})

// Create/update preset
await presetsApi.upsertPreset({
  presetId: 'my-preset',
  presetUpsertSchema: {
    value: {
      searches: [{
        collection: 'products',
        queryBy: 'name,description',
        sortBy: 'price:asc'
      }]
    }
  }
})

// Delete preset
await presetsApi.deletePreset({
  presetId: 'my-preset'
})
```

### ConversationsApi

Manage conversation models.

```typescript
const { conversationsApi } = useTypesenseApi()

// List conversation models
const models = await conversationsApi.retrieveAllConversationModels()

// Get conversation model
const model = await conversationsApi.retrieveConversationModel({
  modelId: 'my-model'
})

// Create conversation model
await conversationsApi.createConversationModel({
  conversationModelCreateSchema: {
    id: 'my-model',
    model_name: 'openai/gpt-3.5-turbo',
    api_key: 'your-openai-key',
    system_prompt: 'You are a helpful assistant.'
  }
})

// Update conversation model
await conversationsApi.updateConversationModel({
  modelId: 'my-model',
  conversationModelUpdateSchema: {
    system_prompt: 'Updated prompt'
  }
})

// Delete conversation model
await conversationsApi.deleteConversationModel({
  modelId: 'my-model'
})
```

## Error Handling

All API methods can throw errors. Handle them appropriately:

```typescript
try {
  const { documentsApi } = useTypesenseApi()
  await documentsApi.indexDocument({
    collectionName: 'products',
    body: document
  })
} catch (error) {
  if (error instanceof Response) {
    const errorData = await error.json()
    console.error('Typesense error:', errorData.message)
  } else {
    console.error('Network error:', error)
  }
}
```

## Custom Request Options

You can pass custom fetch options to any API method:

```typescript
const { documentsApi } = useTypesenseApi()

const results = await documentsApi.multiSearch({
  searches: [...]
}, {
  headers: {
    'X-TYPESENSE-API-KEY': 'custom-key',
    'X-Custom-Header': 'value'
  },
  signal: abortController.signal  // For cancellation
})
```

## Next Steps

- Check [Composables](/api/composables)
- View [Type Definitions](/api/types)
- See [Examples](/examples/basic-usage)

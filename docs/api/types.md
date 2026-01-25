# Type Definitions

TypeScript type definitions for the Nuxt Typesense module.

## Module Configuration

### ModuleOptions

Configuration options for the Nuxt Typesense module.

```typescript
interface ModuleOptions {
  /**
   * Typesense server URL
   * @example 'http://localhost:8108'
   * @example 'https://xxx.a1.typesense.net'
   */
  url?: string

  /**
   * Typesense API key for authentication
   * Use search-only keys in production frontend code
   */
  apiKey?: string

  /**
   * Enable client-side mode
   * @default false
   */
  clientMode?: boolean
}
```

## Collection Types

### CollectionSchema

Schema for creating a new collection.

```typescript
interface CollectionSchema {
  name: string
  fields: Field[]
  defaultSortingField?: string
  enableNestedFields?: boolean
  tokenSeparators?: string[]
  symbolsToIndex?: string[]
}

interface Field {
  name: string
  type: FieldType
  facet?: boolean
  optional?: boolean
  index?: boolean
  sort?: boolean
  infix?: boolean
  locale?: string
}

type FieldType = 
  | 'string'
  | 'int32'
  | 'int64'
  | 'float'
  | 'bool'
  | 'geopoint'
  | 'geopoint[]'
  | 'string[]'
  | 'int32[]'
  | 'int64[]'
  | 'float[]'
  | 'bool[]'
  | 'object'
  | 'object[]'
  | 'auto'
```

### CollectionResponse

Response when retrieving collection information.

```typescript
interface CollectionResponse {
  name: string
  numDocuments: number
  fields: Field[]
  defaultSortingField: string
  createdAt: number
}
```

## Search Types

### SearchParameters

Parameters for searching documents.

```typescript
interface SearchParameters {
  /** The query text to search for */
  q: string

  /** Fields to search in (comma-separated) */
  queryBy: string

  /** Field weights (comma-separated numbers) */
  queryByWeights?: string

  /** Filter results using filter expressions */
  filterBy?: string

  /** Fields to facet by (comma-separated) */
  facetBy?: string

  /** Maximum number of facet values to return */
  maxFacetValues?: number

  /** Sort results by fields */
  sortBy?: string

  /** Page number (starts at 1) */
  page?: number

  /** Number of results per page */
  perPage?: number

  /** Group results by a field */
  groupBy?: string

  /** Number of results per group */
  groupLimit?: number

  /** Enable prefix search */
  prefix?: boolean | string

  /** Number of typos to tolerate */
  numTypos?: number | string

  /** Minimum word length for typo tolerance */
  minLen1typo?: number

  /** Minimum word length for 2 typos */
  minLen2typo?: number

  /** Enable exhaustive search */
  exhaustiveSearch?: boolean

  /** Highlight matching terms */
  highlightFullFields?: string

  /** Tag to wrap highlighted text */
  highlightStartTag?: string

  /** Closing tag for highlighted text */
  highlightEndTag?: string

  /** Fields to include in response */
  includeFields?: string

  /** Fields to exclude from response */
  excludeFields?: string

  /** Prioritize exact matches */
  prioritizeExactMatch?: boolean

  /** Prioritize token order */
  prioritizeTokenPosition?: boolean

  /** Enable pinned hits */
  pinnedHits?: string

  /** Enable hidden hits */
  hiddenHits?: string

  /** Search cutoff in milliseconds */
  searchCutoffMs?: number

  /** Use cache */
  useCache?: boolean

  /** Cache TTL in seconds */
  cacheTtl?: number
}
```

### SearchResponse

Response from a search operation.

```typescript
interface SearchResponse<T = any> {
  facetCounts?: FacetCounts[]
  found: number
  outOf: number
  page: number
  requestParams: SearchParameters
  searchTimeMs: number
  searchCutoff: boolean
  hits?: SearchHit<T>[]
  groupedHits?: GroupedHit<T>[]
}

interface SearchHit<T = any> {
  document: T
  highlights?: Highlight[]
  textMatch: number
  textMatchInfo?: TextMatchInfo
}

interface Highlight {
  field: string
  snippet?: string
  snippets?: string[]
  matchedTokens: string[]
}

interface FacetCounts {
  fieldName: string
  counts: FacetCount[]
  stats?: FacetStats
}

interface FacetCount {
  value: string
  count: number
  highlighted?: string
}
```

## Document Types

### Document

Generic document type. Extend this with your own schema.

```typescript
interface Document {
  id: string
  [key: string]: any
}

// Example: Custom product document
interface Product extends Document {
  id: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
  createdAt: number
  tags?: string[]
}
```

### ImportDocumentsParameters

Parameters for importing documents.

```typescript
interface ImportDocumentsParameters {
  collectionName: string
  body: string  // JSONL format
  action?: 'create' | 'update' | 'upsert' | 'emplace'
  batchSize?: number
  dirtyValues?: 'coerce_or_reject' | 'coerce_or_drop' | 'drop' | 'reject'
  returnId?: boolean
  returnDoc?: boolean
}
```

## API Key Types

### ApiKeySchema

Schema for creating an API key.

```typescript
interface ApiKeySchema {
  description: string
  actions: Action[]
  collections: string[]
  expiresAt?: number
  value?: string
}

type Action =
  | '*'
  | 'documents:search'
  | 'documents:get'
  | 'documents:create'
  | 'documents:update'
  | 'documents:delete'
  | 'collections:*'
  | 'collections:create'
  | 'collections:get'
  | 'collections:list'
  | 'collections:delete'
  | 'synonyms:*'
  | 'overrides:*'
  | 'keys:*'
```

### ApiKey

Response when retrieving an API key.

```typescript
interface ApiKey {
  id: number
  description: string
  actions: Action[]
  collections: string[]
  valuePrefix: string
  expiresAt?: number
  autodelete: boolean
}
```

## Synonym Types

### SearchSynonymSchema

Schema for creating/updating synonyms.

```typescript
interface SearchSynonymSchema {
  synonyms: string[]
  root?: string
  locale?: string
}
```

## Override Types

### SearchOverrideSchema

Schema for creating search overrides.

```typescript
interface SearchOverrideSchema {
  rule: Rule
  includes?: Include[]
  excludes?: Exclude[]
  filterBy?: string
  removeMatchedTokens?: boolean
  effectiveFromTs?: number
  effectiveToTs?: number
}

interface Rule {
  query: string
  match: 'exact' | 'contains'
}

interface Include {
  id: string
  position: number
}

interface Exclude {
  id: string
}
```

## Helper Types

### TypesenseCollectionInfo

Formatted collection information from `useTypesenseCollections()`.

```typescript
interface TypesenseCollectionInfo {
  name: string
  fields: string[]
  defaultSortingField: string
  numDocuments: number
  date: string
}
```

## Using Types in Your Project

### Type-safe Documents

Define your document schemas:

```typescript
// types/product.ts
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  inStock: boolean
  rating?: number
  createdAt: number
}
```

Use with API methods:

```vue
<script setup lang="ts">
import type { Product } from '~/types/product'

const { documentsApi } = useTypesenseApi()

// Type-safe search
const { data } = await useAsyncData(
  'products',
  async () => {
    const response = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: 'laptop',
        queryBy: 'name,description'
      }]
    })
    return response.results[0]
  }
)

// Typed documents
const products = computed(() => 
  data.value?.hits?.map(hit => hit.document as Product) ?? []
)
</script>

<template>
  <div v-for="product in products" :key="product.id">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p>${{ product.price }}</p>
  </div>
</template>
```

### Type-safe Search Parameters

```typescript
import type { SearchParameters } from '@sfxcode/nuxt-typesense'

const searchParams: SearchParameters = {
  q: 'laptop',
  queryBy: 'name,description',
  filterBy: 'price:<1000',
  sortBy: 'price:asc',
  page: 1,
  perPage: 20,
  facetBy: 'category,brand',
  highlightFullFields: 'name,description'
}
```

### Extending Module Options

```typescript
// nuxt.config.ts
import type { ModuleOptions } from '@sfxcode/nuxt-typesense'

const typesenseConfig: ModuleOptions = {
  url: process.env.TYPESENSE_URL,
  apiKey: process.env.TYPESENSE_API_KEY,
  clientMode: false
}

export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  typesense: typesenseConfig
})
```

## Next Steps

- Back to [Composables](/api/composables)
- View [API Clients](/api/clients)
- Check [Examples](/examples/basic-usage)

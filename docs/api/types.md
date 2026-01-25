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
  default_sorting_field?: string
  enable_nested_fields?: boolean
  token_separators?: string[]
  symbols_to_index?: string[]
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
  num_documents: number
  fields: Field[]
  default_sorting_field: string
  created_at: number
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
  query_by: string

  /** Field weights (comma-separated numbers) */
  query_by_weights?: string

  /** Filter results using filter expressions */
  filter_by?: string

  /** Fields to facet by (comma-separated) */
  facet_by?: string

  /** Maximum number of facet values to return */
  max_facet_values?: number

  /** Sort results by fields */
  sort_by?: string

  /** Page number (starts at 1) */
  page?: number

  /** Number of results per page */
  per_page?: number

  /** Group results by a field */
  group_by?: string

  /** Number of results per group */
  group_limit?: number

  /** Enable prefix search */
  prefix?: boolean | string

  /** Number of typos to tolerate */
  num_typos?: number | string

  /** Minimum word length for typo tolerance */
  min_len_1typo?: number

  /** Minimum word length for 2 typos */
  min_len_2typo?: number

  /** Enable exhaustive search */
  exhaustive_search?: boolean

  /** Highlight matching terms */
  highlight_full_fields?: string

  /** Tag to wrap highlighted text */
  highlight_start_tag?: string

  /** Closing tag for highlighted text */
  highlight_end_tag?: string

  /** Fields to include in response */
  include_fields?: string

  /** Fields to exclude from response */
  exclude_fields?: string

  /** Prioritize exact matches */
  prioritize_exact_match?: boolean

  /** Prioritize token order */
  prioritize_token_position?: boolean

  /** Enable pinned hits */
  pinned_hits?: string

  /** Enable hidden hits */
  hidden_hits?: string

  /** Search cutoff in milliseconds */
  search_cutoff_ms?: number

  /** Use cache */
  use_cache?: boolean

  /** Cache TTL in seconds */
  cache_ttl?: number
}
```

### SearchResponse

Response from a search operation.

```typescript
interface SearchResponse<T = any> {
  facet_counts?: FacetCounts[]
  found: number
  out_of: number
  page: number
  request_params: SearchParameters
  search_time_ms: number
  search_cutoff: boolean
  hits?: SearchHit<T>[]
  grouped_hits?: GroupedHit<T>[]
}

interface SearchHit<T = any> {
  document: T
  highlights?: Highlight[]
  text_match: number
  text_match_info?: TextMatchInfo
}

interface Highlight {
  field: string
  snippet?: string
  snippets?: string[]
  matched_tokens: string[]
}

interface FacetCounts {
  field_name: string
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
  in_stock: boolean
  created_at: number
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
  batch_size?: number
  dirty_values?: 'coerce_or_reject' | 'coerce_or_drop' | 'drop' | 'reject'
  return_id?: boolean
  return_doc?: boolean
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
  expires_at?: number
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
  value_prefix: string
  expires_at?: number
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
  filter_by?: string
  remove_matched_tokens?: boolean
  effective_from_ts?: number
  effective_to_ts?: number
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
  in_stock: boolean
  rating?: number
  created_at: number
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
        query_by: 'name,description'
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
  query_by: 'name,description',
  filter_by: 'price:<1000',
  sort_by: 'price:asc',
  page: 1,
  per_page: 20,
  facet_by: 'category,brand',
  highlight_full_fields: 'name,description'
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

# Server Routes

The module automatically registers server API routes that proxy requests to your Typesense instance. These routes are available in both SSR and client-side contexts.

::: warning Security Note
Server routes use the API key configured in your `nuxt.config.ts` server runtime config, keeping your credentials secure. Never expose your admin API key to the client.
:::

## Status & Health

### GET `/api/typesense/status`

Get the status and health information of your Typesense server.

**Response:**
```typescript
{
  name: 'TYPESENSE',
  url: string,
  version: string,
  healthy: boolean
}
```

**Example:**
```typescript
// In a component or page
const { data: status } = await useFetch('/api/typesense/status')
console.log(status.value) // { name: 'TYPESENSE', url: '...', version: '...' }
```

## Collections

### GET `/api/typesense/collections`

Retrieve all collections from your Typesense instance.

**Response:** Array of collection schemas

**Example:**
```typescript
const { data: collections } = await useFetch('/api/typesense/collections')
```

### POST `/api/typesense/collections`

Create a new collection.

**Request Body:**
```typescript
{
  name: string
  fields: Array<{
    name: string
    type: string
    facet?: boolean
    optional?: boolean
    index?: boolean
  }>
  default_sorting_field?: string
}
```

**Example:**
```typescript
const { data: collection } = await useFetch('/api/typesense/collections', {
  method: 'POST',
  body: {
    name: 'products',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'price', type: 'float' },
      { name: 'category', type: 'string', facet: true }
    ],
    default_sorting_field: 'price'
  }
})
```

### GET `/api/typesense/collections/:name`

Get details of a specific collection.

**Parameters:**
- `name` - Collection name

**Example:**
```typescript
const { data: collection } = await useFetch('/api/typesense/collections/products')
```

### PATCH `/api/typesense/collections/:name`

Update a collection's schema.

**Parameters:**
- `name` - Collection name

**Request Body:** Collection schema updates

**Example:**
```typescript
const { data } = await useFetch('/api/typesense/collections/products', {
  method: 'PATCH',
  body: {
    fields: [
      { name: 'rating', type: 'float', drop: false }
    ]
  }
})
```

### DELETE `/api/typesense/collections/:name`

Delete a collection and all its documents.

**Parameters:**
- `name` - Collection name

**Example:**
```typescript
await $fetch('/api/typesense/collections/old_products', {
  method: 'DELETE'
})
```

## Collection Aliases

Collection aliases allow you to reference a collection by an alternative name, making it easier to switch between collections without changing your application code.

### GET `/api/typesense/alias/:alias`

Get the collection associated with an alias.

**Parameters:**
- `alias` - Alias name

**Example:**
```typescript
const { data: aliasInfo } = await useFetch('/api/typesense/alias/current_products')
```

### PUT `/api/typesense/alias/:alias`

Create or update an alias to point to a collection.

**Parameters:**
- `alias` - Alias name

**Request Body:**
```typescript
{
  collection_name: string
}
```

**Example:**
```typescript
await $fetch('/api/typesense/alias/current_products', {
  method: 'PUT',
  body: {
    collection_name: 'products_v2'
  }
})
```

### DELETE `/api/typesense/alias/:alias`

Delete an alias.

**Parameters:**
- `alias` - Alias name

**Example:**
```typescript
await $fetch('/api/typesense/alias/old_alias', {
  method: 'DELETE'
})
```

## Documents

### POST `/api/typesense/documents/:collection`

Create or index a single document in a collection.

**Parameters:**
- `collection` - Collection name

**Request Body:** Document object matching the collection schema

**Example:**
```typescript
const { data: document } = await useFetch('/api/typesense/documents/products', {
  method: 'POST',
  body: {
    id: '1',
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics'
  }
})
```

### POST `/api/typesense/documents/:collection/search`

Search for documents in a collection.

**Parameters:**
- `collection` - Collection name

**Request Body:** Search parameters
```typescript
{
  q: string              // Query text
  query_by: string       // Fields to query against
  filter_by?: string     // Filter conditions
  sort_by?: string       // Sort order
  facet_by?: string      // Fields to facet
  max_facet_values?: number
  per_page?: number      // Results per page (default: 10)
  page?: number          // Page number (default: 1)
  // ... and many more search parameters
}
```

**Example:**
```typescript
const { data: results } = await useFetch('/api/typesense/documents/products/search', {
  method: 'POST',
  body: {
    q: 'laptop',
    query_by: 'name,description',
    filter_by: 'price:<1000',
    sort_by: 'price:asc',
    per_page: 20
  }
})
```

### POST `/api/typesense/documents/:collection/multi-search`

Perform multiple searches in a single HTTP request for better performance.

**Parameters:**
- `collection` - Collection name

**Request Body:**
```typescript
{
  searches: Array<{
    q: string
    query_by: string
    // ... other search parameters
  }>
}
```

**Example:**
```typescript
const { data: results } = await useFetch('/api/typesense/documents/products/multi-search', {
  method: 'POST',
  body: {
    searches: [
      { q: 'laptop', query_by: 'name' },
      { q: 'phone', query_by: 'name' }
    ]
  }
})
```

### GET `/api/typesense/documents/:collection/export`

Export all documents from a collection as JSONL.

**Parameters:**
- `collection` - Collection name

**Example:**
```typescript
const { data: documents } = await useFetch('/api/typesense/documents/products/export')
```

### POST `/api/typesense/documents/:collection/import`

Import multiple documents at once using JSONL format.

**Parameters:**
- `collection` - Collection name

**Request Body:**
```typescript
{
  documents: string      // JSONL string (one JSON object per line)
  parameters?: {
    action?: 'create' | 'update' | 'upsert' | 'emplace'
    batch_size?: number
    dirty_values?: 'coerce_or_reject' | 'coerce_or_drop' | 'drop' | 'reject'
  }
}
```

**Example:**
```typescript
const documentsJsonl = `{"id":"1","name":"Product 1","price":10}
{"id":"2","name":"Product 2","price":20}`

const { data: result } = await useFetch('/api/typesense/documents/products/import', {
  method: 'POST',
  body: {
    documents: documentsJsonl,
    parameters: {
      action: 'upsert',
      batch_size: 100
    }
  }
})
```

### POST `/api/typesense/documents/:collection/delete`

Delete documents matching a filter query.

**Parameters:**
- `collection` - Collection name

**Request Body:**
```typescript
{
  filter_by: string      // Filter expression
}
```

**Example:**
```typescript
await $fetch('/api/typesense/documents/products/delete', {
  method: 'POST',
  body: {
    filter_by: 'price:>1000'
  }
})
```

### POST `/api/typesense/documents/:collection/update`

Update documents matching a filter query.

**Parameters:**
- `collection` - Collection name

**Request Body:**
```typescript
{
  filter_by: string      // Filter expression
  updates: object        // Fields to update
}
```

**Example:**
```typescript
await $fetch('/api/typesense/documents/products/update', {
  method: 'POST',
  body: {
    filter_by: 'category:=Electronics',
    updates: {
      discount: 10
    }
  }
})
```

### GET `/api/typesense/documents/:collection/id/:id`

Retrieve a specific document by its ID.

**Parameters:**
- `collection` - Collection name
- `id` - Document ID

**Example:**
```typescript
const { data: document } = await useFetch('/api/typesense/documents/products/id/123')
```

### PATCH `/api/typesense/documents/:collection/id/:id`

Update specific fields of a document.

**Parameters:**
- `collection` - Collection name
- `id` - Document ID

**Request Body:** Partial document with fields to update

**Example:**
```typescript
await $fetch('/api/typesense/documents/products/id/123', {
  method: 'PATCH',
  body: {
    price: 899.99,
    inStock: true
  }
})
```

### DELETE `/api/typesense/documents/:collection/id/:id`

Delete a specific document.

**Parameters:**
- `collection` - Collection name
- `id` - Document ID

**Example:**
```typescript
await $fetch('/api/typesense/documents/products/id/123', {
  method: 'DELETE'
})
```

## API Keys

::: danger Admin API Key Required
Key management endpoints require an admin API key. Use these carefully and only in server-side code.
:::

### GET `/api/typesense/keys`

Retrieve all API keys.

**Example:**
```typescript
const { data: keys } = await useFetch('/api/typesense/keys')
```

### POST `/api/typesense/keys`

Create a new API key.

**Request Body:**
```typescript
{
  description: string
  actions: string[]        // e.g., ['documents:search', 'documents:get']
  collections: string[]    // Collections this key can access
  expires_at?: number      // Unix timestamp
  value?: string           // Custom key value (optional)
}
```

**Example:**
```typescript
const { data: key } = await useFetch('/api/typesense/keys', {
  method: 'POST',
  body: {
    description: 'Search-only key',
    actions: ['documents:search'],
    collections: ['products'],
    expires_at: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) // 30 days
  }
})
```

### GET `/api/typesense/keys/:id`

Get details of a specific API key.

**Parameters:**
- `id` - Key ID

**Example:**
```typescript
const { data: key } = await useFetch('/api/typesense/keys/123')
```

### DELETE `/api/typesense/keys/:id`

Delete an API key.

**Parameters:**
- `id` - Key ID

**Example:**
```typescript
await $fetch('/api/typesense/keys/123', {
  method: 'DELETE'
})
```

## Scoped API Keys

### POST `/api/typesense/key/scoped/:key`

Generate a scoped search key that restricts a parent search key with additional search parameters. This is useful for implementing row-level security or user-specific search restrictions.

**Parameters:**
- `key` - Parent search API key

**Request Body:** Search parameters to embed in the scoped key
```typescript
{
  filter_by?: string
  expires_at?: number
  // ... other search parameters
}
```

**Response:** Base64-encoded scoped key string

**Example:**
```typescript
// Generate a scoped key that only allows searching products in a specific category
const { data: scopedKey } = await useFetch('/api/typesense/key/scoped/xyz123abc', {
  method: 'POST',
  body: {
    filter_by: 'category:=Electronics AND user_id:=42',
    expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour
  }
})

// Use the scoped key in client-side searches
// This key can only search Electronics where user_id = 42
```

::: tip Use Case
Scoped keys are perfect for multi-tenant applications where you need to ensure users can only search their own data without revealing the filtering logic to the client.
:::

## Error Handling

All routes may return errors with the following structure:

```typescript
{
  statusCode: number,
  message: string
}
```

Common error codes:
- `400` - Bad Request (missing parameters)
- `401` - Unauthorized (invalid API key)
- `404` - Not Found (collection/document doesn't exist)
- `409` - Conflict (collection already exists)
- `500` - Server Error

**Example with error handling:**
```typescript
try {
  const { data, error } = await useFetch('/api/typesense/collections', {
    method: 'POST',
    body: newCollection
  })
  
  if (error.value) {
    console.error('Failed to create collection:', error.value.message)
  }
} catch (err) {
  console.error('Network error:', err)
}
```

## Usage Tips

### Using $fetch vs useFetch

- Use `useFetch` for data fetching in components (provides reactivity and SSR support)
- Use `$fetch` for imperative operations like create, update, delete

```typescript
// Good for data fetching
const { data, pending, refresh } = await useFetch('/api/typesense/collections')

// Good for mutations
await $fetch('/api/typesense/collections', {
  method: 'POST',
  body: newCollection
})
```

### Server-Side Usage

You can also use these routes in server-side code:

```typescript
// In a server route or API handler
export default defineEventHandler(async (event) => {
  // This works in server context too
  const collections = await $fetch('/api/typesense/collections')
  return collections
})
```

### Type Safety

All routes work with the TypeScript types exported by the module:

```typescript
import type { CollectionSchema, SearchParameters } from '#nuxt-typesense'

const schema: CollectionSchema = {
  name: 'products',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' }
  ]
}

await $fetch('/api/typesense/collections', {
  method: 'POST',
  body: schema
})
```

## See Also

- [Composables](/api/composables) - Client-side composables for working with these routes
- [Search Guide](/guide/search) - Detailed guide on search functionality
- [Collections Guide](/guide/collections) - Working with collections
- [Documents Guide](/guide/documents) - Managing documents

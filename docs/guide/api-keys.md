# API Keys

Learn how to manage Typesense API keys for secure access control.

## Overview

Typesense uses API keys for authentication. There are different types of keys with varying permissions:

- **Admin Key**: Full access to all operations
- **Search-Only Key**: Read-only access for searches
- **Scoped Key**: Limited access with filters and expiration

## Creating API Keys

### Create a Search-Only Key

```typescript
const { keysApi } = useTypesenseApi()

const key = await keysApi.createKey({
  apiKeySchema: {
    description: 'Search-only key for frontend',
    actions: ['documents:search'],
    collections: ['*']  // All collections
  }
})

console.log('New key:', key.value)
```

### Create a Collection-Specific Key

```typescript
const key = await keysApi.createKey({
  apiKeySchema: {
    description: 'Products search key',
    actions: ['documents:search'],
    collections: ['products']  // Only products collection
  }
})
```

### Create a Key with Expiration

```typescript
const key = await keysApi.createKey({
  apiKeySchema: {
    description: 'Temporary key',
    actions: ['documents:search'],
    collections: ['*'],
    expires_at: Math.floor(Date.now() / 1000) + 86400  // 24 hours
  }
})
```

## Listing API Keys

```typescript
const { keysApi } = useTypesenseApi()

const { data: keys } = await useAsyncData(
  'api-keys',
  () => keysApi.retrieveKeys()
)
```

```vue
<template>
  <div>
    <h2>API Keys</h2>
    <div v-for="key in keys?.keys" :key="key.id">
      <p><strong>ID:</strong> {{ key.id }}</p>
      <p><strong>Description:</strong> {{ key.description }}</p>
      <p><strong>Actions:</strong> {{ key.actions.join(', ') }}</p>
      <p><strong>Collections:</strong> {{ key.collections.join(', ') }}</p>
      <button @click="deleteKey(key.id)">Delete</button>
    </div>
  </div>
</template>
```

## Retrieving a Specific Key

```typescript
const { keysApi } = useTypesenseApi()

const key = await keysApi.retrieveKey({
  keyId: 123
})
```

## Deleting API Keys

```typescript
const { keysApi } = useTypesenseApi()

await keysApi.deleteKey({
  keyId: 123
})
```

## Scoped Search Keys

Scoped keys allow you to create temporary, filtered search keys from a parent key. This is useful for:

- Multi-tenant applications
- User-specific filtering
- Time-limited access

### Generate a Scoped Key

```typescript
const { keysApi } = useTypesenseApi()

// Parent search-only key
const parentKey = 'your-search-only-key'

// Generate scoped key
const scopedKey = await keysApi.generateScopedSearchKey(
  parentKey,
  {
    filter_by: 'user_id:=123',
    expires_at: Math.floor(Date.now() / 1000) + 3600  // 1 hour
  }
)

// Use scoped key for searches
const results = await documentsApi.multiSearch({
  searches: [{
    collection: 'documents',
    q: 'query',
    query_by: 'content'
  }]
}, {
  headers: {
    'X-TYPESENSE-API-KEY': scopedKey
  }
})
```

### Server-Side Scoped Key Generation

Create an API endpoint to generate scoped keys:

```typescript
// server/api/typesense/scoped-key.ts
export default defineEventHandler(async (event) => {
  const session = await useUserSession(event)
  
  if (!session.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  
  const { keysApi } = useTypesenseApi()
  const config = useRuntimeConfig()
  
  // Generate scoped key for this user
  const scopedKey = await keysApi.generateScopedSearchKey(
    config.typesense.searchKey,
    {
      filter_by: `user_id:=${session.user.id}`,
      expires_at: Math.floor(Date.now() / 1000) + 3600
    }
  )
  
  return { key: scopedKey }
})
```

Use in your frontend:

```vue
<script setup lang="ts">
const { data: scopedKeyData } = await useFetch('/api/typesense/scoped-key')

const searchWithScopedKey = async () => {
  const { documentsApi } = useTypesenseApi()
  
  const results = await documentsApi.multiSearch({
    searches: [{
      collection: 'documents',
      q: 'query',
      query_by: 'content'
    }]
  }, {
    headers: {
      'X-TYPESENSE-API-KEY': scopedKeyData.value.key
    }
  })
}
</script>
```

## Key Actions

Available actions for API keys:

- `documents:search` - Search documents
- `documents:get` - Get document by ID
- `collections:get` - Get collection info
- `collections:list` - List collections
- `collections:create` - Create collections
- `collections:delete` - Delete collections
- `documents:create` - Create documents
- `documents:update` - Update documents
- `documents:delete` - Delete documents
- `*` - All actions (admin)

## Complete Key Management Example

```vue
<template>
  <div class="key-management">
    <h1>API Key Management</h1>
    
    <!-- Create Key Form -->
    <form @submit.prevent="createKey">
      <h2>Create New Key</h2>
      <input v-model="newKey.description" placeholder="Description" required />
      
      <label>
        <input type="checkbox" value="documents:search" v-model="newKey.actions" />
        Search Documents
      </label>
      <label>
        <input type="checkbox" value="documents:get" v-model="newKey.actions" />
        Get Documents
      </label>
      
      <input v-model="newKey.collections" placeholder="Collections (comma-separated)" />
      
      <label>
        Expires in (hours):
        <input v-model.number="expiresInHours" type="number" min="1" />
      </label>
      
      <button type="submit">Create Key</button>
    </form>
    
    <!-- Keys List -->
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <h2>Existing Keys</h2>
      <div v-for="key in keys?.keys" :key="key.id" class="key-card">
        <h3>{{ key.description }}</h3>
        <p><strong>ID:</strong> {{ key.id }}</p>
        <p><strong>Actions:</strong> {{ key.actions.join(', ') }}</p>
        <p><strong>Collections:</strong> {{ key.collections.join(', ') }}</p>
        <p v-if="key.expires_at">
          <strong>Expires:</strong> {{ new Date(key.expires_at * 1000).toLocaleString() }}
        </p>
        <button @click="copyKeyValue(key.value_prefix)" class="btn-copy">
          Copy Key Prefix
        </button>
        <button @click="deleteApiKey(key.id)" class="btn-delete">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { keysApi } = useTypesenseApi()

const newKey = ref({
  description: '',
  actions: [] as string[],
  collections: '*'
})

const expiresInHours = ref<number>()

const { data: keys, pending, error, refresh } = await useAsyncData(
  'api-keys',
  () => keysApi.retrieveKeys()
)

async function createKey() {
  const expiresAt = expiresInHours.value
    ? Math.floor(Date.now() / 1000) + (expiresInHours.value * 3600)
    : undefined
  
  const collections = newKey.value.collections
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)
  
  await keysApi.createKey({
    apiKeySchema: {
      description: newKey.value.description,
      actions: newKey.value.actions,
      collections: collections.length ? collections : ['*'],
      expires_at: expiresAt
    }
  })
  
  // Reset form
  newKey.value = {
    description: '',
    actions: [],
    collections: '*'
  }
  expiresInHours.value = undefined
  
  await refresh()
}

async function deleteApiKey(id: number) {
  if (confirm('Delete this API key?')) {
    await keysApi.deleteKey({ keyId: id })
    await refresh()
  }
}

function copyKeyValue(prefix: string) {
  navigator.clipboard.writeText(prefix)
  alert('Key prefix copied!')
}
</script>

<style scoped>
.key-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.key-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
}

.btn-delete {
  background: #ff4444;
  color: white;
  margin-left: 10px;
}
</style>
```

## Security Best Practices

### 1. Never Expose Admin Keys

```typescript
// ❌ Bad - Admin key in frontend
export default defineNuxtConfig({
  typesense: {
    apiKey: 'admin-key-xyz'  // NEVER DO THIS!
  }
})

// ✅ Good - Search-only key in frontend
export default defineNuxtConfig({
  typesense: {
    apiKey: process.env.TYPESENSE_SEARCH_KEY
  }
})
```

### 2. Use Scoped Keys for Multi-Tenant Apps

```typescript
// Generate user-specific keys
const scopedKey = await keysApi.generateScopedSearchKey(
  searchKey,
  {
    filter_by: `tenant_id:=${tenantId}`,
    expires_at: Math.floor(Date.now() / 1000) + 3600
  }
)
```

### 3. Rotate Keys Regularly

```typescript
// Create new key
const newKey = await keysApi.createKey({ ... })

// Update application configuration
// Delete old key after verification
await keysApi.deleteKey({ keyId: oldKeyId })
```

### 4. Set Expiration for Temporary Access

```typescript
// Create temporary key for guest access
const guestKey = await keysApi.createKey({
  apiKeySchema: {
    description: 'Guest access',
    actions: ['documents:search'],
    collections: ['public'],
    expires_at: Math.floor(Date.now() / 1000) + 86400  // 24 hours
  }
})
```

### 5. Limit Permissions

```typescript
// Only grant necessary permissions
actions: ['documents:search', 'documents:get'],  // Read-only
collections: ['products', 'articles']  // Specific collections only
```

## Next Steps

- Back to [Configuration](/guide/configuration)
- Learn about [Collections](/guide/collections)
- Check [API Reference](/api/composables)

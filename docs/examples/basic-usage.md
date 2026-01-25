# Basic Usage

Learn the basics of using Nuxt Typesense in your application.

## Quick Start

Here's a minimal example to get you started:

```vue
<template>
  <div>
    <h1>Typesense Basic Usage</h1>
    
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <p>Health Status: {{ health?.ok ? '✅ Healthy' : '❌ Down' }}</p>
      <p>Collections: {{ collections?.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { healthApi, collectionsApi } = useTypesenseApi()

// Check health
const { data: health } = await useAsyncData(
  'health',
  () => healthApi.health()
)

// Get collections
const { data: collections, pending, error } = await useAsyncData(
  'collections',
  () => collectionsApi.getCollections()
)
</script>
```

## Checking Server Health

Always verify your connection first:

```vue
<template>
  <div>
    <h2>Server Status</h2>
    <button @click="checkHealth">Check Health</button>
    
    <div v-if="health">
      <p>Status: {{ health.ok ? '✅ OK' : '❌ Error' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { healthApi } = useTypesenseApi()
const health = ref(null)

async function checkHealth() {
  try {
    health.value = await healthApi.health()
  } catch (error) {
    console.error('Health check failed:', error)
    health.value = { ok: false }
  }
}
</script>
```

## Accessing Configuration

Get your Typesense configuration:

```vue
<script setup lang="ts">
// Get server URL
const serverUrl = useTypesenseUrl()
console.log('Server:', serverUrl)

// Get API key (be careful not to log this in production!)
const apiKey = useTypesenseApiKey()
console.log('Key prefix:', apiKey.substring(0, 5) + '...')
</script>
```

## Simple Search

Perform a basic search:

```vue
<template>
  <div>
    <input v-model="query" placeholder="Search..." />
    <button @click="search">Search</button>
    
    <div v-if="searching">Searching...</div>
    <div v-else-if="results">
      <p>Found {{ results.found }} results</p>
      <div v-for="hit in results.hits" :key="hit.document.id">
        <h3>{{ hit.document.name }}</h3>
        <p>{{ hit.document.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

const query = ref('')
const results = ref(null)
const searching = ref(false)

async function search() {
  if (!query.value) return
  
  searching.value = true
  try {
    const response = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: query.value,
        queryBy: 'name,description'
      }]
    })
    results.value = response.results[0]
  } finally {
    searching.value = false
  }
}
</script>
```

## Using useAsyncData

The recommended pattern with Nuxt's `useAsyncData`:

```vue
<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

const searchQuery = ref('laptop')

const { data: searchResults, pending, error, refresh } = await useAsyncData(
  'search-products',
  async () => {
    const response = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: searchQuery.value,
        queryBy: 'name,description'
      }]
    })
    return response.results[0]
  },
  {
    // Re-run when searchQuery changes
    watch: [searchQuery]
  }
)

// Access the results
const products = computed(() => searchResults.value?.hits || [])
</script>

<template>
  <div>
    <input v-model="searchQuery" />
    
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="hit in products" :key="hit.document.id">
        {{ hit.document.name }}
      </div>
    </div>
  </div>
</template>
```

## Error Handling

Handle errors gracefully:

```vue
<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

async function searchWithErrorHandling() {
  try {
    const results = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: 'laptop',
        queryBy: 'name'
      }]
    })
    return results
  } catch (error) {
    // Check if it's a Typesense error
    if (error instanceof Response) {
      const errorData = await error.json()
      console.error('Typesense error:', errorData.message)
      
      // Handle specific errors
      if (error.status === 404) {
        console.error('Collection not found')
      } else if (error.status === 401) {
        console.error('Invalid API key')
      }
    } else {
      // Network or other error
      console.error('Network error:', error)
    }
    
    // Re-throw or return fallback
    return null
  }
}
</script>
```

## Working with Multiple Collections

Search across multiple collections:

```vue
<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

const { data } = await useAsyncData(
  'multi-collection-search',
  async () => {
    const response = await documentsApi.multiSearch({
      searches: [
        {
          collection: 'products',
          q: 'laptop',
          queryBy: 'name,description'
        },
        {
          collection: 'articles',
          q: 'laptop',
          queryBy: 'title,content'
        },
        {
          collection: 'reviews',
          q: 'laptop',
          queryBy: 'text'
        }
      ]
    })
    return response.results
  }
)

const productResults = computed(() => data.value?.[0])
const articleResults = computed(() => data.value?.[1])
const reviewResults = computed(() => data.value?.[2])
</script>
```

## Reactive Search

Implement live search with debouncing:

```vue
<template>
  <div>
    <input 
      v-model="searchQuery" 
      placeholder="Type to search..."
    />
    
    <div v-if="pending">Searching...</div>
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

// Debounce search input
let searchTimeout: NodeJS.Timeout
const debouncedQuery = ref('')

watch(searchQuery, (newValue) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    debouncedQuery.value = newValue
  }, 300) // Wait 300ms after typing stops
})

// Perform search
const { data: results, pending } = await useAsyncData(
  'live-search',
  async () => {
    if (!debouncedQuery.value) return null
    
    const response = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: debouncedQuery.value,
        queryBy: 'name,description',
        perPage: 10
      }]
    })
    return response.results[0]
  },
  {
    watch: [debouncedQuery]
  }
)
</script>
```

## Server-Side Search

Perform searches on the server:

```typescript
// server/api/search.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const { documentsApi } = useTypesenseApi()
  
  const results = await documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: query.q as string || '*',
      queryBy: 'name,description',
      filterBy: query.filter as string || undefined,
      page: Number(query.page) || 1,
      perPage: 20
    }]
  })
  
  return results.results[0]
})
```

Use from your component:

```vue
<script setup lang="ts">
const searchQuery = ref('laptop')

const { data: results } = await useFetch('/api/search', {
  query: {
    q: searchQuery
  }
})
</script>
```

## Complete Component Example

Here's a complete, production-ready component:

```vue
<template>
  <div class="search-container">
    <div class="search-box">
      <input 
        v-model="query"
        type="search"
        placeholder="Search products..."
        class="search-input"
      />
      <button @click="performSearch" class="search-button">
        Search
      </button>
    </div>
    
    <div v-if="pending" class="loading">
      <p>Searching...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>⚠️ Error: {{ error.message }}</p>
      <button @click="refresh">Try Again</button>
    </div>
    
    <div v-else-if="searchResults" class="results">
      <div class="results-header">
        <p>Found {{ searchResults.found }} results in {{ searchResults.searchTimeMs }}ms</p>
      </div>
      
      <div v-if="searchResults.hits?.length" class="results-list">
        <div 
          v-for="hit in searchResults.hits" 
          :key="hit.document.id"
          class="result-item"
        >
          <h3>{{ hit.document.name }}</h3>
          <p>{{ hit.document.description }}</p>
          <p class="price">${{ hit.document.price }}</p>
        </div>
      </div>
      
      <div v-else class="no-results">
        <p>No results found for "{{ query }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

const query = ref('')

const { 
  data: searchResults, 
  pending, 
  error, 
  refresh,
  execute 
} = await useAsyncData(
  'product-search',
  async () => {
    if (!query.value) return null
    
    const response = await documentsApi.multiSearch({
      searches: [{
        collection: 'products',
        q: query.value,
        queryBy: 'name,description',
        perPage: 20
      }]
    })
    
    return response.results[0]
  },
  {
    immediate: false // Don't run on mount
  }
)

function performSearch() {
  if (query.value) {
    execute()
  }
}

// Search on Enter key
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    performSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.search-button {
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background: #2563eb;
}

.loading, .error, .no-results {
  text-align: center;
  padding: 40px;
}

.result-item {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
}

.price {
  color: #16a34a;
  font-weight: bold;
  font-size: 18px;
}
</style>
```

## Next Steps

- Learn about [Collection Management](/examples/collection-management)
- Explore [Document Operations](/examples/document-operations)
- Check [Search Queries](/examples/search-queries)

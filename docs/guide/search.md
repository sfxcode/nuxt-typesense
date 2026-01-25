# Search

Learn how to perform powerful searches with Typesense.

## Basic Search

### Simple Text Search

```typescript
const { documentsApi } = useTypesenseApi()

const results = await documentsApi.multiSearch({
  searches: [{
    collection: 'products',
    q: 'laptop',
    queryBy: 'name,description'
  }]
})

const hits = results.results[0].hits
```

### Search Multiple Collections

```typescript
const results = await documentsApi.multiSearch({
  searches: [
    {
      collection: 'products',
      q: 'laptop',
      queryBy: 'name,description'
    },
    {
      collection: 'articles',
      q: 'laptop review',
      queryBy: 'title,content'
    }
  ]
})

const productHits = results.results[0].hits
const articleHits = results.results[1].hits
```

## Search Parameters

### Query By Fields

Specify which fields to search in:

```typescript
{
  collection: 'products',
  q: 'laptop',
  queryBy: 'name,description,tags',  // Search in multiple fields
  queryByWeights: '3,2,1'            // Weight fields differently
}
```

### Filtering

Filter results using boolean expressions:

```typescript
{
  collection: 'products',
  q: 'laptop',
  queryBy: 'name,description',
  filterBy: 'price:<1000 && in_stock:true && category:=Electronics'
}
```

#### Filter Operators

- **`:`** - Exact match
- **`:=`** - Equals (for strings)
- **`:`** - Contains (for arrays)
- **`:<`** - Less than
- **`:>`** - Greater than
- **`:<=`** - Less than or equal
- **`:>=`** - Greater than or equal
- **`:[min..max]`** - Range
- **`:`** - Geo radius `(lat, lng, distance, unit)`

Examples:

```typescript
// Price range
filterBy: 'price:[10..100]'

// Multiple categories
filterBy: 'category:=[Electronics, Computers]'

// Date range
filterBy: 'created_at:[1640000000..1650000000]'

// Boolean
filterBy: 'in_stock:true'

// Geo search
filterBy: 'location:(48.8566, 2.3522, 10 km)'

// Complex query
filterBy: '(category:=Electronics || category:=Computers) && price:<500 && in_stock:true'
```

### Faceting

Get aggregated counts for fields:

```typescript
{
  collection: 'products',
  q: 'laptop',
  queryBy: 'name',
  facetBy: 'category,brand,color',
  maxFacetValues: 10
}
```

Response includes facet counts:

```json
{
  "facet_counts": [
    {
      "field_name": "category",
      "counts": [
        { "value": "Electronics", "count": 42 },
        { "value": "Computers", "count": 38 }
      ]
    }
  ]
}
```

### Sorting

Sort results by one or more fields:

```typescript
{
  collection: 'products',
  q: 'laptop',
  queryBy: 'name',
  sortBy: 'price:desc,created_at:desc'  // Sort by price, then date
}
```

### Pagination

```typescript
{
  collection: 'products',
  q: 'laptop',
  queryBy: 'name',
  page: 1,
  perPage: 20
}
```

### Highlighting

Highlight matched terms in results:

```typescript
{
  collection: 'products',
  q: 'laptop',
  queryBy: 'name,description',
  highlight_full_fields: 'name,description',
  highlight_start_tag: '<mark>',
  highlight_end_tag: '</mark>'
}
```

## Advanced Search Features

### Typo Tolerance

Typesense automatically handles typos:

```typescript
{
  collection: 'products',
  q: 'lapto',  // Typo: missing 'p'
  queryBy: 'name',
  numTypos: 2  // Allow up to 2 typos (default: 2)
}
```

### Prefix Searching

Enable prefix searching for autocomplete:

```typescript
{
  collection: 'products',
  q: 'lap',
  queryBy: 'name',
  prefix: true  // Matches "laptop", "lapel", etc.
}
```

### Phrase Searching

Search for exact phrases:

```typescript
{
  collection: 'products',
  q: '"gaming laptop"',  // Exact phrase
  queryBy: 'name,description'
}
```

### Grouping

Group results by a field:

```typescript
{
  collection: 'products',
  q: 'laptop',
  queryBy: 'name',
  groupBy: 'brand',
  group_limit: 3  // Show 3 products per brand
}
```

### Geo Search

Search by geographic proximity:

```typescript
{
  collection: 'stores',
  q: '*',
  queryBy: 'name',
  filterBy: 'location:(48.8566, 2.3522, 10 km)',
  sortBy: 'location(48.8566, 2.3522):asc'  // Sort by distance
}
```

## Complete Search Example

```vue
<template>
  <div class="search-page">
    <!-- Search Input -->
    <input 
      v-model="searchQuery" 
      @input="performSearch"
      placeholder="Search products..."
    />
    
    <!-- Filters -->
    <div class="filters">
      <div v-if="facets">
        <h3>Categories</h3>
        <label v-for="facet in facets.category" :key="facet.value">
          <input 
            type="checkbox" 
            :value="facet.value"
            @change="toggleFilter('category', facet.value)"
          />
          {{ facet.value }} ({{ facet.count }})
        </label>
      </div>
      
      <div>
        <h3>Price Range</h3>
        <input v-model.number="priceMin" type="number" placeholder="Min" />
        <input v-model.number="priceMax" type="number" placeholder="Max" />
        <button @click="performSearch">Apply</button>
      </div>
      
      <div>
        <h3>Sort By</h3>
        <select v-model="sortBy" @change="performSearch">
          <option value="">Relevance</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="created_at:desc">Newest First</option>
        </select>
      </div>
    </div>
    
    <!-- Results -->
    <div v-if="pending">Searching...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="results">
      <p>Found {{ results.found }} results in {{ results.searchTimeMs }}ms</p>
      
      <div v-for="hit in results.hits" :key="hit.document.id" class="result">
        <h3 v-html="hit.highlights?.[0]?.snippet || hit.document.name"></h3>
        <p v-html="hit.highlights?.[1]?.snippet || hit.document.description"></p>
        <p class="price">${{ hit.document.price }}</p>
        <p class="category">{{ hit.document.category }}</p>
      </div>
      
      <!-- Pagination -->
      <div class="pagination">
        <button 
          @click="page--" 
          :disabled="page === 1"
        >
          Previous
        </button>
        <span>Page {{ page }}</span>
        <button 
          @click="page++" 
          :disabled="page * perPage >= results.found"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

const searchQuery = ref('')
const selectedFilters = ref<Record<string, string[]>>({})
const priceMin = ref<number>()
const priceMax = ref<number>()
const sortBy = ref('')
const page = ref(1)
const perPage = ref(20)

const { data: searchData, pending, error, refresh } = await useAsyncData(
  'search',
  () => performSearchQuery(),
  { watch: [page] }
)

const results = computed(() => searchData.value?.results[0])
const facets = computed(() => {
  const facetCounts = results.value?.facet_counts || []
  return Object.fromEntries(
    facetCounts.map(f => [f.field_name, f.counts])
  )
})

async function performSearchQuery() {
  // Build filter string
  const filters: string[] = []
  
  // Category filters
  if (selectedFilters.value.category?.length) {
    filters.push(`category:=[${selectedFilters.value.category.join(',')}]`)
  }
  
  // Price filter
  if (priceMin.value !== undefined || priceMax.value !== undefined) {
    const min = priceMin.value ?? 0
    const max = priceMax.value ?? 999999
    filters.push(`price:[${min}..${max}]`)
  }
  
  const filterBy = filters.join(' && ')
  
  return documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: searchQuery.value || '*',
      queryBy: 'name,description,tags',
      queryByWeights: '3,2,1',
      filterBy: filterBy || undefined,
      facetBy: 'category,brand',
      maxFacetValues: 10,
      sortBy: sortBy.value || undefined,
      page: page.value,
      perPage: perPage.value,
      highlight_full_fields: 'name,description',
      highlight_start_tag: '<mark>',
      highlight_end_tag: '</mark>'
    }]
  })
}

function performSearch() {
  page.value = 1
  refresh()
}

function toggleFilter(field: string, value: string) {
  if (!selectedFilters.value[field]) {
    selectedFilters.value[field] = []
  }
  
  const index = selectedFilters.value[field].indexOf(value)
  if (index > -1) {
    selectedFilters.value[field].splice(index, 1)
  } else {
    selectedFilters.value[field].push(value)
  }
  
  performSearch()
}

// Debounced search
let searchTimeout: NodeJS.Timeout
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    performSearch()
  }, 300)
})
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.result {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}

:deep(mark) {
  background-color: yellow;
  font-weight: bold;
}
</style>
```

## Best Practices

### 1. Use Debouncing for Live Search

```typescript
import { useDebounceFn } from '@vueuse/core'

const debouncedSearch = useDebounceFn(() => {
  performSearch()
}, 300)

watch(searchQuery, debouncedSearch)
```

### 2. Cache Search Results

```typescript
const { data: results } = await useAsyncData(
  `search-${searchQuery.value}-${page.value}`,
  () => performSearch(),
  { 
    getCachedData: key => useNuxtData(key).data.value
  }
)
```

### 3. Optimize Query Fields

```typescript
// ❌ Searching too many fields is slow
queryBy: 'name,description,content,tags,author,category'

// ✅ Search relevant fields with proper weights
queryBy: 'name,description,tags',
queryByWeights: '3,2,1'
```

### 4. Use Pagination

```typescript
// Always paginate large result sets
perPage: 20,
page: currentPage.value
```

### 5. Handle Empty Queries

```typescript
// Use '*' for "show all" queries
q: searchQuery.value || '*',
queryBy: 'name'
```

## Next Steps

- Learn about [API Keys](/guide/api-keys)
- Check [Complete Examples](/examples/search-queries)
- Explore [API Reference](/api/clients)

# Documents

Learn how to manage documents in Typesense collections.

## What is a Document?

A document in Typesense is similar to a row in a relational database. Each document is a JSON object that conforms to the collection's schema.

## Adding Documents

### Add a Single Document

```typescript
const { documentsApi } = useTypesenseApi()

const document = await documentsApi.indexDocument({
  collectionName: 'products',
  body: {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    category: 'Electronics',
    in_stock: true,
    created_at: Date.now()
  }
})
```

### Import Multiple Documents

For better performance, use batch import:

```typescript
const { documentsApi } = useTypesenseApi()

const documents = [
  {
    id: '1',
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Mouse',
    price: 29.99,
    category: 'Accessories'
  },
  {
    id: '3',
    name: 'Keyboard',
    price: 79.99,
    category: 'Accessories'
  }
]

// Convert to JSONL format (one JSON object per line)
const jsonl = documents.map(doc => JSON.stringify(doc)).join('\n')

const result = await documentsApi.importDocuments({
  collectionName: 'products',
  body: jsonl,
  action: 'create'
})
```

### Import Actions

- **`create`**: Add new documents (fails if document exists)
- **`upsert`**: Add or update documents
- **`update`**: Update existing documents only
- **`emplace`**: Similar to upsert but more efficient

## Retrieving Documents

### Get by ID

```typescript
const { documentsApi } = useTypesenseApi()

const document = await documentsApi.getDocument({
  collectionName: 'products',
  documentId: '1'
})

console.log(document.name, document.price)
```

### Search Documents

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
hits?.forEach(hit => {
  console.log(hit.document.name)
})
```

### Export All Documents

```typescript
const { documentsApi } = useTypesenseApi()

const allDocs = await documentsApi.exportDocuments({
  collectionName: 'products'
})

// Parse JSONL response
const documents = allDocs.split('\n')
  .filter(line => line.trim())
  .map(line => JSON.parse(line))
```

## Updating Documents

### Update a Single Document

```typescript
const { documentsApi } = useTypesenseApi()

await documentsApi.updateDocument({
  collectionName: 'products',
  documentId: '1',
  body: {
    price: 899.99,  // Updated price
    in_stock: false
  }
})
```

### Upsert (Create or Update)

```typescript
const { documentsApi } = useTypesenseApi()

await documentsApi.upsertDocument({
  collectionName: 'products',
  documentId: '1',
  body: {
    id: '1',
    name: 'Laptop',
    price: 899.99,
    category: 'Electronics',
    in_stock: true
  }
})
```

## Deleting Documents

### Delete by ID

```typescript
const { documentsApi } = useTypesenseApi()

await documentsApi.deleteDocument({
  collectionName: 'products',
  documentId: '1'
})
```

### Delete by Query

Delete all documents matching a filter:

```typescript
const { documentsApi } = useTypesenseApi()

await documentsApi.deleteDocuments({
  collectionName: 'products',
  filterBy: 'category:=Accessories'
})
```

## Complete CRUD Example

```vue
<template>
  <div>
    <h1>Product Management</h1>
    
    <!-- Create Form -->
    <form @submit.prevent="createProduct">
      <input v-model="newProduct.name" placeholder="Name" required />
      <input v-model.number="newProduct.price" type="number" placeholder="Price" required />
      <input v-model="newProduct.category" placeholder="Category" required />
      <button type="submit">Add Product</button>
    </form>
    
    <!-- Product List -->
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="hit in products?.results[0].hits" :key="hit.document.id">
        <h3>{{ hit.document.name }}</h3>
        <p>Price: ${{ hit.document.price }}</p>
        <p>Category: {{ hit.document.category }}</p>
        <button @click="editProduct(hit.document)">Edit</button>
        <button @click="deleteProduct(hit.document.id)">Delete</button>
      </div>
    </div>
    
    <!-- Edit Modal -->
    <div v-if="editing" class="modal">
      <h2>Edit Product</h2>
      <input v-model="editing.name" />
      <input v-model.number="editing.price" type="number" />
      <button @click="updateProduct">Save</button>
      <button @click="editing = null">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

const newProduct = ref({
  name: '',
  price: 0,
  category: ''
})

const editing = ref(null)

// Load products
const { data: products, pending, error, refresh } = await useAsyncData(
  'products',
  () => documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: '*',
      queryBy: 'name'
    }]
  })
)

// Create
async function createProduct() {
  await documentsApi.indexDocument({
    collectionName: 'products',
    body: {
      id: String(Date.now()),
      ...newProduct.value,
      created_at: Date.now()
    }
  })
  
  newProduct.value = { name: '', price: 0, category: '' }
  await refresh()
}

// Update
function editProduct(product: any) {
  editing.value = { ...product }
}

async function updateProduct() {
  await documentsApi.updateDocument({
    collectionName: 'products',
    documentId: editing.value.id,
    body: editing.value
  })
  
  editing.value = null
  await refresh()
}

// Delete
async function deleteProduct(id: string) {
  if (confirm('Delete this product?')) {
    await documentsApi.deleteDocument({
      collectionName: 'products',
      documentId: id
    })
    await refresh()
  }
}
</script>
```

## Batch Operations

### Efficient Bulk Import

```typescript
const { documentsApi } = useTypesenseApi()

// Prepare large dataset
const products = [] // ... thousands of products

// Split into batches
const batchSize = 100
for (let i = 0; i < products.length; i += batchSize) {
  const batch = products.slice(i, i + batchSize)
  const jsonl = batch.map(doc => JSON.stringify(doc)).join('\n')
  
  await documentsApi.importDocuments({
    collectionName: 'products',
    body: jsonl,
    action: 'upsert',
    batchSize: batchSize
  })
  
  console.log(`Imported ${i + batch.length} of ${products.length}`)
}
```

## Best Practices

### 1. Use Batch Import for Multiple Documents

```typescript
// ❌ Slow - One request per document
for (const doc of documents) {
  await documentsApi.indexDocument({ collectionName: 'products', body: doc })
}

// ✅ Fast - One request for all documents
const jsonl = documents.map(doc => JSON.stringify(doc)).join('\n')
await documentsApi.importDocuments({ 
  collectionName: 'products', 
  body: jsonl, 
  action: 'upsert' 
})
```

### 2. Generate Unique IDs

```typescript
// Option 1: Use timestamp + random
const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Option 2: Use UUID library
import { v4 as uuidv4 } from 'uuid'
const id = uuidv4()

// Option 3: Use existing unique field
const id = user.email // if email is unique
```

### 3. Handle Import Errors

```typescript
const result = await documentsApi.importDocuments({
  collectionName: 'products',
  body: jsonl,
  action: 'upsert'
})

// Parse result (JSONL format)
const results = result.split('\n')
  .filter(line => line.trim())
  .map(line => JSON.parse(line))

const failed = results.filter(r => !r.success)
if (failed.length > 0) {
  console.error('Failed to import:', failed)
}
```

### 4. Use Upsert for Idempotency

```typescript
// Upsert is safe to run multiple times
await documentsApi.importDocuments({
  collectionName: 'products',
  body: jsonl,
  action: 'upsert'  // Creates if not exists, updates if exists
})
```

### 5. Validate Before Import

```typescript
function validateProduct(product: any): boolean {
  return (
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    product.price > 0
  )
}

const valid = products.filter(validateProduct)
const jsonl = valid.map(doc => JSON.stringify(doc)).join('\n')
```

## Next Steps

- Learn about [Search](/guide/search)
- Explore [API Keys](/guide/api-keys)
- Check [Examples](/examples/document-operations)

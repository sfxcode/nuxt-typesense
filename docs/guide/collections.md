# Collections

Learn how to manage Typesense collections in your Nuxt application.

## What is a Collection?

A collection in Typesense is similar to a table in a relational database. It contains documents (records) with a defined schema that specifies the fields and their types.

## Creating a Collection

### Using the Collections API

```typescript
const { collectionsApi } = useTypesenseApi()

// Define the collection schema
const schema = {
  name: 'products',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'price', type: 'float' },
    { name: 'category', type: 'string', facet: true },
    { name: 'inStock', type: 'bool' },
    { name: 'createdAt', type: 'int64' }
  ],
  defaultSortingField: 'created_at'
}

// Create the collection
const collection = await collectionsApi.createCollection({
  collectionSchema: schema
})
```

### Field Types

Typesense supports various field types:

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text field | `"Hello World"` |
| `string[]` | Array of strings | `["tag1", "tag2"]` |
| `int32` | 32-bit integer | `42` |
| `int64` | 64-bit integer | `9223372036854775807` |
| `float` | Floating point | `3.14` |
| `bool` | Boolean | `true` |
| `geopoint` | Geographic coordinates | `[48.8566, 2.3522]` |
| `geopoint[]` | Array of geopoints | `[[48.8566, 2.3522]]` |
| `object` | Nested object | `{"key": "value"}` |
| `object[]` | Array of objects | `[{"key": "value"}]` |
| `auto` | Auto-detected type | - |

### Field Options

- **`facet`**: Enable faceting for filtering (`true`/`false`)
- **`optional`**: Allow null values (`true`/`false`)
- **`index`**: Enable indexing for search (`true`/`false`)
- **`sort`**: Enable sorting (`true`/`false`)

### Example with All Options

```typescript
const advancedSchema = {
  name: 'products',
  fields: [
    {
      name: 'id',
      type: 'string',
      optional: false
    },
    {
      name: 'name',
      type: 'string',
      optional: false,
      index: true
    },
    {
      name: 'description',
      type: 'string',
      optional: true,
      index: true
    },
    {
      name: 'price',
      type: 'float',
      optional: false,
      sort: true
    },
    {
      name: 'categories',
      type: 'string[]',
      facet: true,
      optional: true
    },
    {
      name: 'tags',
      type: 'string[]',
      facet: true,
      optional: true
    },
    {
      name: 'rating',
      type: 'float',
      optional: true,
      sort: true
    },
    {
      name: 'location',
      type: 'geopoint',
      optional: true
    },
    {
      name: 'in_stock',
      type: 'bool',
      facet: true
    },
    {
      name: 'created_at',
      type: 'int64',
      sort: true
    }
  ],
  defaultSortingField: 'created_at'
}
```

## Listing Collections

### Get All Collections

```vue
<script setup lang="ts">
const { collectionsApi } = useTypesenseApi()

const { data: collections } = await useAsyncData(
  'all-collections',
  () => collectionsApi.getCollections()
)
</script>

<template>
  <ul>
    <li v-for="collection in collections" :key="collection.name">
      {{ collection.name }} - {{ collection.numDocuments }} documents
    </li>
  </ul>
</template>
```

### Get Collection Info Helper

Use the helper composable for formatted collection information:

```vue
<script setup lang="ts">
const { collectionInfos } = useTypesenseCollections()

const { data: collections } = await useAsyncData(
  'collection-infos',
  () => collectionInfos()
)
</script>

<template>
  <div v-for="col in collections" :key="col.name">
    <h3>{{ col.name }}</h3>
    <p>Documents: {{ col.numDocuments }}</p>
    <p>Fields: {{ col.fields.join(', ') }}</p>
    <p>Sorting: {{ col.defaultSortingField }}</p>
    <p>Created: {{ col.date }}</p>
  </div>
</template>
```

## Retrieving a Collection

```typescript
const { collectionsApi } = useTypesenseApi()

const collection = await collectionsApi.getCollection({
  collectionName: 'products'
})

console.log(collection.name)
console.log(collection.numDocuments)
console.log(collection.fields)
```

## Updating a Collection

You can update a collection schema (limited operations):

```typescript
const { collectionsApi } = useTypesenseApi()

await collectionsApi.updateCollection({
  collectionName: 'products',
  collectionUpdateSchema: {
    fields: [
      {
        name: 'new_field',
        type: 'string',
        optional: true
      }
    ]
  }
})
```

::: warning Limited Updates
You can only add new optional fields to existing collections. You cannot modify or remove existing fields.
:::

## Deleting a Collection

```typescript
const { collectionsApi } = useTypesenseApi()

await collectionsApi.deleteCollection({
  collectionName: 'products'
})
```

::: danger Permanent Deletion
Deleting a collection permanently removes all its documents. This action cannot be undone.
:::

## Collection Aliases

Aliases allow you to reference collections by alternate names, useful for zero-downtime reindexing.

### Create an Alias

```typescript
const { collectionsApi } = useTypesenseApi()

await collectionsApi.upsertCollectionAlias({
  aliasName: 'products',
  collectionAliasSchema: {
    collectionName: 'products_v1'
  }
})
```

### Update an Alias

```typescript
// Point alias to a new collection
await collectionsApi.upsertCollectionAlias({
  aliasName: 'products',
  collectionAliasSchema: {
    collectionName: 'products_v2'
  }
})
```

### Delete an Alias

```typescript
await collectionsApi.deleteCollectionAlias({
  aliasName: 'products'
})
```

## Complete Example

Here's a complete example of collection management:

```vue
<template>
  <div>
    <h1>Collection Management</h1>
    
    <button @click="createCollection">Create Collection</button>
    <button @click="loadCollections">Refresh</button>
    
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="col in collections" :key="col.name">
        <h3>{{ col.name }}</h3>
        <p>Documents: {{ col.numDocuments }}</p>
        <button @click="deleteCollection(col.name)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { collectionsApi } = useTypesenseApi()

const { 
  data: collections, 
  pending, 
  error,
  refresh 
} = await useAsyncData(
  'collections',
  () => collectionsApi.getCollections()
)

async function createCollection() {
  await collectionsApi.createCollection({
    collectionSchema: {
      name: 'test_' + Date.now(),
      fields: [
        { name: 'id', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'createdAt', type: 'int64' }
      ],
      defaultSortingField: 'created_at'
    }
  })
  await refresh()
}

async function deleteCollection(name: string) {
  if (confirm(`Delete collection ${name}?`)) {
    await collectionsApi.deleteCollection({ collectionName: name })
    await refresh()
  }
}

function loadCollections() {
  refresh()
}
</script>
```

## Best Practices

### 1. Plan Your Schema

Design your schema before creating the collection:
- Choose appropriate field types
- Enable faceting for filter fields
- Set sorting fields appropriately
- Use optional fields for nullable data

### 2. Use Aliases for Versioning

```typescript
// Create versioned collections
await collectionsApi.createCollection({ 
  collectionSchema: { name: 'products_v2', ... } 
})

// Update alias to point to new version
await collectionsApi.upsertCollectionAlias({
  aliasName: 'products',
  collectionAliasSchema: { collectionName: 'products_v2' }
})

// Delete old version after verification
await collectionsApi.deleteCollection({ 
  collectionName: 'products_v1' 
})
```

### 3. Handle Errors Gracefully

```typescript
try {
  await collectionsApi.createCollection({ collectionSchema: schema })
} catch (error) {
  if (error.message?.includes('already exists')) {
    console.log('Collection already exists')
  } else {
    console.error('Failed to create collection:', error)
  }
}
```

### 4. Use Default Sorting

Always specify a `default_sorting_field` for consistent results:

```typescript
{
  name: 'products',
  fields: [...],
  defaultSortingField: 'created_at'  // or 'popularity', 'rating', etc.
}
```

## Next Steps

- Learn about [Documents](/guide/documents)
- Explore [Search](/guide/search)
- Check [API Reference](/api/clients)

# Collection Management

Examples of managing Typesense collections.

## Creating Collections

```vue
<script setup lang="ts">
const { collectionsApi } = useTypesenseApi()

async function createProductsCollection() {
  await collectionsApi.createCollection({
    collectionSchema: {
      name: 'products',
      fields: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'price', type: 'float', sort: true },
        { name: 'category', type: 'string', facet: true },
        { name: 'tags', type: 'string[]', facet: true },
        { name: 'inStock', type: 'bool', facet: true },
        { name: 'rating', type: 'float', optional: true, sort: true },
        { name: 'createdAt', type: 'int64', sort: true }
      ],
      defaultSortingField: 'created_at'
    }
  })
}
</script>
```

For more examples, see:
- [Collections Guide](/guide/collections)
- [API Reference](/api/clients#collectionsapi)

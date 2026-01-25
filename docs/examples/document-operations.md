# Document Operations

Examples of document CRUD operations.

## Importing Documents

```vue
<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

async function importProducts(products: any[]) {
  const jsonl = products.map(p => JSON.stringify(p)).join('\n')
  
  await documentsApi.importDocuments({
    collectionName: 'products',
    body: jsonl,
    action: 'upsert',
    batchSize: 100
  })
}
</script>
```

For more examples, see:
- [Documents Guide](/guide/documents)
- [API Reference](/api/clients#documentsapi)

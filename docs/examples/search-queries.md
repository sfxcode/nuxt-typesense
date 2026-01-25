# Search Queries

Advanced search query examples.

## Faceted Search

```vue
<script setup lang="ts">
const { documentsApi } = useTypesenseApi()

const { data } = await useAsyncData('faceted-search', async () => {
  const response = await documentsApi.multiSearch({
    searches: [{
      collection: 'products',
      q: 'laptop',
      query_by: 'name,description',
      facet_by: 'category,brand,price',
      max_facet_values: 10
    }]
  })
  return response.results[0]
})
</script>
```

For more examples, see:
- [Search Guide](/guide/search)
- [API Reference](/api/clients#documentsapi)

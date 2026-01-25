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
      queryBy: 'name,description',
      facetBy: 'category,brand,price',
      maxFacetValues: 10
    }]
  })
  return response.results[0]
})
</script>
```

For more examples, see:
- [Search Guide](/guide/search)
- [API Reference](/api/clients#documentsapi)

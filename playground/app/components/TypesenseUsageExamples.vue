<script setup lang="ts">
interface ExampleResult {
  ok: boolean
  title: string
  data?: unknown
  message?: string
}

const examples = [
  {
    id: 'server-search',
    title: 'Search products from a server route',
    description: 'Use the proxied /api/typesense routes in Nuxt server code or from client-side fetch calls.',
    code: `const results = await $fetch('/api/typesense/documents/products/search', {
  method: 'POST',
  body: {
    q: 'laptop',
    queryBy: 'name,description,tags',
    filterBy: 'inStock:=true && category:=Electronics',
    perPage: 10,
  },
})

return results`,
  },
  {
    id: 'generated-client',
    title: 'Use the generated TypeScript API client',
    description: 'The module exposes typed API clients for server-side usage.',
    code: `export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const { documentsApi, collectionsApi } = useTypesenseServerApi(
    config.typesense.url,
    config.typesense.apiKey,
  )

  const collections = await collectionsApi.getCollections()
  const products = await documentsApi.searchCollection({
    collectionName: 'products',
    searchParameters: {
      q: 'headphones',
      queryBy: 'name,description',
      filterBy: 'inStock:=true',
      perPage: 12,
    },
  })

  return { collections, products }
})`,
  },
  {
    id: 'collection-schema',
    title: 'Create a collection with schema metadata',
    description: 'Configure field-level typing and faceting before importing content.',
    code: `await $fetch('/api/typesense/collections', {
  method: 'POST',
  body: {
    name: 'products',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'category', type: 'string', facet: true },
      { name: 'price', type: 'float', facet: true },
      { name: 'inStock', type: 'bool', facet: true },
      { name: 'tags', type: 'string[]', facet: true },
    ],
    defaultSortingField: 'price',
  },
})`,
  },
  {
    id: 'facet-search',
    title: 'Filter and facet a search query',
    description: 'Use TypeScript-friendly camelCase names for request params.',
    code: `const results = await $fetch('/api/typesense/documents/products/search', {
  method: 'POST',
  body: {
    q: '*',
    queryBy: 'name,description,tags',
    facetBy: 'category,brand,inStock',
    filterBy: 'price:<100 && rating:>=4.5',
    sortBy: 'price:asc',
    perPage: 20,
  },
})

const electronics = results.facet_counts?.find(
  facet => facet.field_name === 'category',
)`,
  },
  {
    id: 'client-composables',
    title: 'Client-side composables',
    description: 'Use browser composables in client mode with a search-only API key.',
    code: `const { searchCollection, collectionInfos } = useTypesenseDocuments()
const { documentsApi } = useTypesenseApi()

const products = await searchCollection('products', {
  q: 'wireless',
  queryBy: 'name,description',
  filterBy: 'inStock:=true',
  perPage: 8,
})

const collections = await collectionInfos()
const health = await documentsApi.searchCollection({
  collectionName: 'products',
  searchParameters: { q: '*', queryBy: 'name', perPage: 5 },
})`,
  },
] as const

const executionState = ref<Record<string, ExampleResult | null>>({})
const loadingExamples = ref<Record<string, boolean>>({})

async function runExample(example: (typeof examples)[number]) {
  loadingExamples.value[example.id] = true
  executionState.value[example.id] = null

  try {
    let payload: Record<string, unknown> | undefined
    let endpoint = '/api/typesense/documents/products/search'

    switch (example.id) {
      case 'server-search':
      case 'generated-client':
      case 'facet-search':
        payload = {
          q: example.id === 'facet-search' ? '*' : 'laptop',
          queryBy: 'name,description,tags',
          filterBy: example.id === 'facet-search' ? 'price:<100 && rating:>=4.5' : 'inStock:=true && category:=Electronics',
          facetBy: example.id === 'facet-search' ? 'category,brand,inStock' : undefined,
          perPage: example.id === 'facet-search' ? 8 : 6,
        }
        break
      case 'collection-schema':
        endpoint = '/api/typesense/collections'
        payload = {
          name: 'products',
          fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'category', type: 'string', facet: true },
            { name: 'price', type: 'float', facet: true },
            { name: 'inStock', type: 'bool', facet: true },
            { name: 'tags', type: 'string[]', facet: true },
          ],
          defaultSortingField: 'price',
        }
        break
      case 'client-composables':
        endpoint = '/api/typesense/collections'
        payload = undefined
        break
    }

    const response = await $fetch(endpoint, {
      method: payload ? 'POST' : 'GET',
      ...(payload ? { body: payload } : {}),
    })

    executionState.value[example.id] = {
      ok: true,
      title: example.title,
      data: response,
      message: example.id === 'client-composables' || example.id === 'collection-schema'
        ? 'The request completed successfully.'
        : 'Live search result returned successfully.',
    }
  }
  catch (error: unknown) {
    executionState.value[example.id] = {
      ok: false,
      title: example.title,
      message: errorMessage(error, 'Example request failed.'),
    }
  }
  finally {
    loadingExamples.value[example.id] = false
  }
}

function formatResult(value: unknown) {
  return JSON.stringify(value, null, 2)
}
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">
          TypeScript usage examples
        </h2>
      </template>

      <div class="space-y-4">
        <div
          v-for="example in examples"
          :key="example.id"
          class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
        >
          <div class="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 class="text-lg font-semibold">
                {{ example.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ example.description }}
              </p>
            </div>

            <UButton
              size="sm"
              :loading="loadingExamples[example.id]"
              @click="runExample(example)"
            >
              Try it
            </UButton>
          </div>

          <pre class="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-3 text-sm leading-6 text-gray-900 dark:text-gray-100"><code>{{ example.code }}</code></pre>

          <div
            v-if="executionState[example.id]"
            class="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3"
          >
            <div class="mb-2 flex items-center justify-between">
              <p class="text-sm font-medium">
                {{ executionState[example.id]?.title }}
              </p>
              <UBadge :color="executionState[example.id]?.ok ? 'success' : 'error'">
                {{ executionState[example.id]?.ok ? 'Success' : 'Error' }}
              </UBadge>
            </div>

            <p
              v-if="executionState[example.id]?.message"
              class="mb-2 text-sm text-gray-600 dark:text-gray-300"
            >
              {{ executionState[example.id]?.message }}
            </p>

            <pre
              v-if="executionState[example.id]?.data"
              class="overflow-x-auto rounded bg-gray-900 p-3 text-xs text-gray-100"
            ><code>{{ formatResult(executionState[example.id]?.data) }}</code></pre>
            <UAlert
              v-else-if="executionState[example.id]?.ok === false"
              color="error"
              :title="executionState[example.id]?.message || 'Example failed'"
            />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

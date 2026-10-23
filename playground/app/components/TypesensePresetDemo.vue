<script setup lang="ts">
interface SearchHit {
  document: {
    id: string
    name: string
    description: string
    price: number
    brand: string
    rating: number
    inStock: boolean
    category?: string
  }
}

interface SearchResult {
  hits?: SearchHit[]
  found: number
}

const selectedPreset = ref('none')
const searchQuery = ref('laptop')
const loading = ref(false)
const error = ref<string | null>(null)
const result = ref<SearchResult | null>(null)

const presetOptions = [
  { label: 'No preset', value: 'none' },
  { label: 'products_search', value: 'products_search' },
  { label: 'products_listing', value: 'products_listing' },
  { label: 'electronics_only', value: 'electronics_only' },
]

async function runDemo() {
  loading.value = true
  error.value = null
  result.value = null

  try {
    const body: Record<string, unknown> = {
      q: searchQuery.value || '*',
      queryBy: 'name,description,tags',
      facetBy: 'category,brand',
      perPage: 8,
      filterBy: 'inStock:=true',
    }

    if (selectedPreset.value !== 'none') {
      body.preset = selectedPreset.value
    }

    result.value = await $fetch<SearchResult>('/api/typesense/documents/products/search', {
      method: 'POST',
      body,
    })
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to run preset search demo'
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  runDemo()
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">
          Search Presets Demo
        </h2>
        <UBadge v-if="result" color="primary">
          {{ result.found }} results
        </UBadge>
      </div>
    </template>

    <div class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2">
        <UInput v-model="searchQuery" placeholder="Search query" />
        <USelect v-model="selectedPreset" :items="presetOptions" value-key="value" label-key="label" />
      </div>

      <UButton :loading="loading" @click="runDemo">
        Run preset search
      </UButton>

      <div class="rounded-md bg-gray-100 dark:bg-gray-800 p-3 text-sm font-mono">
        body = { q: "{{ searchQuery }}", queryBy: "name,description,tags", filterBy: "inStock:=true", preset: "{{ selectedPreset }}" }
      </div>

      <UAlert v-if="error" color="error" :title="error" />

      <div v-if="result && result.hits?.length" class="space-y-3">
        <div v-for="hit in result.hits" :key="hit.document.id" class="rounded-lg border p-3">
          <div class="flex items-center justify-between gap-2">
            <div>
              <p class="font-semibold">{{ hit.document.name }}</p>
              <p class="text-sm text-gray-500">{{ hit.document.category || 'General' }}</p>
            </div>
            <UBadge :color="hit.document.inStock ? 'success' : 'error'">
              {{ hit.document.inStock ? 'In Stock' : 'Out of Stock' }}
            </UBadge>
          </div>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ hit.document.description }}
          </p>
          <p class="mt-2 text-primary font-semibold">
            ${{ hit.document.price }}
          </p>
        </div>
      </div>

      <div v-else-if="result" class="text-sm text-gray-500">
        No matching results for the selected preset.
      </div>
    </div>
  </UCard>
</template>

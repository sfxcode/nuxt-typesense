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
const serverPresets = ref<string[]>([])

const presetCatalog = [
  { label: 'No preset', value: 'none', description: 'Build a custom query with your own filters and ranking.' },
  { label: 'products_search', value: 'products_search', description: 'General product discovery across names, descriptions, and tags.' },
  { label: 'products_listing', value: 'products_listing', description: 'Catalog browsing with broad relevance and layout-friendly ordering.' },
  { label: 'electronics_only', value: 'electronics_only', description: 'Restrict to electronics inventory in a filtered storefront flow.' },
  { label: 'top_rated', value: 'top_rated', description: 'Surface highly rated products first for recommendation-heavy screens.' },
  { label: 'budget_friendly', value: 'budget_friendly', description: 'Prioritize lower-cost items for deal or value-driven shoppers.' },
  { label: 'in_stock_best_sellers', value: 'in_stock_best_sellers', description: 'Use when you want fast-moving, available items ahead of inventory gaps.' },
  { label: 'new_arrivals', value: 'new_arrivals', description: 'Boost recently released products for launch or freshness campaigns.' },
]

const presetMeta = Object.fromEntries(presetCatalog.map(preset => [preset.value, preset]))

const selectedPresetMeta = computed(() => presetMeta[selectedPreset.value] ?? { label: selectedPreset.value, value: selectedPreset.value, description: 'Custom preset loaded from the server.' })

const presetOptions = computed(() => {
  const combined = [...presetCatalog]

  for (const presetId of serverPresets.value) {
    if (!combined.some(item => item.value === presetId)) {
      combined.push({ label: presetId, value: presetId })
    }
  }

  return combined
})

async function loadAvailablePresets() {
  try {
    const response = await $fetch<{ presets?: Array<{ id?: string; presetId?: string }> }>('/api/typesense/presets')
    const foundPresets = response.presets?.map(preset => preset.id || preset.presetId).filter((preset): preset is string => Boolean(preset)) ?? []
    serverPresets.value = [...new Set(foundPresets)]
  }
  catch {
    serverPresets.value = []
  }
}

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

onMounted(async () => {
  await loadAvailablePresets()
  await runDemo()
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

      <div class="rounded-lg border border-dashed p-3 bg-gray-50 dark:bg-gray-900/40">
        <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Preset intent
        </p>
        <p class="mt-2 text-sm font-medium">
          {{ selectedPresetMeta.label }}
        </p>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {{ selectedPresetMeta.description }}
        </p>
      </div>

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

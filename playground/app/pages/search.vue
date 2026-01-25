<script setup lang="ts">
import { consola } from 'consola'
import type { SearchParameters } from '../../../src/runtime/api'

interface SearchHit {
  document: {
    id: string
    name: string
    description: string
    price: number
    brand: string
    rating: number
    inStock: boolean
    tags: string[]
    imageUrl?: string
  }
}

interface FacetCount {
  value: string
  count: number
}

interface Facet {
  field_name: string
  counts?: FacetCount[]
}

interface SearchResult {
  hits?: SearchHit[]
  found: number
  facet_counts?: Facet[]
}

const searchQuery = ref('')
const searchResult = ref<SearchResult | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const activeFilter = ref<string | null>(null)
const activeFilterLabel = ref<string | null>(null)

const quickFilters = [
  { label: 'Electronics', query: 'category:=Electronics' },
  { label: 'In Stock', query: 'inStock:=true' },
  { label: 'High Rated', query: 'rating:>=4.5' },
  { label: 'Under $100', query: 'price:<100' },
]

async function search() {
  loading.value = true
  error.value = null

  let query = searchQuery.value.trim()
  if (!query || query.length === 0) {
    query = '*'
  }

  try {
    let params: SearchParameters = {
      q: query,
      queryBy: 'name,description,tags',
      facetBy: 'category,brand,inStock',
      perPage: 12,
    }

    if (activeFilter.value) {
      params = { ...params, filterBy: activeFilter.value }
    }

    consola.error(params)

    searchResult.value = await $fetch<SearchResult>('/api/typesense/documents/products/search', {
      method: 'POST',
      body: params,
    })
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to search products'
    searchResult.value = null
  }
  finally {
    loading.value = false
  }
}

function applyFilter(filter: string, label: string) {
  activeFilter.value = filter
  activeFilterLabel.value = label
  search()
}

function clearFilter() {
  activeFilter.value = null
  activeFilterLabel.value = null
  search()
}

let debounceTimeout: ReturnType<typeof setTimeout>
function debouncedSearch() {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    search()
  }, 300)
}

onMounted(() => {
  search()
})
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">
            Product Search Demo
          </h2>
          <UBadge
            v-if="searchResult"
            color="primary"
          >
            {{ searchResult.found }} results
          </UBadge>
        </div>
      </template>

      <div class="space-y-4">
        <UInput
          v-model="searchQuery"
          placeholder="Search products..."
          size="lg"
          @input="debouncedSearch"
        >
          <template #leading>
            <Icon name="i-lucide-search" />
          </template>
        </UInput>

        <div class="flex gap-2 flex-wrap">
          <UButton
            v-for="filter in quickFilters"
            :key="filter.label"
            size="sm"
            :variant="activeFilter === filter.query ? 'solid' : 'soft'"
            @click="applyFilter(filter.query, filter.label)"
          >
            {{ filter.label }}
          </UButton>
          <UButton
            v-if="activeFilter"
            size="sm"
            color="error"
            variant="soft"
            @click="clearFilter"
          >
            Clear Filter
          </UButton>
        </div>

        <div
          v-if="loading"
          class="text-center py-8"
        >
          <Icon
            name="i-lucide-loader-2"
            class="animate-spin text-2xl"
          />
          <p class="text-sm text-gray-500 mt-2">
            Searching...
          </p>
        </div>

        <div
          v-else-if="error"
          class="text-center py-8"
        >
          <UAlert
            color="error"
            :title="error"
          />
        </div>

        <div
          v-else-if="searchResult && (searchResult.hits?.length ?? 0) > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <UCard
            v-for="hit in searchResult.hits"
            :key="hit.document.id"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="space-y-3">
              <img
                v-if="hit.document.imageUrl"
                :src="hit.document.imageUrl"
                :alt="hit.document.name"
                class="w-full h-48 object-cover rounded-lg"
              >
              <div>
                <h3 class="font-semibold text-lg">
                  {{ hit.document.name }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ hit.document.description }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-primary">
                  ${{ hit.document.price }}
                </span>
                <UBadge :color="hit.document.inStock ? 'success' : 'error'">
                  {{ hit.document.inStock ? 'In Stock' : 'Out of Stock' }}
                </UBadge>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ hit.document.brand }}
                </span>
                <div class="flex items-center gap-1">
                  <Icon
                    name="i-lucide-star"
                    class="text-yellow-500"
                  />
                  <span>{{ hit.document.rating }}</span>
                </div>
              </div>
              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in hit.document.tags"
                  :key="tag"
                  size="xs"
                  variant="subtle"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>

        <div
          v-else-if="searchResult"
          class="text-center py-8 text-gray-500"
        >
          <Icon
            name="i-lucide-search-x"
            class="text-4xl mb-2"
          />
          <p>No products found</p>
        </div>

        <div
          v-else
          class="text-center py-8 text-gray-500"
        >
          <Icon
            name="i-lucide-search"
            class="text-4xl mb-2"
          />
          <p>Start typing to search products</p>
        </div>
      </div>
    </UCard>

    <UCard v-if="searchResult?.facet_counts?.length">
      <template #header>
        <h3 class="font-semibold">
          Facets
        </h3>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="facet in searchResult.facet_counts"
          :key="facet.field_name"
        >
          <h4 class="font-medium mb-2 capitalize">
            {{ facet.field_name }}
          </h4>
          <div class="space-y-1">
            <div
              v-for="count in facet.counts?.slice(0, 5)"
              :key="count.value"
              class="flex justify-between text-sm"
            >
              <span>{{ count.value }}</span>
              <span class="text-gray-500">{{ count.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

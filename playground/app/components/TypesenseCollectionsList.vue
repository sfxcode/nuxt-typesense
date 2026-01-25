<script setup lang="ts">
import type { CollectionResponse } from '../../../src/runtime/api/models'

const collections = ref<CollectionResponse[] | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const lastUpdated = ref<string>('')

async function fetchCollections() {
  loading.value = true
  error.value = null

  try {
    collections.value = await $fetch('/api/typesense/collections')
    lastUpdated.value = new Date().toLocaleString()
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
    collections.value = null
  }
  finally {
    loading.value = false
  }
}

async function deleteCollection(name: string) {
  if (!confirm(`Are you sure you want to delete collection "${name}"?`)) {
    return
  }

  try {
    await $fetch(`/api/typesense/collections/${name}`, {
      method: 'DELETE',
    })
    await fetchCollections()
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to delete collection'
  }
}

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString()
}

// Fetch on mount
onMounted(() => {
  fetchCollections()
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">
          Collections
        </h3>
        <div class="flex gap-2">
          <UBadge
            v-if="collections"
            color="primary"
            variant="subtle"
          >
            {{ collections.length }} collection{{ collections.length !== 1 ? 's' : '' }}
          </UBadge>
          <UButton
            size="xs"
            icon="i-lucide-refresh-cw"
            :loading="loading"
            @click="fetchCollections"
          >
            Refresh
          </UButton>
        </div>
      </div>
    </template>

    <div
      v-if="loading && !collections"
      class="flex items-center justify-center py-8"
    >
      <Icon
        name="i-lucide-loader-2"
        class="animate-spin text-2xl"
      />
      <span class="ml-2 text-sm text-gray-500">Loading collections...</span>
    </div>

    <div
      v-else-if="error"
      class="py-4"
    >
      <UAlert
        color="error"
        title="Failed to fetch collections"
        :description="error"
      />
    </div>

    <div
      v-else-if="collections && collections.length === 0"
      class="py-8 text-center text-gray-500"
    >
      <Icon
        name="i-lucide-database"
        class="text-4xl mb-2"
      />
      <p>No collections found</p>
    </div>

    <div
      v-else-if="collections"
      class="space-y-3"
    >
      <UCard
        v-for="collection in collections"
        :key="collection.name"
        class="hover:shadow-md transition-shadow"
      >
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-lg">
                  {{ collection.name }}
                </h4>
                <UBadge
                  size="xs"
                  variant="subtle"
                >
                  {{ collection.numDocuments }} docs
                </UBadge>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Created: {{ formatDate(collection.createdAt) }}
              </div>
            </div>
            <UButton
              color="red"
              variant="ghost"
              size="xs"
              icon="i-lucide-trash-2"
              @click="deleteCollection(collection.name)"
            >
              Delete
            </UButton>
          </div>

          <div
            v-if="collection.defaultSortingField"
            class="text-sm"
          >
            <span class="text-gray-500 dark:text-gray-400">Sorting field:</span>
            <code class="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
              {{ collection.defaultSortingField }}
            </code>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fields ({{ collection.fields?.length || 0 }})
            </div>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="field in collection.fields?.slice(0, 8)"
                :key="field.name"
                size="xs"
                :color="field.facet ? 'primary' : 'neutral'"
                variant="soft"
              >
                {{ field.name }}: {{ field.type }}
                <span
                  v-if="field.facet"
                  class="ml-1"
                >
                  <Icon
                    name="i-lucide-filter"
                    class="w-3 h-3"
                  />
                </span>
              </UBadge>
              <UBadge
                v-if="collection.fields && collection.fields.length > 8"
                size="xs"
                variant="subtle"
              >
                +{{ collection.fields.length - 8 }} more
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>

      <div class="text-xs text-gray-500 pt-2">
        Last updated: {{ lastUpdated }}
      </div>
    </div>
  </UCard>
</template>

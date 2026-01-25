<script setup lang="ts">
import type { TypesenseStatus } from '../../../src/types'

const status = ref<TypesenseStatus | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const lastUpdated = ref<string>('')

async function fetchStatus() {
  loading.value = true
  error.value = null

  try {
    status.value = await $fetch('/api/typesense/status')
    lastUpdated.value = new Date().toLocaleString()
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
    status.value = null
  }
  finally {
    loading.value = false
  }
}

// Fetch on mount
onMounted(() => {
  fetchStatus()
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">
          Typesense Status
        </h3>
        <UButton
          size="xs"
          icon="i-lucide-refresh-cw"
          :loading="loading"
          @click="fetchStatus"
        >
          Refresh
        </UButton>
      </div>
    </template>

    <div
      v-if="loading && !status"
      class="flex items-center justify-center py-8"
    >
      <Icon
        name="i-lucide-loader-2"
        class="animate-spin text-2xl"
      />
      <span class="ml-2 text-sm text-gray-500">Loading status...</span>
    </div>

    <div
      v-else-if="error"
      class="py-4"
    >
      <UAlert
        color="error"
        title="Failed to fetch status"
        :description="error"
      />
    </div>

    <div
      v-else-if="status"
      class="space-y-4"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="space-y-2">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </div>
          <div class="flex items-center">
            <UBadge
              :color="status.healthy ? 'success' : 'error'"
              size="lg"
            >
              {{ status.healthy ? 'Healthy' : 'Unhealthy' }}
            </UBadge>
          </div>
        </div>

        <div
          v-if="status.version"
          class="space-y-2"
        >
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Version
          </div>
          <div class="text-base font-mono">
            {{ status.version }}
          </div>
        </div>

        <div
          v-if="status.url"
          class="space-y-2"
        >
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
            URL
          </div>
          <div class="text-base font-mono text-xs">
            {{ status.url }}
          </div>
        </div>
      </div>

      <div class="my-4 border-t border-gray-200 dark:border-gray-700" />

      <div class="space-y-2">
        <div class="text-sm font-semibold">
          Raw Response
        </div>
        <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto">{{ JSON.stringify(status, null, 2) }}</pre>
      </div>

      <div class="text-xs text-gray-500">
        Last updated: {{ lastUpdated }}
      </div>
    </div>
  </UCard>
</template>

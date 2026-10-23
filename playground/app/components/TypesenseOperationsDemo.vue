<script setup lang="ts">
interface MetricsPayload {
  [key: string]: number | string | boolean | null | undefined
}

interface StatsPayload {
  [key: string]: number | string | boolean | null | undefined
}

const loading = ref(false)
const error = ref<string | null>(null)
const metrics = ref<MetricsPayload | null>(null)
const stats = ref<StatsPayload | null>(null)
const schemaChanges = ref<unknown>(null)

async function fetchOperationsData() {
  loading.value = true
  error.value = null

  try {
    const [metricsResponse, statsResponse, schemaResponse] = await Promise.all([
      $fetch('/api/typesense/metrics.json'),
      $fetch('/api/typesense/stats.json'),
      $fetch('/api/typesense/operations/schema_changes'),
    ])

    metrics.value = metricsResponse as MetricsPayload
    stats.value = statsResponse as StatsPayload
    schemaChanges.value = schemaResponse
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Unable to load operations data.'
    metrics.value = null
    stats.value = null
    schemaChanges.value = null
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOperationsData()
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">
          Operations & Diagnostics
        </h2>
        <UButton size="xs" icon="i-lucide-refresh-cw" :loading="loading" @click="fetchOperationsData">
          Refresh
        </UButton>
      </div>
    </template>

    <div class="space-y-5">
      <UAlert v-if="error" color="error" title="Request failed" :description="error" />

      <div class="grid gap-4 md:grid-cols-3">
        <div v-if="stats" class="rounded-lg border p-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Server stats
          </p>
          <p class="mt-2 text-2xl font-bold">
            {{ typeof stats?.numCollections === 'number' ? stats.numCollections : 'n/a' }}
          </p>
          <p class="text-xs text-gray-500">
            Collections
          </p>
        </div>

        <div v-if="metrics" class="rounded-lg border p-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Metrics snapshot
          </p>
          <p class="mt-2 text-2xl font-bold">
            {{ Object.keys(metrics || {}).length }}
          </p>
          <p class="text-xs text-gray-500">
            Keys returned
          </p>
        </div>

        <div class="rounded-lg border p-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Admin actions
          </p>
          <p class="mt-2 text-lg font-semibold">
            Cache / compact / snapshot
          </p>
          <p class="text-xs text-gray-500">
            Use from server-side-only workflows
          </p>
        </div>
      </div>

      <div class="grid gap-4 xl:grid-cols-2">
        <div class="rounded-lg border p-4">
          <p class="text-sm font-semibold mb-3">
            Metrics JSON
          </p>
          <pre v-if="metrics" class="overflow-auto text-xs">{{ JSON.stringify(metrics, null, 2) }}</pre>
          <p v-else class="text-sm text-gray-500">
            Loading metrics...
          </p>
        </div>

        <div class="rounded-lg border p-4">
          <p class="text-sm font-semibold mb-3">
            Stats JSON
          </p>
          <pre v-if="stats" class="overflow-auto text-xs">{{ JSON.stringify(stats, null, 2) }}</pre>
          <p v-else class="text-sm text-gray-500">
            Loading stats...
          </p>
        </div>
      </div>

      <div class="rounded-lg border p-4">
        <p class="text-sm font-semibold mb-3">
          Schema changes
        </p>
        <pre v-if="schemaChanges !== null" class="overflow-auto text-xs">{{ JSON.stringify(schemaChanges, null, 2) }}</pre>
        <p v-else class="text-sm text-gray-500">
          Loading schema change information...
        </p>
      </div>

      <div class="rounded-lg border bg-gray-50 p-4 dark:bg-gray-900/40">
        <p class="text-sm font-semibold mb-2">
          Useful admin operations
        </p>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• /api/typesense/operations/cache/clear</li>
          <li>• /api/typesense/operations/db/compact</li>
          <li>• /api/typesense/operations/snapshot</li>
          <li>• /api/typesense/operations/schema_changes</li>
          <li>• /api/typesense/metrics.json</li>
          <li>• /api/typesense/stats.json</li>
        </ul>
      </div>
    </div>
  </UCard>
</template>

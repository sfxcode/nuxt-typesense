<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const status = ref<Record<string, unknown> | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const runtimeSummary = computed(() => {
  const publicCfg = runtimeConfig.public?.typesense as Record<string, unknown> | undefined
  const serverCfg = runtimeConfig.typesense as Record<string, unknown> | undefined

  return {
    url: (publicCfg?.url as string | undefined) || (serverCfg?.url as string | undefined) || 'Not configured',
    clientMode: Boolean(publicCfg?.clientMode ?? false),
    apiKey: publicCfg?.apiKey || serverCfg?.apiKey ? 'configured' : 'missing',
    publicRuntime: 'typesense' in (runtimeConfig.public || {}),
  }
})

async function fetchStatus() {
  loading.value = true
  error.value = null

  try {
    status.value = await $fetch('/api/typesense/status')
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Unable to load status information.'
    status.value = null
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStatus()
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">
          Info & Configuration
        </h2>
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

    <div class="space-y-5">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-dashed p-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Runtime URL
          </p>
          <p class="mt-2 font-mono text-sm break-all">
            {{ runtimeSummary.url }}
          </p>
        </div>

        <div class="rounded-lg border border-dashed p-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Browser exposure
          </p>
          <p class="mt-2 text-sm font-semibold">
            {{ runtimeSummary.clientMode ? 'Client mode enabled' : 'Server-only mode' }}
          </p>
          <p class="mt-1 text-xs text-gray-500">
            API key state: {{ runtimeSummary.apiKey }}
          </p>
        </div>
      </div>

      <div class="rounded-lg border bg-gray-50 dark:bg-gray-900/40 p-4">
        <p class="text-sm font-semibold mb-2">
          Server-side API endpoints
        </p>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• /api/typesense/status</li>
          <li>• /api/typesense/collections</li>
          <li>• /api/typesense/documents/:collection/search</li>
          <li>• /api/typesense/keys</li>
          <li>• /api/typesense/analytics/status</li>
          <li>• /api/typesense/presets/:presetId</li>
        </ul>
      </div>

      <UAlert
        v-if="error"
        color="error"
        title="Status request failed"
        :description="error"
      />

      <div
        v-if="status"
        class="space-y-3"
      >
        <div class="flex items-center gap-2">
          <UBadge
            :color="status.healthy ? 'success' : 'error'"
            size="lg"
          >
            {{ status.healthy ? 'Healthy' : 'Unhealthy' }}
          </UBadge>
          <span
            v-if="status.version"
            class="text-sm text-gray-500"
          >Version {{ status.version }}</span>
        </div>

        <pre class="overflow-auto rounded-md bg-gray-100 p-3 text-xs dark:bg-gray-800">{{ JSON.stringify(status, null, 2) }}</pre>
      </div>
    </div>
  </UCard>
</template>

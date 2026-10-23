<script setup lang="ts">
const status = ref<Record<string, unknown> | null>(null)
const rules = ref<Array<Record<string, unknown>>>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchAnalytics() {
  loading.value = true
  error.value = null

  try {
    const [analyticsStatus, analyticsRules] = await Promise.all([
      $fetch('/api/typesense/analytics/status'),
      $fetch('/api/typesense/analytics/rules'),
    ])

    status.value = analyticsStatus as Record<string, unknown>
    rules.value = Array.isArray(analyticsRules)
      ? analyticsRules as Array<Record<string, unknown>>
      : []
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Unable to load analytics information.'
    status.value = null
    rules.value = []
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAnalytics()
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">
          Analytics Overview
        </h2>
        <UButton size="xs" icon="i-lucide-refresh-cw" :loading="loading" @click="fetchAnalytics">
          Refresh
        </UButton>
      </div>
    </template>

    <div class="space-y-5">
      <UAlert v-if="error" color="error" title="Analytics request failed" :description="error" />

      <div v-if="status" class="rounded-lg border bg-gray-50 p-4 dark:bg-gray-900/40">
        <p class="text-sm font-semibold mb-2">
          Analytics status
        </p>
        <pre class="overflow-auto text-xs">{{ JSON.stringify(status, null, 2) }}</pre>
      </div>

      <div class="rounded-lg border p-4">
        <p class="text-sm font-semibold mb-3">
          Rules
        </p>

        <div v-if="rules.length" class="space-y-3">
          <div v-for="(rule, index) in rules" :key="`${String(rule.name || rule.ruleName || 'rule')}-${index}`" class="rounded-md border p-3">
            <p class="font-mono text-sm">
              {{ rule.name || rule.ruleName || 'rule' }}
            </p>
            <pre v-if="rule" class="mt-2 overflow-auto text-xs text-gray-600 dark:text-gray-400">{{ JSON.stringify(rule, null, 2) }}</pre>
          </div>
        </div>

        <p v-else class="text-sm text-gray-500">
          No analytics rules are currently configured.
        </p>
      </div>
    </div>
  </UCard>
</template>

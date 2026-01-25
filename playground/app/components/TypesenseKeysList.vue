<template>
  <div class="typesense-keys">
    <h3 class="text-lg font-semibold mb-4">
      API Keys Management
    </h3>

    <div
      v-if="loading"
      class="text-gray-500"
    >
      Loading keys...
    </div>
    <div
      v-else-if="error"
      class="text-red-500"
    >
      {{ error }}
    </div>

    <div
      v-else-if="keys && keys.keys"
      class="space-y-4"
    >
      <div class="mb-4">
        <p class="text-sm text-gray-600">
          Total Keys: {{ keys.keys.length }}
        </p>
      </div>

      <div
        v-for="key in keys.keys"
        :key="key.id"
        class="border rounded-lg p-4 space-y-2"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <p class="font-medium">
              Key ID: {{ key.id }}
            </p>
            <p class="text-sm text-gray-600">
              {{ key.description }}
            </p>
          </div>
          <button
            class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            :disabled="deleting"
            @click="handleDeleteKey(key.id)"
          >
            Delete
          </button>
        </div>

        <div class="text-xs space-y-1">
          <p><span class="font-medium">Value Prefix:</span> {{ key.valuePrefix }}</p>
          <p><span class="font-medium">Actions:</span> {{ key.actions.join(', ') }}</p>
          <p><span class="font-medium">Collections:</span> {{ key.collections.join(', ') }}</p>
          <p v-if="key.expiresAt">
            <span class="font-medium">Expires:</span>
            {{ new Date(key.expiresAt * 1000).toLocaleString() }}
          </p>
        </div>
      </div>

      <div
        v-if="keys.keys.length === 0"
        class="text-gray-500 text-center py-8"
      >
        No API keys found
      </div>
    </div>

    <div class="mt-6">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        :disabled="loading"
        @click="refreshKeys"
      >
        Refresh Keys
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ApiKeysResponse } from '~/src/runtime/api'

const keys = ref<ApiKeysResponse | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const deleting = ref(false)

const fetchKeys = async () => {
  loading.value = true
  error.value = null

  try {
    keys.value = await $fetch<ApiKeysResponse>('/api/typesense/keys')
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch keys'
  }
  finally {
    loading.value = false
  }
}

const refreshKeys = () => {
  fetchKeys()
}

const handleDeleteKey = async (keyId: number) => {
  if (!confirm('Are you sure you want to delete this key?')) {
    return
  }

  deleting.value = true

  try {
    await $fetch(`/api/typesense/keys/${keyId}`, {
      method: 'DELETE',
    })
    await fetchKeys()
  }
  catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to delete key'
  }
  finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchKeys()
})
</script>

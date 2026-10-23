<script setup lang="ts">
import type { CollectionAliasSchema } from '../../../src/runtime/api'

interface Alias { name: string, collectionName: string }

const aliasName = ref('products_live')
const target = ref('')
const aliases = ref<Alias[]>([])
const collections = ref<string[]>([])
const error = ref<string | null>(null)

async function refresh() {
  error.value = null
  try {
    const [aliasResponse, collectionResponse] = await Promise.all([
      $fetch<{ aliases: Alias[] }>('/api/typesense/alias'),
      $fetch<Array<{ name: string }>>('/api/typesense/collections'),
    ])
    aliases.value = aliasResponse.aliases
    collections.value = collectionResponse.map(c => c.name)
    if (!target.value || !collections.value.includes(target.value))
      target.value = collections.value.includes('products') ? 'products' : (collections.value[0] ?? '')
  }
  catch (e) {
    error.value = errorMessage(e, 'Failed to load aliases')
  }
}

// An alias is a stable name that can be repointed to another collection without changing clients
async function save() {
  try {
    const body: CollectionAliasSchema = { collectionName: target.value }
    await $fetch(`/api/typesense/alias/${aliasName.value}`, { method: 'PUT', body })
    await refresh()
  }
  catch (e) {
    error.value = errorMessage(e, 'Failed to save alias')
  }
}

async function remove(name: string) {
  try {
    await $fetch(`/api/typesense/alias/${name}`, { method: 'DELETE' })
    await refresh()
  }
  catch (e) {
    error.value = errorMessage(e, 'Failed to delete alias')
  }
}

onMounted(refresh)
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold">
        Collection Aliases
      </h2>
    </template>

    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        An alias is a stable name that points at a collection. Repoint it to switch a live search to a rebuilt collection without changing the client.
      </p>

      <UAlert
        v-if="error"
        color="error"
        :title="error"
      />

      <div class="grid gap-2 md:grid-cols-2">
        <UInput
          v-model="aliasName"
          placeholder="Alias name"
        />
        <USelect
          v-model="target"
          :items="collections"
          placeholder="Target collection"
        />
      </div>
      <UButton
        :disabled="!aliasName || !target"
        @click="save"
      >
        Save alias
      </UButton>

      <div
        v-for="alias in aliases"
        :key="alias.name"
        class="flex items-center justify-between rounded-lg border p-3 text-sm"
      >
        <span><b>{{ alias.name }}</b> → {{ alias.collectionName }}</span>
        <UButton
          size="xs"
          color="error"
          variant="ghost"
          @click="remove(alias.name)"
        >
          Delete
        </UButton>
      </div>
      <p
        v-if="!aliases.length"
        class="text-sm text-gray-500"
      >
        No aliases yet.
      </p>
    </div>
  </UCard>
</template>

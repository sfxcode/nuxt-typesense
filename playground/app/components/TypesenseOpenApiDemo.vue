<script setup lang="ts">
interface Operation { summary: string, tags: string[] }
interface Spec {
  info: { title: string, version: string, description: string }
  paths: Record<string, Record<string, Operation>>
}

const specPath = '/api/typesense/openapi.json'
const spec = ref<Spec | null>(null)
const error = ref<string | null>(null)
const filter = ref('')

const methodColor: Record<string, 'success' | 'primary' | 'warning' | 'error' | 'neutral'> = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'error',
}

const operationsByTag = computed(() => {
  const groups = new Map<string, Array<{ method: string, path: string, summary: string }>>()
  const needle = filter.value.toLowerCase()
  for (const [path, item] of Object.entries(spec.value?.paths ?? {})) {
    for (const [method, operation] of Object.entries(item)) {
      if (needle && !`${method} ${path} ${operation.summary}`.toLowerCase().includes(needle))
        continue
      const tag = operation.tags[0] ?? 'Other'
      groups.set(tag, [...(groups.get(tag) ?? []), { method, path, summary: operation.summary }])
    }
  }
  return [...groups]
})

const total = computed(() => Object.values(spec.value?.paths ?? {}).reduce((sum, item) => sum + Object.keys(item).length, 0))

onMounted(async () => {
  try {
    spec.value = await $fetch<Spec>(specPath)
  }
  catch (e) {
    error.value = errorMessage(e, 'Failed to load the OpenAPI document')
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">
          OpenAPI description
        </h2>
        <UButton
          :to="specPath"
          target="_blank"
          size="xs"
          icon="i-lucide-download"
        >
          openapi.json
        </UButton>
      </div>
    </template>

    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Enable it with <code>typesense: { openAPI: true }</code>. It lists the routes that are registered, so <code>routes.readOnly</code> and <code>routes.exclude</code> shrink it too. Import it into Postman, Insomnia or a client generator.
      </p>

      <UAlert
        v-if="error"
        color="error"
        :title="error"
        description="Set openAPI: true in the typesense module options."
      />

      <template v-if="spec">
        <div class="flex items-center gap-2">
          <UInput
            v-model="filter"
            placeholder="Filter routes"
            class="flex-1"
          />
          <UBadge variant="subtle">
            {{ total }} operations
          </UBadge>
        </div>

        <section
          v-for="[tag, operations] in operationsByTag"
          :key="tag"
          class="space-y-1"
        >
          <h3 class="font-semibold">
            {{ tag }}
          </h3>
          <div
            v-for="operation in operations"
            :key="`${operation.method} ${operation.path}`"
            class="flex items-center gap-2 text-sm"
          >
            <UBadge
              :color="methodColor[operation.method] ?? 'neutral'"
              variant="subtle"
              class="w-16 justify-center uppercase"
            >
              {{ operation.method }}
            </UBadge>
            <code>{{ operation.path }}</code>
            <span class="text-gray-500">{{ operation.summary }}</span>
          </div>
        </section>
      </template>
    </div>
  </UCard>
</template>

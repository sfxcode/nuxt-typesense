<script setup lang="ts">
interface ModelRow { id: string, modelName?: string }

const nlModels = ref<ModelRow[]>([])
const conversationModels = ref<ModelRow[]>([])
const errors = ref<{ nl?: string, conversations?: string }>({})
const loading = ref(false)

async function refresh() {
  loading.value = true
  errors.value = {}
  const [nl, conversations] = await Promise.allSettled([
    $fetch<ModelRow[]>('/api/typesense/nl_search_models'),
    $fetch<ModelRow[]>('/api/typesense/conversations/models'),
  ])
  nlModels.value = nl.status === 'fulfilled' ? nl.value : []
  conversationModels.value = conversations.status === 'fulfilled' ? conversations.value : []
  if (nl.status === 'rejected')
    errors.value.nl = errorMessage(nl.reason, 'Failed to load NL search models')
  if (conversations.status === 'rejected')
    errors.value.conversations = errorMessage(conversations.reason, 'Failed to load conversation models')
  loading.value = false
}

onMounted(refresh)
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">
          AI Models
        </h2>
        <UButton
          size="xs"
          icon="i-lucide-refresh-cw"
          :loading="loading"
          @click="refresh"
        >
          Refresh
        </UButton>
      </div>
    </template>

    <div class="space-y-6">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Natural language search and conversational search use LLM models. They are created with <code>POST /api/typesense/nl_search_models</code> and <code>POST /api/typesense/conversations/models</code> and need a provider API key, so this page only lists what is configured.
      </p>

      <section class="space-y-2">
        <h3 class="font-semibold">
          Natural language search models
        </h3>
        <UAlert
          v-if="errors.nl"
          color="error"
          :title="errors.nl"
        />
        <div
          v-for="model in nlModels"
          :key="model.id"
          class="rounded-lg border p-2 text-sm"
        >
          <b>{{ model.id }}</b><span v-if="model.modelName"> · {{ model.modelName }}</span>
        </div>
        <p
          v-if="!nlModels.length && !errors.nl"
          class="text-sm text-gray-500"
        >
          None configured.
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-semibold">
          Conversation models
        </h3>
        <UAlert
          v-if="errors.conversations"
          color="error"
          :title="errors.conversations"
        />
        <div
          v-for="model in conversationModels"
          :key="model.id"
          class="rounded-lg border p-2 text-sm"
        >
          <b>{{ model.id }}</b><span v-if="model.modelName"> · {{ model.modelName }}</span>
        </div>
        <p
          v-if="!conversationModels.length && !errors.conversations"
          class="text-sm text-gray-500"
        >
          None configured.
        </p>
      </section>
    </div>
  </UCard>
</template>

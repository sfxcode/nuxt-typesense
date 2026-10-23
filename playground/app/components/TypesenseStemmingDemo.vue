<script setup lang="ts">
const dictionaryId = ref('demo_stems')
const mappings = ref('people, person\nmice, mouse\nfeet, foot')
const dictionaries = ref<string[]>([])
const selected = ref<{ id: string, words: Array<{ word: string, root: string }> } | null>(null)
const error = ref<string | null>(null)

async function refresh() {
  error.value = null
  try {
    const res = await $fetch<{ dictionaries?: string[] }>('/api/typesense/stemming/dictionaries')
    dictionaries.value = res.dictionaries ?? []
  }
  catch (e) {
    error.value = errorMessage(e, 'Failed to load dictionaries')
  }
}

// Typesense imports dictionaries as JSON Lines, one word to root mapping per line
function toJsonLines() {
  return mappings.value
    .split('\n')
    .map(line => line.split(',').map(part => part.trim()))
    .filter(([word, root]) => word && root)
    .map(([word, root]) => JSON.stringify({ word, root }))
    .join('\n')
}

async function save() {
  try {
    await $fetch('/api/typesense/stemming/dictionaries/import', {
      method: 'POST',
      body: { id: dictionaryId.value, body: toJsonLines() },
    })
    await refresh()
    await view(dictionaryId.value)
  }
  catch (e) {
    error.value = errorMessage(e, 'Failed to import dictionary')
  }
}

async function view(id: string) {
  try {
    selected.value = await $fetch(`/api/typesense/stemming/dictionaries/${id}`)
  }
  catch (e) {
    error.value = errorMessage(e, 'Failed to load dictionary')
  }
}

onMounted(refresh)
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold">
        Stemming Dictionaries
      </h2>
    </template>

    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        A dictionary maps word forms to a root (for example <code>people</code> to <code>person</code>) so irregular plurals and forms match. Enter one <code>word, root</code> pair per line.
      </p>

      <UAlert
        v-if="error"
        color="error"
        :title="error"
      />

      <UInput
        v-model="dictionaryId"
        placeholder="Dictionary id"
        class="w-full"
      />
      <UTextarea
        v-model="mappings"
        :rows="4"
        class="w-full"
      />
      <UButton
        :disabled="!dictionaryId"
        @click="save"
      >
        Import dictionary
      </UButton>

      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="id in dictionaries"
          :key="id"
          size="xs"
          variant="soft"
          @click="view(id)"
        >
          {{ id }}
        </UButton>
        <span
          v-if="!dictionaries.length"
          class="text-sm text-gray-500"
        >No dictionaries yet.</span>
      </div>

      <div
        v-if="selected"
        class="rounded-lg border p-3 text-sm"
      >
        <p class="font-semibold mb-2">
          {{ selected.id }}
        </p>
        <ul class="list-disc list-inside">
          <li
            v-for="entry in selected.words"
            :key="entry.word"
          >
            {{ entry.word }} → {{ entry.root }}
          </li>
        </ul>
      </div>
    </div>
  </UCard>
</template>

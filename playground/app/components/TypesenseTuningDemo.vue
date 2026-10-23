<script setup lang="ts">
import type { SynonymSetCreateSchema } from '../../../src/runtime/api'

interface StopwordsSet { id: string, stopwords: string[] }
interface SynonymSet { name: string, items: Array<{ id?: string, synonyms: string[], root?: string }> }

const setName = ref('demo_synonyms')
const synonymList = ref('laptop, notebook, computer')
const stopwordsId = ref('demo_stopwords')
const stopwordsList = ref('the, a, an, of')
const testQuery = ref('notebook')

const synonymSets = ref<SynonymSet[]>([])
const stopwordSets = ref<StopwordsSet[]>([])
const error = ref<string | null>(null)
const hitCount = ref<number | null>(null)

const split = (value: string) => value.split(',').map(v => v.trim()).filter(Boolean)

function fail(e: unknown) {
  error.value = errorMessage(e, 'Request failed')
}

async function refresh() {
  error.value = null
  try {
    synonymSets.value = await $fetch<SynonymSet[]>('/api/typesense/synonym_sets')
    const res = await $fetch<{ stopwords?: StopwordsSet[] }>('/api/typesense/stopwords')
    stopwordSets.value = res.stopwords ?? []
  }
  catch (e) { fail(e) }
}

async function saveSynonyms() {
  try {
    // Typesense 30 requires an id on every synonym item
    const body: SynonymSetCreateSchema = { items: [{ id: `${setName.value}_1`, synonyms: split(synonymList.value) }] }
    await $fetch(`/api/typesense/synonym_sets/${setName.value}`, { method: 'PUT', body })
    await refresh()
  }
  catch (e) { fail(e) }
}

async function saveStopwords() {
  try {
    await $fetch(`/api/typesense/stopwords/${stopwordsId.value}`, {
      method: 'PUT',
      body: { stopwords: split(stopwordsList.value) },
    })
    await refresh()
  }
  catch (e) { fail(e) }
}

async function remove(kind: 'synonym_sets' | 'stopwords', id: string) {
  try {
    await $fetch(`/api/typesense/${kind}/${id}`, { method: 'DELETE' })
    await refresh()
  }
  catch (e) { fail(e) }
}

async function runTest() {
  try {
    const res = await $fetch<{ found: number }>('/api/typesense/documents/products/search', {
      method: 'POST',
      body: {
        q: testQuery.value,
        queryBy: 'name,description,tags',
        stopwords: stopwordSets.value.map(s => s.id).join(','),
        synonymSets: synonymSets.value.map(s => s.name).join(',') || undefined,
      },
    })
    hitCount.value = res.found
  }
  catch (e) { fail(e) }
}

onMounted(refresh)
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold">
        Search Tuning: Synonyms &amp; Stopwords
      </h2>
    </template>

    <div class="space-y-6">
      <UAlert
        v-if="error"
        color="error"
        :title="error"
      />

      <section class="space-y-2">
        <h3 class="font-semibold">
          Synonym sets
        </h3>
        <div class="grid gap-2 md:grid-cols-3">
          <UInput
            v-model="setName"
            placeholder="Set name"
          />
          <UInput
            v-model="synonymList"
            placeholder="comma separated synonyms"
            class="md:col-span-2"
          />
        </div>
        <UButton @click="saveSynonyms">
          Save synonym set
        </UButton>
        <div
          v-for="set in synonymSets"
          :key="set.name"
          class="flex items-center justify-between rounded-lg border p-2 text-sm"
        >
          <span><b>{{ set.name }}</b>: {{ set.items.map(i => i.synonyms.join(' = ')).join(' | ') }}</span>
          <UButton
            size="xs"
            color="error"
            variant="ghost"
            @click="remove('synonym_sets', set.name)"
          >
            Delete
          </UButton>
        </div>
      </section>

      <section class="space-y-2">
        <h3 class="font-semibold">
          Stopword sets
        </h3>
        <div class="grid gap-2 md:grid-cols-3">
          <UInput
            v-model="stopwordsId"
            placeholder="Set id"
          />
          <UInput
            v-model="stopwordsList"
            placeholder="comma separated stopwords"
            class="md:col-span-2"
          />
        </div>
        <UButton @click="saveStopwords">
          Save stopword set
        </UButton>
        <div
          v-for="set in stopwordSets"
          :key="set.id"
          class="flex items-center justify-between rounded-lg border p-2 text-sm"
        >
          <span><b>{{ set.id }}</b>: {{ set.stopwords.join(', ') }}</span>
          <UButton
            size="xs"
            color="error"
            variant="ghost"
            @click="remove('stopwords', set.id)"
          >
            Delete
          </UButton>
        </div>
      </section>

      <section class="space-y-2">
        <h3 class="font-semibold">
          Test against <code>products</code>
        </h3>
        <div class="flex gap-2">
          <UInput
            v-model="testQuery"
            class="flex-1"
          />
          <UButton @click="runTest">
            Search with all sets
          </UButton>
        </div>
        <UBadge v-if="hitCount !== null">
          {{ hitCount }} results
        </UBadge>
      </section>
    </div>
  </UCard>
</template>

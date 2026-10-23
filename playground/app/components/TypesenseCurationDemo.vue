<script setup lang="ts">
interface CurationItem {
  id: string
  rule: { query?: string, match?: string }
  includes?: Array<{ id: string, position: number }>
  excludes?: Array<{ id: string }>
  replaceQuery?: string
}
interface CurationSet { name: string, description?: string, items: CurationItem[] }

const setName = ref('demo_curation')
const description = ref('Promoted and hidden products')
const ruleQuery = ref('laptop')
const ruleMatch = ref<'exact' | 'contains'>('exact')
const pinId = ref('')
const pinPosition = ref(1)
const excludeId = ref('')

const sets = ref<CurationSet[]>([])
const linked = ref<string[]>([])
const testQuery = ref('water')
const testHits = ref<string[] | null>(null)
const error = ref<string | null>(null)

function fail(e: unknown) {
  error.value = errorMessage(e, 'Request failed')
}

async function refresh() {
  error.value = null
  try {
    sets.value = await $fetch<CurationSet[]>('/api/typesense/curation_sets')
    const products = await $fetch<{ curationSets?: string[] }>('/api/typesense/collections/products')
    linked.value = products.curationSets ?? []
  }
  catch (e) {
    fail(e)
  }
}

async function save() {
  // Typesense 30 requires an id on every curation item
  const item: CurationItem = { id: `${setName.value}_1`, rule: { query: ruleQuery.value, match: ruleMatch.value } }
  if (pinId.value)
    item.includes = [{ id: pinId.value, position: pinPosition.value }]
  if (excludeId.value)
    item.excludes = [{ id: excludeId.value }]

  try {
    await $fetch(`/api/typesense/curation_sets/${setName.value}`, {
      method: 'PUT',
      body: { description: description.value, items: [item] },
    })
    await refresh()
  }
  catch (e) {
    fail(e)
  }
}

// A curation set only affects searches once it is linked to the collection
async function setLinked(name: string, link: boolean) {
  const next = link ? [...new Set([...linked.value, name])] : linked.value.filter(n => n !== name)
  try {
    await $fetch('/api/typesense/collections/products', { method: 'PATCH', body: { curationSets: next } })
    await refresh()
  }
  catch (e) {
    fail(e)
  }
}

async function runTest() {
  try {
    const res = await $fetch<{ hits?: Array<{ document: { id: string, name: string } }> }>('/api/typesense/documents/products/search', {
      method: 'POST',
      body: { q: testQuery.value, queryBy: 'name,description,tags' },
    })
    testHits.value = res.hits?.map(h => `#${h.document.id} ${h.document.name}`) ?? []
  }
  catch (e) {
    fail(e)
  }
}

async function remove(name: string) {
  try {
    await $fetch(`/api/typesense/curation_sets/${name}`, { method: 'DELETE' })
    await refresh()
  }
  catch (e) {
    fail(e)
  }
}

function describeItem(item: CurationItem) {
  const parts = [`"${item.rule.query ?? '*'}" (${item.rule.match ?? 'exact'})`]
  if (item.includes?.length)
    parts.push(`pin ${item.includes.map(i => `#${i.id}@${i.position}`).join(', ')}`)
  if (item.excludes?.length)
    parts.push(`hide ${item.excludes.map(i => `#${i.id}`).join(', ')}`)
  if (item.replaceQuery)
    parts.push(`rewrite to "${item.replaceQuery}"`)
  return parts.join(' → ')
}

onMounted(refresh)
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold">
        Curation Sets
      </h2>
    </template>

    <div class="space-y-4">
      <UAlert
        v-if="error"
        color="error"
        :title="error"
      />

      <div class="grid gap-2 md:grid-cols-2">
        <UInput
          v-model="setName"
          placeholder="Set name"
        />
        <UInput
          v-model="description"
          placeholder="Description"
        />
        <UInput
          v-model="ruleQuery"
          placeholder="Rule query"
        />
        <USelect
          v-model="ruleMatch"
          :items="['exact', 'contains']"
        />
        <UInput
          v-model="pinId"
          placeholder="Document id to pin (optional)"
        />
        <UInput
          v-model.number="pinPosition"
          type="number"
          placeholder="Position"
        />
        <UInput
          v-model="excludeId"
          placeholder="Document id to hide (optional)"
        />
      </div>

      <UButton @click="save">
        Save curation set
      </UButton>

      <div
        v-for="set in sets"
        :key="set.name"
        class="rounded-lg border p-3 text-sm space-y-1"
      >
        <div class="flex items-center justify-between">
          <span>
            <b>{{ set.name }}</b><span v-if="set.description"> – {{ set.description }}</span>
            <UBadge
              v-if="linked.includes(set.name)"
              class="ml-2"
              color="success"
              variant="subtle"
            >linked to products</UBadge>
          </span>
          <div class="flex gap-1">
            <UButton
              size="xs"
              variant="soft"
              @click="setLinked(set.name, !linked.includes(set.name))"
            >
              {{ linked.includes(set.name) ? 'Unlink' : 'Link to products' }}
            </UButton>
            <UButton
              size="xs"
              color="error"
              variant="ghost"
              @click="remove(set.name)"
            >
              Delete
            </UButton>
          </div>
        </div>
        <p
          v-for="(item, i) in set.items"
          :key="i"
          class="text-gray-600 dark:text-gray-400"
        >
          {{ describeItem(item) }}
        </p>
      </div>
      <div class="rounded-lg border p-3 space-y-2">
        <p class="text-sm font-semibold">
          Try it on <code>products</code>
        </p>
        <div class="flex gap-2">
          <UInput
            v-model="testQuery"
            class="flex-1"
          />
          <UButton @click="runTest">
            Search
          </UButton>
        </div>
        <ol
          v-if="testHits"
          class="list-decimal list-inside text-sm"
        >
          <li
            v-for="hit in testHits"
            :key="hit"
          >
            {{ hit }}
          </li>
        </ol>
        <p
          v-if="testHits && !testHits.length"
          class="text-sm text-gray-500"
        >
          No results.
        </p>
      </div>
      <p
        v-if="!sets.length"
        class="text-sm text-gray-500"
      >
        No curation sets yet.
      </p>
    </div>
  </UCard>
</template>

<script setup>
const { healthApi, debugApi, keysApi } = useTypesenseApi()

const health = ref()
const version = ref()

debugApi.debug().then((res) => {
  version.value = res.version
})

healthApi.health().then((res) => {
  health.value = res.ok
})

const { data: result, refresh } = await useAsyncData('keys', () => keysApi.getKeys())
</script>

<template>
  <UCard class="mb-4">
    <template #header>
      <div class="p-2">
        Health: {{ health }} - Version: {{ version }}
      </div>
    </template>
    <template #default>
      <UButton
        class="font-bold rounded-full"
        @click="refresh()"
      >
        Reload
      </UButton>
      <pre class="mt-2">{{ result?.keys }}</pre>
    </template>
  </UCard>
</template>

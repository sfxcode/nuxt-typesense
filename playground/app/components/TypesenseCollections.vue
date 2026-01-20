<script setup lang="ts">

const {collectionInfos} = useTypesenseCollections()

const { data: infos, refresh} = await useAsyncData('infos', () => collectionInfos())

</script>

<template>
  <div>
    <UCard>
      <template #header>
        Collection Infos
      </template>
      <template #default>
        <UButton class="font-bold rounded-full" @click="refresh()">Reload</UButton>
        <pre class="mt-2">{{ infos}}</pre>
      </template>

    </UCard>
  </div>
</template>

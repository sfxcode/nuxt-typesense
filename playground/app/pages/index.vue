<script setup>
const { healthApi, debugApi, keysApi } = useTypesenseApi()
const {collectionInfos} = useTypesenseCollections()


const health = ref()
const version = ref()

debugApi.debug().then(res => {
  version.value = res.version
})

healthApi.health().then(res => {
  health.value = res.ok
})




const { data: result} = await useAsyncData('keys', () => keysApi.getKeys())
const { data: infos, refresh: refreshInfos} = await useAsyncData('infos', () => collectionInfos())

</script>

<template>
  <div class="flex gap-2 mt-4">
    <TypesenseHealth  />
    <TypesenseCollections  />
  </div>
</template>

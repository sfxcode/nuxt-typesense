<script setup>

const { healthApi, debugApi, keysApi } = useTypesenseApi()


const health = ref()
const version = ref()

debugApi.debug().then(res => {
  version.value = res.version
})

healthApi.health().then(res => {
  health.value = res.ok
})




const { data: result} = await useAsyncData('keys', () => keysApi.getKeys())


</script>

<template>
  <div>
    <Card>
      <template #header>
        <div class="p-2">
          Typesense Nuxt
        </div>
      </template>
      <template #title>
        API Status
      </template>
      <template #subtitle>
        OK {{ health }} - Version {{ version }}
      </template>
      <template #content>
        <h3>Keys</h3>
        <DataTable :value="result.keys">
          <Column
            field="valuePrefix"
            header="Prefix"
            sortable
          />
          <Column
            field="description"
            header="Description"
          />
          <Column
            field="collections"
            header="Collections"
          />
          <Column
            field="actions"
            header="Actions"
          />
        </DataTable>
      </template>
    </Card>
  </div>
</template>

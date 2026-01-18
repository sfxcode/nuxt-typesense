<script setup lang="ts">

const {collectionInfos} = useTypesenseCollections()

const { data: infos, refresh: refreshInfos} = await useAsyncData('infos', () => collectionInfos())

</script>

<template>
  <div>
    <Card>
      <template #header>
        <div class="p-2">
          <Button @click="refreshInfos">
            Reload
          </Button>
        </div>
      </template>
      <template #title>
        Collection Infos
      </template>
      <template #content>
        <DataTable :value="infos">
          <Column
            field="name"
            header="Name"
            sortable
          />
          <Column
            field="numDocuments"
            header="Count"
          />
          <Column
            field="fields"
            header="Fields"
          />
          <Column
            field="defaultSortingField"
            header="Sort By"
          />
          <Column
            field="date"
            header="Date"
            sortable
          >
            <template #body="{data}">
              {{ data.date.toLocaleString() }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

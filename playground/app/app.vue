<script setup lang="ts">
useHead({
  titleTemplate: '%s - Typesense',
  htmlAttrs: {
    class: 'bg-white',
  },
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { header } = useAppConfig()
const title = header.title
</script>

<template>
  <UHeader>
    <template #left>
      <div class="text-primary font-bold">
        {{   header.title }}
      </div>
    </template>

    <template #right>
      <ColorModeButton />

      <UButton
        to="https://github.com/nuxt-ui-templates/starter"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UHeader>

</template>

<style scoped>

</style>

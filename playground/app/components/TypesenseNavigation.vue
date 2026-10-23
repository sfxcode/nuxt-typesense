<template>
  <UCard>
    <div class="flex flex-wrap items-center gap-2">
      <UNavigationMenu
        :items="items"
        orientation="horizontal"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'Overview',
    to: '/',
    icon: 'i-lucide-home',
  },
  {
    label: 'Search Demo',
    to: '/search',
    icon: 'i-lucide-search',
  },
  {
    label: 'Collections',
    to: '/collections',
    icon: 'i-lucide-database',
  },
  {
    label: 'Key Management',
    to: '/keys',
    icon: 'i-lucide-key-round',
  },
  {
    label: 'Search Presets',
    to: '/presets',
    icon: 'i-lucide-sliders-horizontal',
  },
  {
    label: 'Examples',
    to: '/examples',
    icon: 'i-lucide-code-2',
  },
]
</script>

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
    label: 'Info',
    to: '/info',
    icon: 'i-lucide-info',
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
    label: 'Analytics',
    to: '/analytics',
    icon: 'i-lucide-chart-column',
  },
  {
    label: 'Operations',
    to: '/operations',
    icon: 'i-lucide-wrench',
  },
  {
    label: 'Search Presets',
    to: '/presets',
    icon: 'i-lucide-sliders-horizontal',
  },
  {
    label: 'Search Tuning',
    to: '/tuning',
    icon: 'i-lucide-wand-sparkles',
  },
  {
    label: 'Examples',
    to: '/examples',
    icon: 'i-lucide-code-2',
  },
]
</script>

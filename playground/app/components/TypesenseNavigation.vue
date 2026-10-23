<template>
  <!-- Not a UCard: its overflow-hidden would clip the dropdown panels -->
  <div class="rounded-lg border border-default bg-default px-4 py-3">
    <UNavigationMenu
      :items="items"
      orientation="horizontal"
      content-orientation="vertical"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// Groups keep the bar short; a group is highlighted when one of its pages is active.
const groups = [
  {
    label: 'Search',
    icon: 'i-lucide-search',
    children: [
      { label: 'Search Demo', to: '/search', icon: 'i-lucide-search', description: 'Live product search' },
      { label: 'Search Presets', to: '/presets', icon: 'i-lucide-sliders-horizontal', description: 'Reusable search parameters' },
    ],
  },
  {
    label: 'Tuning',
    icon: 'i-lucide-wand-sparkles',
    children: [
      { label: 'Synonyms & Stopwords', to: '/tuning', icon: 'i-lucide-wand-sparkles', description: 'Query rewriting sets' },
      { label: 'Curation', to: '/curation', icon: 'i-lucide-pin', description: 'Pin or hide results' },
      { label: 'Stemming', to: '/stemming', icon: 'i-lucide-scissors', description: 'Word form dictionaries' },
    ],
  },
  {
    label: 'Data',
    icon: 'i-lucide-database',
    children: [
      { label: 'Collections', to: '/collections', icon: 'i-lucide-database', description: 'Schemas and documents' },
      { label: 'Aliases', to: '/aliases', icon: 'i-lucide-link', description: 'Stable names for collections' },
      { label: 'Analytics', to: '/analytics', icon: 'i-lucide-chart-column', description: 'Rules and events' },
    ],
  },
  {
    label: 'Admin',
    icon: 'i-lucide-settings',
    children: [
      { label: 'Info', to: '/info', icon: 'i-lucide-info', description: 'Server health and metrics' },
      { label: 'Key Management', to: '/keys', icon: 'i-lucide-key-round', description: 'API and scoped keys' },
      { label: 'AI Models', to: '/models', icon: 'i-lucide-bot', description: 'NL search and conversation models' },
      { label: 'Operations', to: '/operations', icon: 'i-lucide-wrench', description: 'Snapshots, cache, compaction' },
    ],
  },
]

const items = computed<NavigationMenuItem[]>(() => [
  { label: 'Overview', to: '/', icon: 'i-lucide-home' },
  ...groups.map(group => ({
    ...group,
    active: group.children.some(child => route.path.startsWith(child.to)),
  })),
  { label: 'Examples', to: '/examples', icon: 'i-lucide-code-2' },
])
</script>

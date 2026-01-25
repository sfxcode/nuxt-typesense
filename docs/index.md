---
layout: home

hero:
  name: "Nuxt Typesense"
  text: "Fast & Type-Safe Search"
  tagline: A powerful Nuxt module for integrating Typesense - a lightning-fast, typo-tolerant search engine
  image:
    src: /logo.svg
    alt: Nuxt Typesense
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/sfxcode/nuxt-typesense

features:
  - icon: 🚀
    title: Full Typesense API Support
    details: Complete TypeScript API client auto-generated from Typesense OpenAPI spec with all endpoints available.
  
  - icon: 🎯
    title: Auto-imported Composables
    details: Ready-to-use composables for all Typesense operations - just start using them in your components.
  
  - icon: ⚡️
    title: Type Safety
    details: Full TypeScript support with comprehensive type definitions for all API methods and responses.
  
  - icon: 🔧
    title: Zero Config
    details: Simple setup with module configuration. Add to your nuxt.config and start searching.
  
  - icon: 🎨
    title: SSR Compatible
    details: Works seamlessly with Nuxt's server-side rendering and static site generation.
  
  - icon: 🔍
    title: Powerful Search
    details: Leverage Typesense's typo-tolerant, fast search with faceting, filtering, and grouping support.
---

## Quick Setup

Install the module:

::: code-group

```bash [pnpm]
pnpm add @sfxcode/nuxt-typesense
```

```bash [npm]
npm install @sfxcode/nuxt-typesense
```

```bash [yarn]
yarn add @sfxcode/nuxt-typesense
```

:::

Add it to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
  }
})
```

Start using it in your components:

```vue
<script setup lang="ts">
const { collectionsApi, documentsApi } = useTypesenseApi()

// Get collections
const collections = await collectionsApi.getCollections()

// Search documents
const results = await documentsApi.multiSearch({
  searches: [{
    collection: 'products',
    q: 'laptop',
    query_by: 'name,description'
  }]
})
</script>
```

## Resources

- 📖 [Typesense Documentation](https://typesense.org/docs/)
- 🎮 [Typesense API Explorer](https://typesense.org/api/)
- 💬 [Typesense Slack Community](https://join.slack.com/t/typesense-community/shared_invite/zt-2fetvh0pw-ft5y2YQlq4l_bPhhqpjXig)
- 🐙 [GitHub Repository](https://github.com/sfxcode/nuxt-typesense)

# Getting Started

This guide will help you set up Nuxt Typesense in your Nuxt 3 application.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18.x or higher
- A Nuxt 3 project (or create a new one)
- A Typesense server instance (local or cloud)

## Setting up Typesense Server

If you don't have a Typesense server yet, you have several options:

### Option 1: Docker (Recommended for Development)

```bash
docker run -d \
  -p 8108:8108 \
  -v /tmp/typesense-data:/data \
  typesense/typesense:latest \
  --data-dir /data \
  --api-key=xyz
```

### Option 2: Typesense Cloud

Sign up for [Typesense Cloud](https://cloud.typesense.org/) and create a cluster. You'll receive:
- A cluster URL
- An admin API key
- A search-only API key

### Option 3: Self-hosted

Follow the [official Typesense installation guide](https://typesense.org/docs/guide/install-typesense.html).

## Installation

Install the module in your Nuxt project:

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

## Configuration

### Step 1: Add Module to nuxt.config.ts

Add `@sfxcode/nuxt-typesense` to the `modules` section:

```typescript
export default defineNuxtConfig({
  modules: [
    '@sfxcode/nuxt-typesense'
  ],
  
  typesense: {
    url: 'http://localhost:8108',
    apiKey: 'xyz'
  }
})
```

### Step 2: Use Environment Variables (Recommended)

For better security and flexibility, use environment variables:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@sfxcode/nuxt-typesense'
  ],
  
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
  }
})
```

Create a `.env` file in your project root:

```bash
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=xyz
```

::: warning Security Notice
Never commit your `.env` file to version control. Add it to your `.gitignore`:

```bash
# .gitignore
.env
.env.*
!.env.example
```
:::

### Step 3: Create .env.example

Create a `.env.example` file to document required variables:

```bash
# Typesense Configuration
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=your-api-key-here
```

## Verify Installation

Create a simple component to verify everything is working:

```vue
<!-- pages/test-typesense.vue -->
<template>
  <div>
    <h1>Typesense Status</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <p>✅ Connected to Typesense!</p>
      <pre>{{ JSON.stringify(health, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const { healthApi } = useTypesenseApi()

const { data: health, pending, error } = await useAsyncData(
  'typesense-health',
  () => healthApi.health()
)
</script>
```

Visit `/test-typesense` in your browser. If you see "Connected to Typesense!" with health information, you're all set! 🎉

## What's Next?

Now that you have Nuxt Typesense installed, you can:

- [Configure module options](/guide/configuration)
- [Learn about collections](/guide/collections)
- [Explore composables](/api/composables)
- [Check out examples](/examples/basic-usage)

## Troubleshooting

### Cannot connect to Typesense server

- Verify your Typesense server is running
- Check the URL is correct (including protocol: `http://` or `https://`)
- Ensure the API key is valid
- Check firewall settings if using a remote server

### Module not found

Make sure you've installed the module and added it to `nuxt.config.ts`:

```bash
pnpm add @sfxcode/nuxt-typesense
```

### Type errors

Run the dev:prepare script to generate type stubs:

```bash
pnpm run dev:prepare
```

If you still have issues, restart your IDE and TypeScript server.

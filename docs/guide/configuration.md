# Configuration

Learn how to configure the Nuxt Typesense module to suit your needs.

## Module Options

The module accepts the following configuration options:

```typescript
interface ModuleOptions {
  url?: string      // Typesense server URL
  apiKey?: string   // Typesense API key
  clientMode?: boolean // Client-side mode (default: false)
}
```

### `url`

- **Type:** `string`
- **Default:** `undefined`
- **Required:** Yes

The URL of your Typesense server, including the protocol and port.

**Examples:**

```typescript
// Local development
url: 'http://localhost:8108'

// Production server
url: 'https://typesense.example.com'

// Typesense Cloud
url: 'https://xxx.a1.typesense.net'
```

### `apiKey`

- **Type:** `string`
- **Default:** `undefined`
- **Required:** Yes

The API key for authenticating with Typesense.

::: danger Security Warning
**Never expose admin API keys in client-side code!**

For production applications:
- Use **search-only API keys** in your frontend
- Keep admin keys on the server side only
:::

### `clientMode`

- **Type:** `boolean`
- **Default:** `false`

When set to `true`, the module switches from server-side runtime config to public runtime config and exposes the browser composables. This mode is intended for search-only usage and should never be used with admin keys.

The module validates this at startup. If `clientMode` is enabled and the configured API key matches a `TYPESENSE_ADMIN_KEY`/`NUXT_TYPESENSE_ADMIN_KEY`, it throws an error to prevent shipping a write-capable key to the browser.

### `routes`

- **Type:** `{ readOnly?: boolean, exclude?: string[] }`
- **Default:** all routes registered

In server mode the module registers `/api/typesense/*` proxy routes that call Typesense with the server API key. The module adds no authentication, so **every registered route is callable by anyone who can reach your app**, including deleting collections or creating keys. Restrict what is exposed:

```typescript
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
    routes: {
      // only GET routes plus search and multi-search
      readOnly: true,
      // additionally drop route groups by prefix (matched on path segments)
      exclude: ['/api/typesense/keys', '/api/typesense/operations'],
    },
  },
})
```

- `readOnly` keeps `GET` routes, `/api/typesense/status`, and the `search` and `multi-search` POST routes. Key listing (`/api/typesense/keys`) and `/api/typesense/debug` are dropped as well, because they return sensitive metadata.
- `exclude` removes a route and everything beneath it, so `/api/typesense/key` does not match `/api/typesense/keys`.

For public sites, combine `readOnly` with your own Nitro middleware (for example session or token checks on `/api/typesense/**`), or use [`clientMode`](#clientmode) with a search-only key.

### Runtime config behavior

The module stores credentials in different Nuxt runtime config locations depending on `clientMode`:

| Mode | Runtime config location | Intended use |
|------|-------------------------|--------------|
| `clientMode: false` | `runtimeConfig.typesense` | Private server-side access and proxy routes |
| `clientMode: true` | `runtimeConfig.public.typesense` | Browser-based searching with a search-only key |

This means the module keeps the key out of the client bundle by default. If you need to perform privileged actions (creating collections, managing keys, writing documents), prefer the server-side proxy routes or `useTypesenseServerApi()` instead of exposing the key in public runtime config.

## Configuration Examples

### Basic Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  
  typesense: {
    url: 'http://localhost:8108',
    apiKey: 'xyz'
  }
})
```

### Environment-based Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
  }
})
```

### Production Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  
  typesense: {
    url: process.env.TYPESENSE_URL || 'https://typesense.example.com',
    apiKey: process.env.TYPESENSE_SEARCH_ONLY_KEY,
    clientMode: false,
  }
})
```

### Multiple Environments

Use different configurations for development and production:

```typescript
// nuxt.config.ts
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  modules: ['@sfxcode/nuxt-typesense'],
  
  typesense: {
    url: isDev 
      ? 'http://localhost:8108'
      : process.env.TYPESENSE_URL,
    apiKey: isDev
      ? 'xyz'
      : process.env.TYPESENSE_API_KEY,
  }
})
```

## Runtime Configuration

You can also access Typesense configuration at runtime using composables:

```vue
<script setup lang="ts">
// Get the Typesense URL
const url = useTypesenseUrl()
console.log('Typesense URL:', url)

// Get the API key
const apiKey = useTypesenseApiKey()
console.log('API Key:', apiKey.substring(0, 5) + '...')
</script>
```


## Best Practices

### 1. Use Environment Variables

Always use environment variables for sensitive configuration:

```bash
# .env
TYPESENSE_URL=https://xxx.a1.typesense.net
TYPESENSE_SEARCH_ONLY_KEY=xyz123
TYPESENSE_ADMIN_KEY=keep-this-secret
```

### 2. Separate Keys by Environment

Use different API keys for different environments:

```bash
# .env.development
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=development-key

# .env.production
TYPESENSE_URL=https://xxx.a1.typesense.net
TYPESENSE_API_KEY=search-only-key
```

### 3. Never Commit Secrets

Add sensitive files to `.gitignore`:

```bash
# .gitignore
.env
.env.local
.env.*.local
```

### 4. Use Search-Only Keys in Frontend

Create separate keys for different purposes:

- **Admin Key**: Server-side operations only
- **Search-Only Key**: Client-side searches

### 5. Document Required Variables

Create a `.env.example` file:

```bash
# .env.example
# Typesense Configuration
TYPESENSE_URL=your-typesense-url
TYPESENSE_API_KEY=your-api-key

# Optional: Admin key for server operations
TYPESENSE_ADMIN_KEY=your-admin-key
```

## Validation

The module validates configuration on startup. If required options are missing, you'll see a warning in the console:

```
[nuxt-typesense] Missing required option: url
[nuxt-typesense] Missing required option: apiKey
```

## Next Steps

- Learn about [Environment Variables](/guide/environment-variables)
- Explore [Collections](/guide/collections)
- Check out [API Composables](/api/composables)

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

When set to `true`, the module runs in client-side only mode. This is useful for certain deployment scenarios.

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

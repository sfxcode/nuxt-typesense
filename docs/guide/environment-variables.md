# Environment Variables

Learn how to manage environment variables for different deployment scenarios.

## Overview

Using environment variables is the recommended way to configure Nuxt Typesense. This approach provides:

- **Security**: Keep sensitive data out of your codebase
- **Flexibility**: Easy configuration per environment
- **Portability**: Simple deployment across different platforms

## Setup

### 1. Create Environment Files

Create `.env` files in your project root:

```bash
# .env - Default values (never commit this!)
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=xyz

# .env.example - Template for other developers
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=your-api-key-here
```

### 2. Configure nuxt.config.ts

Reference environment variables in your configuration:

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

### 3. Update .gitignore

Ensure environment files are not committed:

```bash
# .gitignore
.env
.env.*
!.env.example
```

## Environment-Specific Configuration

### Development

```bash
# .env.development
TYPESENSE_URL=http://localhost:8108
TYPESENSE_API_KEY=dev-key-xyz
TYPESENSE_ADMIN_KEY=dev-admin-key
```

### Staging

```bash
# .env.staging
TYPESENSE_URL=https://staging.typesense.example.com
TYPESENSE_API_KEY=staging-search-key
TYPESENSE_ADMIN_KEY=staging-admin-key
```

### Production

```bash
# .env.production
TYPESENSE_URL=https://xxx.a1.typesense.net
TYPESENSE_API_KEY=prod-search-only-key
TYPESENSE_ADMIN_KEY=prod-admin-key
```

## Multiple API Keys

For enhanced security, use different keys for different operations:

```bash
# .env
# Public search key (can be exposed to client)
TYPESENSE_SEARCH_KEY=search-only-key-xyz

# Admin key (server-side only)
TYPESENSE_ADMIN_KEY=admin-key-keep-secret

# Optional: Separate keys for specific collections
TYPESENSE_PRODUCTS_KEY=products-search-key
TYPESENSE_USERS_KEY=users-search-key
```

Configure in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  typesense: {
    url: process.env.TYPESENSE_URL,
    // Use search-only key by default
    apiKey: process.env.TYPESENSE_SEARCH_KEY,
  },
  
  // Make admin key available on server
  runtimeConfig: {
    typesense: {
      adminKey: process.env.TYPESENSE_ADMIN_KEY
    }
  }
})
```

Access the admin key server-side:

```typescript
// server/api/admin/collections.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const adminKey = config.typesense.adminKey
  
  // Use admin key for privileged operations
  const { collectionsApi } = useTypesenseApi()
  // ... perform admin operations
})
```

## Platform-Specific Setup

### Vercel

Add environment variables in the Vercel dashboard or use Vercel CLI:

```bash
vercel env add TYPESENSE_URL
vercel env add TYPESENSE_API_KEY
```

### Netlify

Add variables in Netlify dashboard or use `netlify.toml`:

```toml
# netlify.toml
[build.environment]
  TYPESENSE_URL = "https://xxx.a1.typesense.net"

[context.production.environment]
  TYPESENSE_API_KEY = "production-key"

[context.deploy-preview.environment]
  TYPESENSE_API_KEY = "preview-key"
```

### Docker

Pass environment variables when running the container:

```bash
docker run \
  -e TYPESENSE_URL=http://typesense:8108 \
  -e TYPESENSE_API_KEY=xyz \
  your-nuxt-app
```

Or use a `.env` file with Docker Compose:

```yaml
# docker-compose.yml
version: '3'
services:
  nuxt:
    build: .
    env_file:
      - .env
    ports:
      - "3000:3000"
```

### GitHub Actions

Add secrets in repository settings, then use in workflows:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        env:
          TYPESENSE_URL: ${{ secrets.TYPESENSE_URL }}
          TYPESENSE_API_KEY: ${{ secrets.TYPESENSE_API_KEY }}
        run: |
          npm install
          npm run build
```

## Runtime Configuration

For dynamic configuration that needs to be available at runtime:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys (server-only)
    typesense: {
      adminKey: process.env.TYPESENSE_ADMIN_KEY,
    },
    
    // Public keys (exposed to client)
    public: {
      typesense: {
        url: process.env.TYPESENSE_URL,
        searchKey: process.env.TYPESENSE_SEARCH_KEY,
      }
    }
  }
})
```

Access in your application:

```vue
<script setup lang="ts">
// Client-side
const config = useRuntimeConfig()
console.log(config.public.typesense.url)

// Server-side
const serverConfig = useRuntimeConfig()
console.log(serverConfig.typesense.adminKey) // Only available on server
</script>
```

## Best Practices

### 1. Never Commit Secrets

```bash
# ❌ Bad
typesense: {
  apiKey: 'my-secret-key'
}

# ✅ Good
typesense: {
  apiKey: process.env.TYPESENSE_API_KEY
}
```

### 2. Use Search-Only Keys in Client

```bash
# Client-side (frontend)
TYPESENSE_SEARCH_KEY=search-only-key

# Server-side (backend)
TYPESENSE_ADMIN_KEY=admin-key-with-full-access
```

### 3. Validate Required Variables

```typescript
// nuxt.config.ts
if (!process.env.TYPESENSE_URL) {
  throw new Error('TYPESENSE_URL is required')
}

if (!process.env.TYPESENSE_API_KEY) {
  throw new Error('TYPESENSE_API_KEY is required')
}

export default defineNuxtConfig({
  // ... config
})
```

### 4. Provide Examples

```bash
# .env.example
# Copy this file to .env and fill in your values

# Typesense Server URL (required)
TYPESENSE_URL=http://localhost:8108

# Typesense API Key (required)
TYPESENSE_API_KEY=your-api-key

# Admin Key (optional, for server-side operations)
TYPESENSE_ADMIN_KEY=your-admin-key
```

### 5. Use Type-Safe Access

Create a typed config helper:

```typescript
// utils/config.ts
export function getTypesenseConfig() {
  const url = process.env.TYPESENSE_URL
  const apiKey = process.env.TYPESENSE_API_KEY
  
  if (!url || !apiKey) {
    throw new Error('Missing Typesense configuration')
  }
  
  return { url, apiKey }
}
```

## Troubleshooting

### Variables Not Loading

1. Check file name (should be `.env`)
2. Restart dev server after changes
3. Verify file location (project root)
4. Check for typos in variable names

### Variables Undefined in Production

1. Ensure variables are set in hosting platform
2. Check build logs for warnings
3. Verify variables are not prefixed with `NUXT_` unless intended
4. Test with `console.log(process.env.VARIABLE_NAME)`

### Client-Side Access Issues

Public variables must be in `runtimeConfig.public`:

```typescript
runtimeConfig: {
  public: {
    typesenseUrl: process.env.TYPESENSE_URL
  }
}
```

## Next Steps

- Learn about [Module Configuration](/guide/configuration)
- Explore [Collections Management](/guide/collections)
- Check [API Reference](/api/composables)

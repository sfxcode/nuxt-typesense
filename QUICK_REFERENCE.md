# Nuxt Typesense - Quick Reference Guide

## 📖 README Structure

```
1. Features
2. Quick Setup
3. Usage ⭐ (Refactored)
   ├── Security First: Client vs Server
   ├── Client-Side Usage
   ├── Server-Side Usage
   ├── Hybrid Pattern
   └── Available API Clients
4. Configuration ⭐ (Enhanced)
   ├── Basic Configuration
   ├── Advanced Configuration
   └── Security Best Practices
5. Common Patterns ⭐ (New)
   ├── Search Page
   ├── Data Import
   ├── Server API + Client
   ├── Scoped Keys
   └── Real-Time Updates
6. Development
7. Documentation
8. Contributing
9. Resources
10. License
```

## 🔐 Security Decision Tree

```
Do you need to modify data?
│
├─ YES → Use Server-Side (API Routes)
│         - Admin API key
│         - In server/ directory
│         - defineEventHandler
│
└─ NO  → Can use Client-Side
          - Search-only API key
          - In components/pages
          - useTypesenseApi()
```

## 🎯 Quick Patterns Reference

### Pattern: Client Search
```vue
<script setup lang="ts">
const { documentsApi } = useTypesenseApi()
const query = ref('')
const { data, pending } = await useAsyncData('search', 
  () => documentsApi.multiSearch({
    searches: [{ collection: 'products', q: query.value }]
  }), 
  { watch: [query] }
)
</script>
```

### Pattern: Server Import
```typescript
// server/api/import.post.ts
export default defineEventHandler(async () => {
  const { documentsApi } = useTypesenseApi()
  const jsonl = products.map(p => JSON.stringify(p)).join('\n')
  return await documentsApi.importDocuments({
    collectionName: 'products',
    body: jsonl,
    action: 'upsert'
  })
})
```

### Pattern: Hybrid (Recommended)
```typescript
// server/api/search.get.ts
export default defineEventHandler(async (event) => {
  const { documentsApi } = useTypesenseApi()
  return await documentsApi.multiSearch({ /* ... */ })
})
```
```vue
<!-- component -->
<script setup>
const { data } = await useFetch('/api/search')
</script>
```

## 📋 Operation Checklist

### ✅ Safe for Client
- [x] Search documents (`documentsApi.multiSearch`)
- [x] Get document by ID (`documentsApi.getDocument`)
- [x] List collections (`collectionsApi.getCollections`)
- [x] Health check (`healthApi.health`)

### ❌ Server-Only
- [x] Create collections (`collectionsApi.createCollection`)
- [x] Delete collections (`collectionsApi.deleteCollection`)
- [x] Import documents (`documentsApi.importDocuments`)
- [x] Create/delete documents
- [x] Manage API keys (`keysApi.*`)
- [x] Cluster operations (`operationsApi.*`)

## 🔑 Configuration Examples

### Simple (Search Only)
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_SEARCH_KEY
  }
})
```

### Advanced (Dual Keys)
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_SEARCH_KEY  // Public
  },
  runtimeConfig: {
    typesense: {
      adminKey: process.env.TYPESENSE_ADMIN_KEY  // Private
    }
  }
})
```

## 🚀 Getting Started Paths

### Path 1: Just Search (Easiest)
1. Install module
2. Configure with search-only key
3. Use `documentsApi.multiSearch` in components
4. Done! ✅

### Path 2: Full CRUD (Production)
1. Install module
2. Configure dual keys (search + admin)
3. Create server API routes for admin operations
4. Use hybrid pattern (client → server API → Typesense)
5. Done! ✅

### Path 3: Multi-Tenant (Advanced)
1. Install module
2. Configure with admin key
3. Generate scoped keys per user
4. Implement key distribution system
5. Done! ✅

## 📚 Where to Find More

- **Detailed Guides**: `docs/guide/`
- **API Reference**: `docs/api/`
- **Examples**: `docs/examples/`
- **Run Docs**: `pnpm run docs:dev`

## ⚡ Common Tasks

### Task: Add Search to App
→ See "Pattern 1: Search Page" in README

### Task: Import Data
→ See "Pattern 2: Data Import" in README

### Task: Secure Admin Operations
→ See "Pattern 3: Server API" in README

### Task: Multi-Tenant Setup
→ See "Pattern 4: Scoped Keys" in README

### Task: Real-Time Sync
→ See "Pattern 5: Real-Time Updates" in README

---

**Pro Tip**: Always start with the Hybrid Pattern for production apps - it's the most secure and maintainable approach! 🔐

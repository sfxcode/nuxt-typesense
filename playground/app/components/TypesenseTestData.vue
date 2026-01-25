<script setup lang="ts">
import { products, books, users, collectionSchemas } from '~/utils/testData'
import type { Product, Book, User } from '~/utils/testData'

interface ResultData {
  collections?: Array<{ name: string, status: string }>
  documents?: {
    products?: { imported: number, result: unknown }
    books?: { imported: number, result: unknown }
    users?: { imported: number, result: unknown }
  }
  deleted?: string[]
  errors?: Array<{ collection: string, message: string }>
}

interface Result {
  success: boolean
  message: string
  description: string
  data?: ResultData
}

const initializing = ref(false)
const clearing = ref(false)
const result = ref<Result | null>(null)
const stats = ref<{ collections: number } | null>(null)

async function initializeTestData() {
  initializing.value = true
  result.value = null

  const results: ResultData = {
    collections: [],
    documents: {
      products: undefined,
      books: undefined,
      users: undefined,
    },
    errors: [],
  }

  try {
    // Get existing collections
    const existingCollections = await $fetch<Array<{ name: string }>>('/api/typesense/collections')
    const existingNames = new Set(existingCollections.map(c => c.name))

    // Create products collection
    if (existingNames.has('products')) {
      await $fetch('/api/typesense/collections/products', { method: 'DELETE' })
    }

    await $fetch('/api/typesense/collections', {
      method: 'POST',
      body: collectionSchemas.products,
    })
    results.collections!.push({ name: 'products', status: 'created' })

    // Import products
    try {
      const productsData = products.map((p: Product) => JSON.stringify(p)).join('\n')
      const productsImport = await $fetch('/api/typesense/documents/products/import', {
        method: 'POST',
        body: { documents: productsData, parameters: { action: 'create' } },
      })
      results.documents!.products = { imported: products.length, result: productsImport }
    }
    catch (error: unknown) {
      results.errors!.push({
        collection: 'products',
        message: `Failed to import documents: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }

    // Create books collection
    if (existingNames.has('books')) {
      await $fetch('/api/typesense/collections/books', { method: 'DELETE' })
    }

    await $fetch('/api/typesense/collections', {
      method: 'POST',
      body: collectionSchemas.books,
    })
    results.collections!.push({ name: 'books', status: 'created' })

    // Import books
    try {
      const booksData = books.map((b: Book) => JSON.stringify(b)).join('\n')
      const booksImport = await $fetch('/api/typesense/documents/books/import', {
        method: 'POST',
        body: { documents: booksData, parameters: { action: 'create' } },

      })
      results.documents!.books = { imported: books.length, result: booksImport }
    }
    catch (error: unknown) {
      results.errors!.push({
        collection: 'books',
        message: `Failed to import documents: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }

    // Create users collection
    if (existingNames.has('users')) {
      await $fetch('/api/typesense/collections/users', { method: 'DELETE' })
    }

    await $fetch('/api/typesense/collections', {
      method: 'POST',
      body: collectionSchemas.users,
    })
    results.collections!.push({ name: 'users', status: 'created' })

    // Import users
    try {
      const usersData = users.map((u: User) => JSON.stringify(u)).join('\n')
      const usersImport = await $fetch('/api/typesense/documents/users/import', {
        method: 'POST',
        body: { documents: usersData, parameters: { action: 'create' } },
      })
      results.documents!.users = { imported: users.length, result: usersImport }
    }
    catch (error: unknown) {
      results.errors!.push({
        collection: 'users',
        message: `Failed to import documents: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }

    result.value = {
      success: true,
      message: 'Test data initialized successfully',
      description: 'All test collections and documents have been created successfully.',
      data: results,
    }

    stats.value = { collections: results.collections!.length }
  }
  catch (error: unknown) {
    result.value = {
      success: false,
      message: 'Failed to initialize test data',
      description: error instanceof Error ? error.message : 'An unexpected error occurred',
      data: results,
    }
  }
  finally {
    initializing.value = false
  }
}

async function clearTestData() {
  clearing.value = true
  result.value = null

  const results: ResultData = {
    deleted: [],
    errors: [],
  }

  const collectionsToDelete = ['products', 'books', 'users']

  try {
    // Get existing collections
    const existingCollections = await $fetch<Array<{ name: string }>>('/api/typesense/collections')
    const existingNames = new Set(existingCollections.map(c => c.name))

    for (const collectionName of collectionsToDelete) {
      if (existingNames.has(collectionName)) {
        try {
          await $fetch(`/api/typesense/collections/${collectionName}`, {
            method: 'DELETE',
          })
          results.deleted!.push(collectionName)
        }
        catch (error: unknown) {
          results.errors!.push({
            collection: collectionName,
            message: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    result.value = {
      success: results.deleted!.length > 0,
      message: `Deleted ${results.deleted!.length} collections`,
      description: results.deleted!.length > 0
        ? 'All test collections have been removed.'
        : 'Some collections could not be deleted.',
      data: results,
    }

    if (results.deleted!.length > 0) {
      stats.value = null
    }
  }
  catch (error: unknown) {
    result.value = {
      success: false,
      message: 'Failed to clear test data',
      description: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
  finally {
    clearing.value = false
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">
          Test Data Manager
        </h3>
        <UBadge
          v-if="stats"
          color="primary"
          variant="subtle"
        >
          {{ stats.collections }} collections
        </UBadge>
      </div>
    </template>

    <div class="space-y-4">
      <div class="flex gap-2">
        <UButton
          color="primary"
          :loading="initializing"
          :disabled="clearing"
          @click="initializeTestData"
        >
          <template #leading>
            <Icon name="i-lucide-database" />
          </template>
          Initialize Test Data
        </UButton>

        <UButton
          color="error"
          variant="soft"
          :loading="clearing"
          :disabled="initializing"
          @click="clearTestData"
        >
          <template #leading>
            <Icon name="i-lucide-trash-2" />
          </template>
          Clear All Data
        </UButton>
      </div>

      <div
        v-if="result"
        class="space-y-2"
      >
        <UAlert
          :color="result.success ? 'success' : 'error'"
          :title="result.message"
          :description="result.description"
        />

        <div
          v-if="result.data && result.success"
          class="text-sm space-y-2"
        >
          <div class="font-semibold">
            Collections Created:
          </div>
          <ul class="list-disc list-inside space-y-1">
            <li
              v-for="col in result.data.collections"
              :key="col.name"
            >
              {{ col.name }} - {{ col.status }}
            </li>
          </ul>

          <div class="font-semibold mt-3">
            Documents Imported:
          </div>
          <ul class="list-disc list-inside space-y-1">
            <li v-if="result.data.documents?.products">
              Products: {{ result.data.documents.products.imported }} documents
            </li>
            <li v-if="result.data.documents?.books">
              Books: {{ result.data.documents.books.imported }} documents
            </li>
            <li v-if="result.data.documents?.users">
              Users: {{ result.data.documents.users.imported }} documents
            </li>
          </ul>
        </div>

        <div
          v-if="result.data?.deleted?.length"
          class="text-sm"
        >
          <div class="font-semibold">
            Collections Deleted:
          </div>
          <ul class="list-disc list-inside space-y-1">
            <li
              v-for="name in result.data.deleted"
              :key="name"
            >
              {{ name }}
            </li>
          </ul>
        </div>
      </div>

      <div class="my-4 border-t border-gray-200 dark:border-gray-700" />

      <div class="text-sm space-y-2">
        <h4 class="font-semibold">
          Test Data Includes:
        </h4>
        <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
          <li><strong>Products:</strong> 10 sample products with electronics, furniture, and sports items</li>
          <li><strong>Books:</strong> 8 sample books across various genres</li>
          <li><strong>Users:</strong> 5 sample users from different countries</li>
        </ul>
      </div>
    </div>
  </UCard>
</template>

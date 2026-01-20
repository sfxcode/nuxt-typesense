import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({

  modules: [
    '../src/module',
    '@nuxt/ui',
  ],
  ssr: true,

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
  },

})

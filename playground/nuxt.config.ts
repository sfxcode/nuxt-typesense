import { defineNuxtConfig } from 'nuxt/config'

function stripNoSideEffectsAnnotation() {
  return {
    name: 'strip-no-side-effects-annotation',
    transform(code: string, id: string) {
      if (!id.includes('/node_modules/') || !code.includes('@__NO_SIDE_EFFECTS__'))
        return null

      return {
        code: code.replace(/\/\*\s*@__NO_SIDE_EFFECTS__\s*\*\//g, ''),
        map: null,
      }
    },
  }
}

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

  debug: false,

  vite: {
    plugins: [stripNoSideEffectsAnnotation()],
  },

  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
    clientMode: false,
  },

})

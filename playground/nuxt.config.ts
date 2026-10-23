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

// The public Netlify demo is open to everyone: register only read routes and hide the route list.
// Local development keeps every route so the write demos (operations, tuning, curation) work.
const isPublicDemo = process.env.NITRO_PRESET === 'netlify' || !!process.env.NETLIFY

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

  vite: {
    plugins: [stripNoSideEffectsAnnotation()],
  },

  debug: false,

  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
    clientMode: false,
    openAPI: !isPublicDemo,
    routes: {
      readOnly: isPublicDemo,
      exclude: isPublicDemo ? ['/api/typesense/operations', '/api/typesense/metrics.json', '/api/typesense/stats.json'] : [],
    },
  },

})

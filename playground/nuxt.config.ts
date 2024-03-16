import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '../src/module',
    'nuxt-primevue',
    '@unocss/nuxt',
  ],
  typesense: {
    url: process.env.TYPESENSE_URL,
    apiKey: process.env.TYPESENSE_API_KEY,
  },
  unocss: {
    uno: true,
    attributify: true,
    preflight: false,
    icons: {
      scale: 1.2,
    },
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
  primevue: {
    config: {
      ripple: true,

    },
  },
  css: [
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primevue/resources/themes/tailwind-light/theme.css',
  ],

})

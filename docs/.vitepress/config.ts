import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nuxt Typesense',
  description: 'A Nuxt module for integrating Typesense search engine',
  base: '/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/composables' },
      { text: 'Examples', link: '/examples/basic-usage' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Nuxt Typesense?', link: '/guide/what-is-nuxt-typesense' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
        {
          text: 'Configuration',
          items: [
            { text: 'Module Options', link: '/guide/configuration' },
            { text: 'Environment Variables', link: '/guide/environment-variables' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Collections', link: '/guide/collections' },
            { text: 'Documents', link: '/guide/documents' },
            { text: 'Search', link: '/guide/search' },
            { text: 'API Keys', link: '/guide/api-keys' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Composables', link: '/api/composables' },
            { text: 'Server Routes', link: '/api/server-routes' },
            { text: 'API Clients', link: '/api/clients' },
            { text: 'Type Definitions', link: '/api/types' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/examples/basic-usage' },
            { text: 'Collection Management', link: '/examples/collection-management' },
            { text: 'Document Operations', link: '/examples/document-operations' },
            { text: 'Search Queries', link: '/examples/search-queries' },
            { text: 'Complete Component', link: '/examples/complete-component' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sfxcode/nuxt-typesense' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@sfxcode/nuxt-typesense' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present sfxcode',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/sfxcode/nuxt-typesense/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Nuxt Typesense | Typesense integration for Nuxt 3' }],
    ['meta', { property: 'og:site_name', content: 'Nuxt Typesense' }],
    ['meta', { property: 'og:url', content: 'https://nuxt-typesense.sfxcode.com/' }],
  ],
})

import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import consola from 'consola'
import defu from 'defu'
import { name, version } from '../package.json'

export interface ModuleOptions {
  url?: string
  apiKey?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: name,
    version: version,
    configKey: 'typesense',
  },
  async setup(options, nuxt) {
    if (!options.url || options.url.length === 0)
      consola.error('Missing Typesense Base Url !')
    if (!options.apiKey || options.apiKey.length === 0)
      consola.error('Missing Typesense Api Key !')

    nuxt.options.runtimeConfig.public.typesense = defu(nuxt.options.runtimeConfig.public.typesense,
      {
        url: options.url,
        apiKey: options.apiKey,
      },
    )

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')
    addImportsDir(resolve(runtimeDir, 'composables'))

    consola.info('nuxt-typesense available')
    consola.info(options.url)
  },
})

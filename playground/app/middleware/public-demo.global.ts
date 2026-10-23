// On the public demo only pages that work with the read-only key are reachable.
const publicPaths = ['/', '/search', '/collections', '/examples']

export default defineNuxtRouteMiddleware((to) => {
  if (useRuntimeConfig().public.publicDemo && !publicPaths.includes(to.path))
    return navigateTo('/', { redirectCode: 302 })
})

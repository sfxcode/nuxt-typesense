import { useRuntimeConfig } from '#app'

export const useTypesenseApiKey = () => {
  const config = useRuntimeConfig()
  return config.public.typesense?.apiKey
}

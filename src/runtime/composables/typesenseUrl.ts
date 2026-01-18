import { useRuntimeConfig } from '#app'

export const useTypesenseUrl = (): string => {
  const config = useRuntimeConfig()
  return config.public.typesense?.url
}

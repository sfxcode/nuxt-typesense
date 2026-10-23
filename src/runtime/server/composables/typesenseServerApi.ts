import { createTypesenseClients } from '../../utils/clients'

export const useTypesenseServerApi = (url: string, apiKey: string) => createTypesenseClients(url, apiKey)

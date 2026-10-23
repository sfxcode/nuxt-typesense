import { createTypesenseClients } from '../utils/clients'
import { useTypesenseUrl } from './typesenseUrl'
import { useTypesenseApiKey } from './typesenseApiKey'

export const useTypesenseApi = () => createTypesenseClients(useTypesenseUrl(), useTypesenseApiKey())

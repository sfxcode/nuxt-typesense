import {
  CollectionsApi, Configuration,
  DebugApi,
  DocumentsApi,
  HealthApi,
  KeysApi,
  OperationsApi,
} from '../api'

import {useTypesenseUrl} from "./typesenseUrl";
import {useTypesenseApiKey} from "./typesenseApiKey";

export const useTypesenseApi = () => {
  const url = useTypesenseUrl()
  const apiKey = useTypesenseApiKey()

  const configuration = new Configuration({ basePath: url, apiKey: apiKey })

  const collectionsApi = new CollectionsApi(configuration)
  const debugApi = new DebugApi(configuration)
  const documentsApi = new DocumentsApi(configuration)
  const healthApi = new HealthApi(configuration)
  const keysApi = new KeysApi(configuration)
  //const operationsApi = new OperationsApi(configuration)

  return {
    collectionsApi,
    debugApi,
    documentsApi,
    healthApi,
    keysApi,
   // operationsApi,


  }
}

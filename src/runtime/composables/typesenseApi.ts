import {
  CollectionsApi, Configuration,
  DebugApi,
  DocumentsApi,
  HealthApi,
  KeysApi,
  OperationsApi,
  OverrideApi,
  PromoteApi,
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
  const operationsApi = new OperationsApi(configuration)
  const overrideApi = new OverrideApi(configuration)
  const promoteApi = new PromoteApi(configuration)

  return {
    collectionsApi,
    debugApi,
    documentsApi,
    healthApi,
    keysApi,
    operationsApi,
    overrideApi,
    promoteApi
  }
}

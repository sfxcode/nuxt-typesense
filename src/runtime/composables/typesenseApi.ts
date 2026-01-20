import { AnalyticsApi } from '../api/apis/AnalyticsApi'
import { CollectionsApi } from '../api/apis/CollectionsApi'
import { Configuration } from '../api'
import { ConversationsApi } from '../api/apis/ConversationsApi'
import { CurationSetsApi } from '../api/apis/CurationSetsApi'
import { DebugApi } from '../api/apis/DebugApi'
import { DocumentsApi } from '../api/apis/DocumentsApi'
import { HealthApi } from '../api/apis/HealthApi'
import { KeysApi } from '../api/apis/KeysApi'
import { NlSearchModelsApi } from '../api/apis/NlSearchModelsApi'
import { OperationsApi } from '../api/apis/OperationsApi'
import { PresetsApi } from '../api/apis/PresetsApi'
import { StemmingApi } from '../api/apis/StemmingApi'
import { StopwordsApi } from '../api/apis/StopwordsApi'
import { SynonymsApi } from '../api/apis/SynonymsApi'

import { useTypesenseUrl } from './typesenseUrl'
import { useTypesenseApiKey } from './typesenseApiKey'

export const useTypesenseApi = () => {
  const url = useTypesenseUrl()
  const apiKey = useTypesenseApiKey()

  const configuration = new Configuration({ basePath: url, apiKey: apiKey })

  const analyticsApi = new AnalyticsApi(configuration)
  const collectionsApi = new CollectionsApi(configuration)
  const conversationsApi = new ConversationsApi(configuration)
  const curationSetsApi = new CurationSetsApi(configuration)
  const debugApi = new DebugApi(configuration)
  const documentsApi = new DocumentsApi(configuration)
  const healthApi = new HealthApi(configuration)
  const keysApi = new KeysApi(configuration)
  const searchModelsApi = new NlSearchModelsApi(configuration)
  const operationsApi = new OperationsApi(configuration)
  const presetsApi = new PresetsApi(configuration)
  const stemmingApi = new StemmingApi(configuration)
  const stopwordsApi = new StopwordsApi(configuration)
  const synonymsApi = new SynonymsApi(configuration)

  return {
    analyticsApi,
    collectionsApi,
    conversationsApi,
    curationSetsApi,
    debugApi,
    documentsApi,
    healthApi,
    keysApi,
    searchModelsApi,
    operationsApi,
    presetsApi,
    stemmingApi,
    stopwordsApi,
    synonymsApi,
  }
}

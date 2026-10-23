import { Configuration } from '../api'
import { AnalyticsApi } from '../api/apis/AnalyticsApi'
import { CollectionsApi } from '../api/apis/CollectionsApi'
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

/** Builds every generated Typesense API client for one connection. Shared by the server and browser composables. */
export const createTypesenseClients = (url: string, apiKey: string) => {
  const configuration = new Configuration({ basePath: url, apiKey })

  return {
    analyticsApi: new AnalyticsApi(configuration),
    collectionsApi: new CollectionsApi(configuration),
    conversationsApi: new ConversationsApi(configuration),
    curationSetsApi: new CurationSetsApi(configuration),
    debugApi: new DebugApi(configuration),
    documentsApi: new DocumentsApi(configuration),
    healthApi: new HealthApi(configuration),
    keysApi: new KeysApi(configuration),
    searchModelsApi: new NlSearchModelsApi(configuration),
    operationsApi: new OperationsApi(configuration),
    presetsApi: new PresetsApi(configuration),
    stemmingApi: new StemmingApi(configuration),
    stopwordsApi: new StopwordsApi(configuration),
    synonymsApi: new SynonymsApi(configuration),
  }
}

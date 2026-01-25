import type { SearchParameters, MultiSearchParameters, MultiSearchSearchesParameter } from '../api/models'
import { useTypesenseApi } from './typesenseApi'

export const useTypesenseDocuments = () => {
  const { documentsApi } = useTypesenseApi()

  async function searchCollection<T = object>(collectionName: string, searchParameters: SearchParameters) {
    return await documentsApi.searchCollection({
      collectionName,
      searchParameters,
    }) as Promise<T>
  }

  async function multiSearch(multiSearchParameters: MultiSearchParameters, searches?: MultiSearchSearchesParameter) {
    return await documentsApi.multiSearch({
      multiSearchParameters,
      multiSearchSearchesParameter: searches,
    })
  }

  return {
    searchCollection,
    multiSearch,
  }
}

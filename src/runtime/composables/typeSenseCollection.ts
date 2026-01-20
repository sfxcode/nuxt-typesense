import { useTypesenseApi } from './typesenseApi'
import type { TypesenseCollectionInfo } from '../model/TypesenseCollectionInfo'
import type { CollectionResponse } from '../api'

export const useTypesenseCollections = () => {
  const { collectionsApi } = useTypesenseApi()

  async function collectionInfos() {
    const data = await collectionsApi.getCollections()
    return await convertCollectionData(data)
  }

  async function convertCollectionData(data: Array<CollectionResponse>) {
    return data.map((response) => {
      const fields = response.fields.map(f => f.name)
      const collection = {
        name: response.name,
        fields: fields,
        defaultSortingField: response.defaultSortingField,
        numDocuments: response.numDocuments,
        date: new Date(response.createdAt * 1000),
      } as TypesenseCollectionInfo
      return collection
    })
  }

  return { collectionInfos }
}

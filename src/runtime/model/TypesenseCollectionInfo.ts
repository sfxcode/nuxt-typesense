export interface TypesenseCollectionInfo {

  readonly name: string

  readonly defaultSortingField?: string

  readonly fields: Array<string>

  readonly date: Date
}

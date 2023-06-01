import {Field} from "../api";

export interface TypesenseCollectionInfo {

  readonly name: string;

  readonly defaultSortingField?: string;

  readonly fields: Array<String>;

  readonly date: Date;
}

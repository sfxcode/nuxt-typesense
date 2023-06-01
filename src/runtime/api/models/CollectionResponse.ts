/* tslint:disable */
/* eslint-disable */
/**
 * Typesense API
 * An open source search engine for building delightful search experiences.
 *
 * The version of the OpenAPI document: 0.24.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Field } from './Field';
import {
    FieldFromJSON,
    FieldFromJSONTyped,
    FieldToJSON,
} from './Field';

/**
 * 
 * @export
 * @interface CollectionResponse
 */
export interface CollectionResponse {
    /**
     * Name of the collection
     * @type {string}
     * @memberof CollectionResponse
     */
    name: string;
    /**
     * A list of fields for querying, filtering and faceting
     * @type {Array<Field>}
     * @memberof CollectionResponse
     */
    fields: Array<Field>;
    /**
     * The name of an int32 / float field that determines the order in which the search results are ranked when a sort_by clause is not provided during searching. This field must indicate some kind of popularity.
     * @type {string}
     * @memberof CollectionResponse
     */
    defaultSortingField?: string;
    /**
     * List of symbols or special characters to be used for  splitting the text into individual words in addition to space and new-line characters.
     * @type {Array<string>}
     * @memberof CollectionResponse
     */
    tokenSeparators?: Array<string>;
    /**
     * Enables experimental support at a collection level for nested object or object array fields. This field is only available if the Typesense server is version `0.24.0.rcn34` or later.
     * @type {boolean}
     * @memberof CollectionResponse
     */
    enableNestedFields?: boolean;
    /**
     * List of symbols or special characters to be indexed.
     * @type {Array<string>}
     * @memberof CollectionResponse
     */
    symbolsToIndex?: Array<string>;
    /**
     * Number of documents in the collection
     * @type {number}
     * @memberof CollectionResponse
     */
    readonly numDocuments: number;
    /**
     * Timestamp of when the collection was created
     * @type {number}
     * @memberof CollectionResponse
     */
    readonly createdAt: number;
}

/**
 * Check if a given object implements the CollectionResponse interface.
 */
export function instanceOfCollectionResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "fields" in value;
    isInstance = isInstance && "numDocuments" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function CollectionResponseFromJSON(json: any): CollectionResponse {
    return CollectionResponseFromJSONTyped(json, false);
}

export function CollectionResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CollectionResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'fields': ((json['fields'] as Array<any>).map(FieldFromJSON)),
        'defaultSortingField': !exists(json, 'default_sorting_field') ? undefined : json['default_sorting_field'],
        'tokenSeparators': !exists(json, 'token_separators') ? undefined : json['token_separators'],
        'enableNestedFields': !exists(json, 'enable_nested_fields') ? undefined : json['enable_nested_fields'],
        'symbolsToIndex': !exists(json, 'symbols_to_index') ? undefined : json['symbols_to_index'],
        'numDocuments': json['num_documents'],
        'createdAt': json['created_at'],
    };
}

export function CollectionResponseToJSON(value?: CollectionResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'fields': ((value.fields as Array<any>).map(FieldToJSON)),
        'default_sorting_field': value.defaultSortingField,
        'token_separators': value.tokenSeparators,
        'enable_nested_fields': value.enableNestedFields,
        'symbols_to_index': value.symbolsToIndex,
    };
}


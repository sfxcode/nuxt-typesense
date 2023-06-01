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
/**
 * 
 * @export
 * @interface SearchHighlight
 */
export interface SearchHighlight {
    /**
     * 
     * @type {string}
     * @memberof SearchHighlight
     */
    field?: string;
    /**
     * Present only for (non-array) string fields
     * @type {string}
     * @memberof SearchHighlight
     */
    snippet?: string;
    /**
     * Present only for (array) string[] fields
     * @type {Array<string>}
     * @memberof SearchHighlight
     */
    snippets?: Array<string>;
    /**
     * Full field value with highlighting, present only for (non-array) string fields
     * @type {string}
     * @memberof SearchHighlight
     */
    value?: string;
    /**
     * Full field value with highlighting, present only for (array) string[] fields
     * @type {Array<string>}
     * @memberof SearchHighlight
     */
    values?: Array<string>;
    /**
     * The indices property will be present only for string[] fields and will contain the corresponding indices of the snippets in the search field
     * @type {Array<number>}
     * @memberof SearchHighlight
     */
    indices?: Array<number>;
    /**
     * 
     * @type {Array<object>}
     * @memberof SearchHighlight
     */
    matchedTokens?: Array<object>;
}

/**
 * Check if a given object implements the SearchHighlight interface.
 */
export function instanceOfSearchHighlight(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SearchHighlightFromJSON(json: any): SearchHighlight {
    return SearchHighlightFromJSONTyped(json, false);
}

export function SearchHighlightFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchHighlight {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'field': !exists(json, 'field') ? undefined : json['field'],
        'snippet': !exists(json, 'snippet') ? undefined : json['snippet'],
        'snippets': !exists(json, 'snippets') ? undefined : json['snippets'],
        'value': !exists(json, 'value') ? undefined : json['value'],
        'values': !exists(json, 'values') ? undefined : json['values'],
        'indices': !exists(json, 'indices') ? undefined : json['indices'],
        'matchedTokens': !exists(json, 'matched_tokens') ? undefined : json['matched_tokens'],
    };
}

export function SearchHighlightToJSON(value?: SearchHighlight | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'field': value.field,
        'snippet': value.snippet,
        'snippets': value.snippets,
        'value': value.value,
        'values': value.values,
        'indices': value.indices,
        'matched_tokens': value.matchedTokens,
    };
}


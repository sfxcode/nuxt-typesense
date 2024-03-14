/* tslint:disable */
/* eslint-disable */
/**
 * Typesense API
 * An open source search engine for building delightful search experiences.
 *
 * The version of the OpenAPI document: 0.25.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { SearchOverrideExclude } from './SearchOverrideExclude';
import {
    SearchOverrideExcludeFromJSON,
    SearchOverrideExcludeFromJSONTyped,
    SearchOverrideExcludeToJSON,
} from './SearchOverrideExclude';
import type { SearchOverrideInclude } from './SearchOverrideInclude';
import {
    SearchOverrideIncludeFromJSON,
    SearchOverrideIncludeFromJSONTyped,
    SearchOverrideIncludeToJSON,
} from './SearchOverrideInclude';
import type { SearchOverrideRule } from './SearchOverrideRule';
import {
    SearchOverrideRuleFromJSON,
    SearchOverrideRuleFromJSONTyped,
    SearchOverrideRuleToJSON,
} from './SearchOverrideRule';

/**
 * 
 * @export
 * @interface SearchOverrideSchema
 */
export interface SearchOverrideSchema {
    /**
     * 
     * @type {SearchOverrideRule}
     * @memberof SearchOverrideSchema
     */
    rule: SearchOverrideRule;
    /**
     * List of document `id`s that should be included in the search results with their corresponding `position`s.
     * @type {Array<SearchOverrideInclude>}
     * @memberof SearchOverrideSchema
     */
    includes?: Array<SearchOverrideInclude>;
    /**
     * List of document `id`s that should be excluded from the search results.
     * @type {Array<SearchOverrideExclude>}
     * @memberof SearchOverrideSchema
     */
    excludes?: Array<SearchOverrideExclude>;
    /**
     * A filter by clause that is applied to any search query that matches the override rule.
     * @type {string}
     * @memberof SearchOverrideSchema
     */
    filterBy?: string;
    /**
     * Indicates whether search query tokens that exist in the override's rule should be removed from the search query.
     * @type {boolean}
     * @memberof SearchOverrideSchema
     */
    removeMatchedTokens?: boolean;
}

/**
 * Check if a given object implements the SearchOverrideSchema interface.
 */
export function instanceOfSearchOverrideSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "rule" in value;

    return isInstance;
}

export function SearchOverrideSchemaFromJSON(json: any): SearchOverrideSchema {
    return SearchOverrideSchemaFromJSONTyped(json, false);
}

export function SearchOverrideSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchOverrideSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'rule': SearchOverrideRuleFromJSON(json['rule']),
        'includes': !exists(json, 'includes') ? undefined : ((json['includes'] as Array<any>).map(SearchOverrideIncludeFromJSON)),
        'excludes': !exists(json, 'excludes') ? undefined : ((json['excludes'] as Array<any>).map(SearchOverrideExcludeFromJSON)),
        'filterBy': !exists(json, 'filter_by') ? undefined : json['filter_by'],
        'removeMatchedTokens': !exists(json, 'remove_matched_tokens') ? undefined : json['remove_matched_tokens'],
    };
}

export function SearchOverrideSchemaToJSON(value?: SearchOverrideSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'rule': SearchOverrideRuleToJSON(value.rule),
        'includes': value.includes === undefined ? undefined : ((value.includes as Array<any>).map(SearchOverrideIncludeToJSON)),
        'excludes': value.excludes === undefined ? undefined : ((value.excludes as Array<any>).map(SearchOverrideExcludeToJSON)),
        'filter_by': value.filterBy,
        'remove_matched_tokens': value.removeMatchedTokens,
    };
}


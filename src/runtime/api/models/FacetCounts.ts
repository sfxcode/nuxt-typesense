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
import type { FacetCountsCountsInner } from './FacetCountsCountsInner';
import {
    FacetCountsCountsInnerFromJSON,
    FacetCountsCountsInnerFromJSONTyped,
    FacetCountsCountsInnerToJSON,
} from './FacetCountsCountsInner';
import type { FacetCountsStats } from './FacetCountsStats';
import {
    FacetCountsStatsFromJSON,
    FacetCountsStatsFromJSONTyped,
    FacetCountsStatsToJSON,
} from './FacetCountsStats';

/**
 * 
 * @export
 * @interface FacetCounts
 */
export interface FacetCounts {
    /**
     * 
     * @type {Array<FacetCountsCountsInner>}
     * @memberof FacetCounts
     */
    counts?: Array<FacetCountsCountsInner>;
    /**
     * 
     * @type {string}
     * @memberof FacetCounts
     */
    fieldName?: string;
    /**
     * 
     * @type {FacetCountsStats}
     * @memberof FacetCounts
     */
    stats?: FacetCountsStats;
}

/**
 * Check if a given object implements the FacetCounts interface.
 */
export function instanceOfFacetCounts(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FacetCountsFromJSON(json: any): FacetCounts {
    return FacetCountsFromJSONTyped(json, false);
}

export function FacetCountsFromJSONTyped(json: any, ignoreDiscriminator: boolean): FacetCounts {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'counts': !exists(json, 'counts') ? undefined : ((json['counts'] as Array<any>).map(FacetCountsCountsInnerFromJSON)),
        'fieldName': !exists(json, 'field_name') ? undefined : json['field_name'],
        'stats': !exists(json, 'stats') ? undefined : FacetCountsStatsFromJSON(json['stats']),
    };
}

export function FacetCountsToJSON(value?: FacetCounts | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'counts': value.counts === undefined ? undefined : ((value.counts as Array<any>).map(FacetCountsCountsInnerToJSON)),
        'field_name': value.fieldName,
        'stats': FacetCountsStatsToJSON(value.stats),
    };
}

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
/**
 * 
 * @export
 * @interface FacetCountsStats
 */
export interface FacetCountsStats {
    /**
     * 
     * @type {number}
     * @memberof FacetCountsStats
     */
    max?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetCountsStats
     */
    min?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetCountsStats
     */
    sum?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetCountsStats
     */
    totalValues?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetCountsStats
     */
    avg?: number;
}

/**
 * Check if a given object implements the FacetCountsStats interface.
 */
export function instanceOfFacetCountsStats(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FacetCountsStatsFromJSON(json: any): FacetCountsStats {
    return FacetCountsStatsFromJSONTyped(json, false);
}

export function FacetCountsStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): FacetCountsStats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'max': !exists(json, 'max') ? undefined : json['max'],
        'min': !exists(json, 'min') ? undefined : json['min'],
        'sum': !exists(json, 'sum') ? undefined : json['sum'],
        'totalValues': !exists(json, 'total_values') ? undefined : json['total_values'],
        'avg': !exists(json, 'avg') ? undefined : json['avg'],
    };
}

export function FacetCountsStatsToJSON(value?: FacetCountsStats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'max': value.max,
        'min': value.min,
        'sum': value.sum,
        'total_values': value.totalValues,
        'avg': value.avg,
    };
}


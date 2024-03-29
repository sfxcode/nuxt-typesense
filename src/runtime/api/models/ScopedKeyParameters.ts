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
 * @interface ScopedKeyParameters
 */
export interface ScopedKeyParameters {
    /**
     * 
     * @type {string}
     * @memberof ScopedKeyParameters
     */
    filterBy?: string;
    /**
     * 
     * @type {number}
     * @memberof ScopedKeyParameters
     */
    expiresAt?: number;
}

/**
 * Check if a given object implements the ScopedKeyParameters interface.
 */
export function instanceOfScopedKeyParameters(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ScopedKeyParametersFromJSON(json: any): ScopedKeyParameters {
    return ScopedKeyParametersFromJSONTyped(json, false);
}

export function ScopedKeyParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScopedKeyParameters {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'filterBy': !exists(json, 'filter_by') ? undefined : json['filter_by'],
        'expiresAt': !exists(json, 'expires_at') ? undefined : json['expires_at'],
    };
}

export function ScopedKeyParametersToJSON(value?: ScopedKeyParameters | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'filter_by': value.filterBy,
        'expires_at': value.expiresAt,
    };
}


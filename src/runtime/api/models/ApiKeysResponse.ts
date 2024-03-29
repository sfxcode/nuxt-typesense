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
import type { ApiKey } from './ApiKey';
import {
    ApiKeyFromJSON,
    ApiKeyFromJSONTyped,
    ApiKeyToJSON,
} from './ApiKey';

/**
 * 
 * @export
 * @interface ApiKeysResponse
 */
export interface ApiKeysResponse {
    /**
     * 
     * @type {Array<ApiKey>}
     * @memberof ApiKeysResponse
     */
    keys: Array<ApiKey>;
}

/**
 * Check if a given object implements the ApiKeysResponse interface.
 */
export function instanceOfApiKeysResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "keys" in value;

    return isInstance;
}

export function ApiKeysResponseFromJSON(json: any): ApiKeysResponse {
    return ApiKeysResponseFromJSONTyped(json, false);
}

export function ApiKeysResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiKeysResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'keys': ((json['keys'] as Array<any>).map(ApiKeyFromJSON)),
    };
}

export function ApiKeysResponseToJSON(value?: ApiKeysResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'keys': ((value.keys as Array<any>).map(ApiKeyToJSON)),
    };
}


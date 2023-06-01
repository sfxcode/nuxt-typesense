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
 * @interface UpdateDocuments200Response
 */
export interface UpdateDocuments200Response {
    /**
     * The number of documents that have been updated
     * @type {number}
     * @memberof UpdateDocuments200Response
     */
    numUpdated: number;
}

/**
 * Check if a given object implements the UpdateDocuments200Response interface.
 */
export function instanceOfUpdateDocuments200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "numUpdated" in value;

    return isInstance;
}

export function UpdateDocuments200ResponseFromJSON(json: any): UpdateDocuments200Response {
    return UpdateDocuments200ResponseFromJSONTyped(json, false);
}

export function UpdateDocuments200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateDocuments200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'numUpdated': json['num_updated'],
    };
}

export function UpdateDocuments200ResponseToJSON(value?: UpdateDocuments200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'num_updated': value.numUpdated,
    };
}


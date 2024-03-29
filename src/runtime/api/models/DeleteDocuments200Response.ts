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
 * @interface DeleteDocuments200Response
 */
export interface DeleteDocuments200Response {
    /**
     * 
     * @type {number}
     * @memberof DeleteDocuments200Response
     */
    numDeleted: number;
}

/**
 * Check if a given object implements the DeleteDocuments200Response interface.
 */
export function instanceOfDeleteDocuments200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "numDeleted" in value;

    return isInstance;
}

export function DeleteDocuments200ResponseFromJSON(json: any): DeleteDocuments200Response {
    return DeleteDocuments200ResponseFromJSONTyped(json, false);
}

export function DeleteDocuments200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeleteDocuments200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'numDeleted': json['num_deleted'],
    };
}

export function DeleteDocuments200ResponseToJSON(value?: DeleteDocuments200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'num_deleted': value.numDeleted,
    };
}


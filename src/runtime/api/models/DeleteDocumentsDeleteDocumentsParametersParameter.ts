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
 * @interface DeleteDocumentsDeleteDocumentsParametersParameter
 */
export interface DeleteDocumentsDeleteDocumentsParametersParameter {
    /**
     * 
     * @type {string}
     * @memberof DeleteDocumentsDeleteDocumentsParametersParameter
     */
    filterBy?: string;
    /**
     * Batch size parameter controls the number of documents that should be deleted at a time. A larger value will speed up deletions, but will impact performance of other operations running on the server.
     * @type {number}
     * @memberof DeleteDocumentsDeleteDocumentsParametersParameter
     */
    batchSize?: number;
}

/**
 * Check if a given object implements the DeleteDocumentsDeleteDocumentsParametersParameter interface.
 */
export function instanceOfDeleteDocumentsDeleteDocumentsParametersParameter(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DeleteDocumentsDeleteDocumentsParametersParameterFromJSON(json: any): DeleteDocumentsDeleteDocumentsParametersParameter {
    return DeleteDocumentsDeleteDocumentsParametersParameterFromJSONTyped(json, false);
}

export function DeleteDocumentsDeleteDocumentsParametersParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeleteDocumentsDeleteDocumentsParametersParameter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'filterBy': !exists(json, 'filter_by') ? undefined : json['filter_by'],
        'batchSize': !exists(json, 'batch_size') ? undefined : json['batch_size'],
    };
}

export function DeleteDocumentsDeleteDocumentsParametersParameterToJSON(value?: DeleteDocumentsDeleteDocumentsParametersParameter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'filter_by': value.filterBy,
        'batch_size': value.batchSize,
    };
}


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
 * @interface UpdateDocumentsUpdateDocumentsParametersParameter
 */
export interface UpdateDocumentsUpdateDocumentsParametersParameter {
    /**
     * 
     * @type {string}
     * @memberof UpdateDocumentsUpdateDocumentsParametersParameter
     */
    filterBy?: string;
}

/**
 * Check if a given object implements the UpdateDocumentsUpdateDocumentsParametersParameter interface.
 */
export function instanceOfUpdateDocumentsUpdateDocumentsParametersParameter(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateDocumentsUpdateDocumentsParametersParameterFromJSON(json: any): UpdateDocumentsUpdateDocumentsParametersParameter {
    return UpdateDocumentsUpdateDocumentsParametersParameterFromJSONTyped(json, false);
}

export function UpdateDocumentsUpdateDocumentsParametersParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateDocumentsUpdateDocumentsParametersParameter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'filterBy': !exists(json, 'filter_by') ? undefined : json['filter_by'],
    };
}

export function UpdateDocumentsUpdateDocumentsParametersParameterToJSON(value?: UpdateDocumentsUpdateDocumentsParametersParameter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'filter_by': value.filterBy,
    };
}

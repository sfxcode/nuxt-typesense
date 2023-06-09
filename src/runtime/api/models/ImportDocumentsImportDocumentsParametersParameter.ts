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
 * @interface ImportDocumentsImportDocumentsParametersParameter
 */
export interface ImportDocumentsImportDocumentsParametersParameter {
    /**
     * 
     * @type {string}
     * @memberof ImportDocumentsImportDocumentsParametersParameter
     */
    action?: string;
    /**
     * 
     * @type {number}
     * @memberof ImportDocumentsImportDocumentsParametersParameter
     */
    batchSize?: number;
    /**
     * 
     * @type {string}
     * @memberof ImportDocumentsImportDocumentsParametersParameter
     */
    dirtyValues?: ImportDocumentsImportDocumentsParametersParameterDirtyValuesEnum;
}


/**
 * @export
 */
export const ImportDocumentsImportDocumentsParametersParameterDirtyValuesEnum = {
    CoerceOrReject: 'coerce_or_reject',
    CoerceOrDrop: 'coerce_or_drop',
    Drop: 'drop',
    Reject: 'reject'
} as const;
export type ImportDocumentsImportDocumentsParametersParameterDirtyValuesEnum = typeof ImportDocumentsImportDocumentsParametersParameterDirtyValuesEnum[keyof typeof ImportDocumentsImportDocumentsParametersParameterDirtyValuesEnum];


/**
 * Check if a given object implements the ImportDocumentsImportDocumentsParametersParameter interface.
 */
export function instanceOfImportDocumentsImportDocumentsParametersParameter(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ImportDocumentsImportDocumentsParametersParameterFromJSON(json: any): ImportDocumentsImportDocumentsParametersParameter {
    return ImportDocumentsImportDocumentsParametersParameterFromJSONTyped(json, false);
}

export function ImportDocumentsImportDocumentsParametersParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): ImportDocumentsImportDocumentsParametersParameter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'action': !exists(json, 'action') ? undefined : json['action'],
        'batchSize': !exists(json, 'batch_size') ? undefined : json['batch_size'],
        'dirtyValues': !exists(json, 'dirty_values') ? undefined : json['dirty_values'],
    };
}

export function ImportDocumentsImportDocumentsParametersParameterToJSON(value?: ImportDocumentsImportDocumentsParametersParameter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'action': value.action,
        'batch_size': value.batchSize,
        'dirty_values': value.dirtyValues,
    };
}


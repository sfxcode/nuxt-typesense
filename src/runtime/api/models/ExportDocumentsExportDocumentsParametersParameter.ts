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
 * @interface ExportDocumentsExportDocumentsParametersParameter
 */
export interface ExportDocumentsExportDocumentsParametersParameter {
    /**
     * Filter conditions for refining your search results. Separate multiple conditions with &&.
     * @type {string}
     * @memberof ExportDocumentsExportDocumentsParametersParameter
     */
    filterBy?: string;
    /**
     * List of fields from the document to include in the search result
     * @type {string}
     * @memberof ExportDocumentsExportDocumentsParametersParameter
     */
    includeFields: string;
    /**
     * List of fields from the document to exclude in the search result
     * @type {string}
     * @memberof ExportDocumentsExportDocumentsParametersParameter
     */
    excludeFields: string;
}

/**
 * Check if a given object implements the ExportDocumentsExportDocumentsParametersParameter interface.
 */
export function instanceOfExportDocumentsExportDocumentsParametersParameter(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "includeFields" in value;
    isInstance = isInstance && "excludeFields" in value;

    return isInstance;
}

export function ExportDocumentsExportDocumentsParametersParameterFromJSON(json: any): ExportDocumentsExportDocumentsParametersParameter {
    return ExportDocumentsExportDocumentsParametersParameterFromJSONTyped(json, false);
}

export function ExportDocumentsExportDocumentsParametersParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExportDocumentsExportDocumentsParametersParameter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'filterBy': !exists(json, 'filter_by') ? undefined : json['filter_by'],
        'includeFields': json['include_fields'],
        'excludeFields': json['exclude_fields'],
    };
}

export function ExportDocumentsExportDocumentsParametersParameterToJSON(value?: ExportDocumentsExportDocumentsParametersParameter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'filter_by': value.filterBy,
        'include_fields': value.includeFields,
        'exclude_fields': value.excludeFields,
    };
}


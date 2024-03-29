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
import type { AnalyticsRuleSchema } from './AnalyticsRuleSchema';
import {
    AnalyticsRuleSchemaFromJSON,
    AnalyticsRuleSchemaFromJSONTyped,
    AnalyticsRuleSchemaToJSON,
} from './AnalyticsRuleSchema';

/**
 * 
 * @export
 * @interface AnalyticsRulesRetrieveSchema
 */
export interface AnalyticsRulesRetrieveSchema {
    /**
     * 
     * @type {Array<AnalyticsRuleSchema>}
     * @memberof AnalyticsRulesRetrieveSchema
     */
    rules?: Array<AnalyticsRuleSchema>;
}

/**
 * Check if a given object implements the AnalyticsRulesRetrieveSchema interface.
 */
export function instanceOfAnalyticsRulesRetrieveSchema(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AnalyticsRulesRetrieveSchemaFromJSON(json: any): AnalyticsRulesRetrieveSchema {
    return AnalyticsRulesRetrieveSchemaFromJSONTyped(json, false);
}

export function AnalyticsRulesRetrieveSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnalyticsRulesRetrieveSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'rules': !exists(json, 'rules') ? undefined : ((json['rules'] as Array<any>).map(AnalyticsRuleSchemaFromJSON)),
    };
}

export function AnalyticsRulesRetrieveSchemaToJSON(value?: AnalyticsRulesRetrieveSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'rules': value.rules === undefined ? undefined : ((value.rules as Array<any>).map(AnalyticsRuleSchemaToJSON)),
    };
}


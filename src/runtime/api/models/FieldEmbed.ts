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
import type { FieldEmbedModelConfig } from './FieldEmbedModelConfig';
import {
    FieldEmbedModelConfigFromJSON,
    FieldEmbedModelConfigFromJSONTyped,
    FieldEmbedModelConfigToJSON,
} from './FieldEmbedModelConfig';

/**
 * 
 * @export
 * @interface FieldEmbed
 */
export interface FieldEmbed {
    /**
     * 
     * @type {Array<string>}
     * @memberof FieldEmbed
     */
    from: Array<string>;
    /**
     * 
     * @type {FieldEmbedModelConfig}
     * @memberof FieldEmbed
     */
    modelConfig: FieldEmbedModelConfig;
}

/**
 * Check if a given object implements the FieldEmbed interface.
 */
export function instanceOfFieldEmbed(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "from" in value;
    isInstance = isInstance && "modelConfig" in value;

    return isInstance;
}

export function FieldEmbedFromJSON(json: any): FieldEmbed {
    return FieldEmbedFromJSONTyped(json, false);
}

export function FieldEmbedFromJSONTyped(json: any, ignoreDiscriminator: boolean): FieldEmbed {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'from': json['from'],
        'modelConfig': FieldEmbedModelConfigFromJSON(json['model_config']),
    };
}

export function FieldEmbedToJSON(value?: FieldEmbed | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'from': value.from,
        'model_config': FieldEmbedModelConfigToJSON(value.modelConfig),
    };
}


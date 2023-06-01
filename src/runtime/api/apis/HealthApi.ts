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


import * as runtime from '../runtime';
import type {
  HealthStatus,
} from '../models';
import {
    HealthStatusFromJSON,
    HealthStatusToJSON,
} from '../models';

/**
 * 
 */
export class HealthApi extends runtime.BaseAPI {

    /**
     * Checks if Typesense server is ready to accept requests.
     * Checks if Typesense server is ready to accept requests.
     */
    async healthRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HealthStatus>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-TYPESENSE-API-KEY"] = this.configuration.apiKey("X-TYPESENSE-API-KEY"); // api_key_header authentication
        }

        const response = await this.request({
            path: `/health`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HealthStatusFromJSON(jsonValue));
    }

    /**
     * Checks if Typesense server is ready to accept requests.
     * Checks if Typesense server is ready to accept requests.
     */
    async health(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HealthStatus> {
        const response = await this.healthRaw(initOverrides);
        return await response.value();
    }

}

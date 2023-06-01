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
  ApiKey,
  ApiKeySchema,
  ApiKeysResponse,
  ModelApiResponse,
} from '../models';
import {
    ApiKeyFromJSON,
    ApiKeyToJSON,
    ApiKeySchemaFromJSON,
    ApiKeySchemaToJSON,
    ApiKeysResponseFromJSON,
    ApiKeysResponseToJSON,
    ModelApiResponseFromJSON,
    ModelApiResponseToJSON,
} from '../models';

export interface CreateKeyRequest {
    apiKeySchema?: ApiKeySchema;
}

export interface DeleteKeyRequest {
    keyId: number;
}

export interface GetKeyRequest {
    keyId: number;
}

/**
 * 
 */
export class KeysApi extends runtime.BaseAPI {

    /**
     * Create an API Key with fine-grain access control. You can restrict access on both a per-collection and per-action level. The generated key is returned only during creation. You want to store this key carefully in a secure place.
     * Create an API Key
     */
    async createKeyRaw(requestParameters: CreateKeyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiKey>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-TYPESENSE-API-KEY"] = this.configuration.apiKey("X-TYPESENSE-API-KEY"); // api_key_header authentication
        }

        const response = await this.request({
            path: `/keys`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ApiKeySchemaToJSON(requestParameters.apiKeySchema),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiKeyFromJSON(jsonValue));
    }

    /**
     * Create an API Key with fine-grain access control. You can restrict access on both a per-collection and per-action level. The generated key is returned only during creation. You want to store this key carefully in a secure place.
     * Create an API Key
     */
    async createKey(requestParameters: CreateKeyRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiKey> {
        const response = await this.createKeyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete an API key given its ID.
     */
    async deleteKeyRaw(requestParameters: DeleteKeyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiKey>> {
        if (requestParameters.keyId === null || requestParameters.keyId === undefined) {
            throw new runtime.RequiredError('keyId','Required parameter requestParameters.keyId was null or undefined when calling deleteKey.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-TYPESENSE-API-KEY"] = this.configuration.apiKey("X-TYPESENSE-API-KEY"); // api_key_header authentication
        }

        const response = await this.request({
            path: `/keys/{keyId}`.replace(`{${"keyId"}}`, encodeURIComponent(String(requestParameters.keyId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiKeyFromJSON(jsonValue));
    }

    /**
     * Delete an API key given its ID.
     */
    async deleteKey(requestParameters: DeleteKeyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiKey> {
        const response = await this.deleteKeyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve (metadata about) a key. Only the key prefix is returned when you retrieve a key. Due to security reasons, only the create endpoint returns the full API key.
     * Retrieve (metadata about) a key
     */
    async getKeyRaw(requestParameters: GetKeyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiKey>> {
        if (requestParameters.keyId === null || requestParameters.keyId === undefined) {
            throw new runtime.RequiredError('keyId','Required parameter requestParameters.keyId was null or undefined when calling getKey.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-TYPESENSE-API-KEY"] = this.configuration.apiKey("X-TYPESENSE-API-KEY"); // api_key_header authentication
        }

        const response = await this.request({
            path: `/keys/{keyId}`.replace(`{${"keyId"}}`, encodeURIComponent(String(requestParameters.keyId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiKeyFromJSON(jsonValue));
    }

    /**
     * Retrieve (metadata about) a key. Only the key prefix is returned when you retrieve a key. Due to security reasons, only the create endpoint returns the full API key.
     * Retrieve (metadata about) a key
     */
    async getKey(requestParameters: GetKeyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiKey> {
        const response = await this.getKeyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve (metadata about) all keys.
     */
    async getKeysRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiKeysResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-TYPESENSE-API-KEY"] = this.configuration.apiKey("X-TYPESENSE-API-KEY"); // api_key_header authentication
        }

        const response = await this.request({
            path: `/keys`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiKeysResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve (metadata about) all keys.
     */
    async getKeys(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiKeysResponse> {
        const response = await this.getKeysRaw(initOverrides);
        return await response.value();
    }

}

# NlSearchModelsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createNLSearchModel**](NlSearchModelsApi.md#createnlsearchmodel) | **POST** /nl_search_models | Create a NL search model |
| [**deleteNLSearchModel**](NlSearchModelsApi.md#deletenlsearchmodel) | **DELETE** /nl_search_models/{modelId} | Delete a NL search model |
| [**retrieveAllNLSearchModels**](NlSearchModelsApi.md#retrieveallnlsearchmodels) | **GET** /nl_search_models | List all NL search models |
| [**retrieveNLSearchModel**](NlSearchModelsApi.md#retrievenlsearchmodel) | **GET** /nl_search_models/{modelId} | Retrieve a NL search model |
| [**updateNLSearchModel**](NlSearchModelsApi.md#updatenlsearchmodel) | **PUT** /nl_search_models/{modelId} | Update a NL search model |



## createNLSearchModel

> NLSearchModelSchema createNLSearchModel(nLSearchModelCreateSchema)

Create a NL search model

Create a new NL search model.

### Example

```ts
import {
  Configuration,
  NlSearchModelsApi,
} from '';
import type { CreateNLSearchModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new NlSearchModelsApi(config);

  const body = {
    // NLSearchModelCreateSchema | The NL search model to be created
    nLSearchModelCreateSchema: ...,
  } satisfies CreateNLSearchModelRequest;

  try {
    const data = await api.createNLSearchModel(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **nLSearchModelCreateSchema** | [NLSearchModelCreateSchema](NLSearchModelCreateSchema.md) | The NL search model to be created | |

### Return type

[**NLSearchModelSchema**](NLSearchModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | NL search model successfully created |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteNLSearchModel

> NLSearchModelDeleteSchema deleteNLSearchModel(modelId)

Delete a NL search model

Delete a specific NL search model by its ID.

### Example

```ts
import {
  Configuration,
  NlSearchModelsApi,
} from '';
import type { DeleteNLSearchModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new NlSearchModelsApi(config);

  const body = {
    // string | The ID of the NL search model to delete
    modelId: modelId_example,
  } satisfies DeleteNLSearchModelRequest;

  try {
    const data = await api.deleteNLSearchModel(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **modelId** | `string` | The ID of the NL search model to delete | [Defaults to `undefined`] |

### Return type

[**NLSearchModelDeleteSchema**](NLSearchModelDeleteSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | NL search model successfully deleted |  -  |
| **404** | NL search model not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveAllNLSearchModels

> Array&lt;NLSearchModelSchema&gt; retrieveAllNLSearchModels()

List all NL search models

Retrieve all NL search models.

### Example

```ts
import {
  Configuration,
  NlSearchModelsApi,
} from '';
import type { RetrieveAllNLSearchModelsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new NlSearchModelsApi(config);

  try {
    const data = await api.retrieveAllNLSearchModels();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;NLSearchModelSchema&gt;**](NLSearchModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all NL search models |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveNLSearchModel

> NLSearchModelSchema retrieveNLSearchModel(modelId)

Retrieve a NL search model

Retrieve a specific NL search model by its ID.

### Example

```ts
import {
  Configuration,
  NlSearchModelsApi,
} from '';
import type { RetrieveNLSearchModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new NlSearchModelsApi(config);

  const body = {
    // string | The ID of the NL search model to retrieve
    modelId: modelId_example,
  } satisfies RetrieveNLSearchModelRequest;

  try {
    const data = await api.retrieveNLSearchModel(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **modelId** | `string` | The ID of the NL search model to retrieve | [Defaults to `undefined`] |

### Return type

[**NLSearchModelSchema**](NLSearchModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | NL search model fetched |  -  |
| **404** | NL search model not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateNLSearchModel

> NLSearchModelSchema updateNLSearchModel(modelId, body)

Update a NL search model

Update an existing NL search model.

### Example

```ts
import {
  Configuration,
  NlSearchModelsApi,
} from '';
import type { UpdateNLSearchModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new NlSearchModelsApi(config);

  const body = {
    // string | The ID of the NL search model to update
    modelId: modelId_example,
    // NLSearchModelCreateSchema | The NL search model fields to update
    body: ...,
  } satisfies UpdateNLSearchModelRequest;

  try {
    const data = await api.updateNLSearchModel(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **modelId** | `string` | The ID of the NL search model to update | [Defaults to `undefined`] |
| **body** | `NLSearchModelCreateSchema` | The NL search model fields to update | |

### Return type

[**NLSearchModelSchema**](NLSearchModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | NL search model successfully updated |  -  |
| **400** | Bad request, see error message for details |  -  |
| **404** | NL search model not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


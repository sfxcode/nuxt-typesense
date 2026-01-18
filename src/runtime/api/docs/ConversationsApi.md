# ConversationsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createConversationModel**](ConversationsApi.md#createconversationmodel) | **POST** /conversations/models | Create a conversation model |
| [**deleteConversationModel**](ConversationsApi.md#deleteconversationmodel) | **DELETE** /conversations/models/{modelId} | Delete a conversation model |
| [**retrieveAllConversationModels**](ConversationsApi.md#retrieveallconversationmodels) | **GET** /conversations/models | List all conversation models |
| [**retrieveConversationModel**](ConversationsApi.md#retrieveconversationmodel) | **GET** /conversations/models/{modelId} | Retrieve a conversation model |
| [**updateConversationModel**](ConversationsApi.md#updateconversationmodel) | **PUT** /conversations/models/{modelId} | Update a conversation model |



## createConversationModel

> ConversationModelSchema createConversationModel(conversationModelCreateSchema)

Create a conversation model

Create a Conversation Model

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { CreateConversationModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new ConversationsApi(config);

  const body = {
    // ConversationModelCreateSchema
    conversationModelCreateSchema: ...,
  } satisfies CreateConversationModelRequest;

  try {
    const data = await api.createConversationModel(body);
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
| **conversationModelCreateSchema** | [ConversationModelCreateSchema](ConversationModelCreateSchema.md) |  | |

### Return type

[**ConversationModelSchema**](ConversationModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created Conversation Model |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteConversationModel

> ConversationModelSchema deleteConversationModel(modelId)

Delete a conversation model

Delete a conversation model

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { DeleteConversationModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new ConversationsApi(config);

  const body = {
    // string | The id of the conversation model to delete
    modelId: modelId_example,
  } satisfies DeleteConversationModelRequest;

  try {
    const data = await api.deleteConversationModel(body);
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
| **modelId** | `string` | The id of the conversation model to delete | [Defaults to `undefined`] |

### Return type

[**ConversationModelSchema**](ConversationModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The conversation model was successfully deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveAllConversationModels

> Array&lt;ConversationModelSchema&gt; retrieveAllConversationModels()

List all conversation models

Retrieve all conversation models

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { RetrieveAllConversationModelsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new ConversationsApi(config);

  try {
    const data = await api.retrieveAllConversationModels();
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

[**Array&lt;ConversationModelSchema&gt;**](ConversationModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all conversation models |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveConversationModel

> ConversationModelSchema retrieveConversationModel(modelId)

Retrieve a conversation model

Retrieve a conversation model

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { RetrieveConversationModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new ConversationsApi(config);

  const body = {
    // string | The id of the conversation model to retrieve
    modelId: modelId_example,
  } satisfies RetrieveConversationModelRequest;

  try {
    const data = await api.retrieveConversationModel(body);
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
| **modelId** | `string` | The id of the conversation model to retrieve | [Defaults to `undefined`] |

### Return type

[**ConversationModelSchema**](ConversationModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | A conversation model |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateConversationModel

> ConversationModelSchema updateConversationModel(modelId, conversationModelUpdateSchema)

Update a conversation model

Update a conversation model

### Example

```ts
import {
  Configuration,
  ConversationsApi,
} from '';
import type { UpdateConversationModelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new ConversationsApi(config);

  const body = {
    // string | The id of the conversation model to update
    modelId: modelId_example,
    // ConversationModelUpdateSchema
    conversationModelUpdateSchema: ...,
  } satisfies UpdateConversationModelRequest;

  try {
    const data = await api.updateConversationModel(body);
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
| **modelId** | `string` | The id of the conversation model to update | [Defaults to `undefined`] |
| **conversationModelUpdateSchema** | [ConversationModelUpdateSchema](ConversationModelUpdateSchema.md) |  | |

### Return type

[**ConversationModelSchema**](ConversationModelSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The conversation model was successfully updated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


# KeysApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createKey**](KeysApi.md#createkey) | **POST** /keys | Create an API Key |
| [**deleteKey**](KeysApi.md#deletekey) | **DELETE** /keys/{keyId} | Delete an API key given its ID. |
| [**getKey**](KeysApi.md#getkey) | **GET** /keys/{keyId} | Retrieve (metadata about) a key |
| [**getKeys**](KeysApi.md#getkeys) | **GET** /keys | Retrieve (metadata about) all keys. |



## createKey

> ApiKey createKey(apiKeySchema)

Create an API Key

Create an API Key with fine-grain access control. You can restrict access on both a per-collection and per-action level. The generated key is returned only during creation. You want to store this key carefully in a secure place.

### Example

```ts
import {
  Configuration,
  KeysApi,
} from '';
import type { CreateKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new KeysApi(config);

  const body = {
    // ApiKeySchema | The object that describes API key scope (optional)
    apiKeySchema: ...,
  } satisfies CreateKeyRequest;

  try {
    const data = await api.createKey(body);
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
| **apiKeySchema** | [ApiKeySchema](ApiKeySchema.md) | The object that describes API key scope | [Optional] |

### Return type

[**ApiKey**](ApiKey.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created API key |  -  |
| **400** | Bad request, see error message for details |  -  |
| **409** | API key generation conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteKey

> ApiKeyDeleteResponse deleteKey(keyId)

Delete an API key given its ID.

### Example

```ts
import {
  Configuration,
  KeysApi,
} from '';
import type { DeleteKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new KeysApi(config);

  const body = {
    // number | The ID of the key to delete
    keyId: 789,
  } satisfies DeleteKeyRequest;

  try {
    const data = await api.deleteKey(body);
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
| **keyId** | `number` | The ID of the key to delete | [Defaults to `undefined`] |

### Return type

[**ApiKeyDeleteResponse**](ApiKeyDeleteResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The key referenced by the ID |  -  |
| **400** | Bad request, see error message for details |  -  |
| **404** | Key not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getKey

> ApiKey getKey(keyId)

Retrieve (metadata about) a key

Retrieve (metadata about) a key. Only the key prefix is returned when you retrieve a key. Due to security reasons, only the create endpoint returns the full API key.

### Example

```ts
import {
  Configuration,
  KeysApi,
} from '';
import type { GetKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new KeysApi(config);

  const body = {
    // number | The ID of the key to retrieve
    keyId: 789,
  } satisfies GetKeyRequest;

  try {
    const data = await api.getKey(body);
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
| **keyId** | `number` | The ID of the key to retrieve | [Defaults to `undefined`] |

### Return type

[**ApiKey**](ApiKey.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The key referenced by the ID |  -  |
| **404** | The key was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getKeys

> ApiKeysResponse getKeys()

Retrieve (metadata about) all keys.

### Example

```ts
import {
  Configuration,
  KeysApi,
} from '';
import type { GetKeysRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new KeysApi(config);

  try {
    const data = await api.getKeys();
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

[**ApiKeysResponse**](ApiKeysResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all keys |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


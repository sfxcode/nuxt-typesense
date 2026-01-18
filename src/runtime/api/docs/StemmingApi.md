# StemmingApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getStemmingDictionary**](StemmingApi.md#getstemmingdictionary) | **GET** /stemming/dictionaries/{dictionaryId} | Retrieve a stemming dictionary |
| [**importStemmingDictionary**](StemmingApi.md#importstemmingdictionary) | **POST** /stemming/dictionaries/import | Import a stemming dictionary |
| [**listStemmingDictionaries**](StemmingApi.md#liststemmingdictionaries) | **GET** /stemming/dictionaries | List all stemming dictionaries |



## getStemmingDictionary

> StemmingDictionary getStemmingDictionary(dictionaryId)

Retrieve a stemming dictionary

Fetch details of a specific stemming dictionary.

### Example

```ts
import {
  Configuration,
  StemmingApi,
} from '';
import type { GetStemmingDictionaryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new StemmingApi(config);

  const body = {
    // string | The ID of the dictionary to retrieve
    dictionaryId: irregular-plurals,
  } satisfies GetStemmingDictionaryRequest;

  try {
    const data = await api.getStemmingDictionary(body);
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
| **dictionaryId** | `string` | The ID of the dictionary to retrieve | [Defaults to `undefined`] |

### Return type

[**StemmingDictionary**](StemmingDictionary.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stemming dictionary details |  -  |
| **404** | Dictionary not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## importStemmingDictionary

> string importStemmingDictionary(id, body)

Import a stemming dictionary

Upload a JSONL file containing word mappings to create or update a stemming dictionary.

### Example

```ts
import {
  Configuration,
  StemmingApi,
} from '';
import type { ImportStemmingDictionaryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new StemmingApi(config);

  const body = {
    // string | The ID to assign to the dictionary
    id: irregular-plurals,
    // string | The JSONL file containing word mappings
    body: body_example,
  } satisfies ImportStemmingDictionaryRequest;

  try {
    const data = await api.importStemmingDictionary(body);
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
| **id** | `string` | The ID to assign to the dictionary | [Defaults to `undefined`] |
| **body** | `string` | The JSONL file containing word mappings | |

### Return type

**string**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Dictionary successfully imported |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStemmingDictionaries

> ListStemmingDictionaries200Response listStemmingDictionaries()

List all stemming dictionaries

Retrieve a list of all available stemming dictionaries.

### Example

```ts
import {
  Configuration,
  StemmingApi,
} from '';
import type { ListStemmingDictionariesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new StemmingApi(config);

  try {
    const data = await api.listStemmingDictionaries();
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

[**ListStemmingDictionaries200Response**](ListStemmingDictionaries200Response.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all dictionaries |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


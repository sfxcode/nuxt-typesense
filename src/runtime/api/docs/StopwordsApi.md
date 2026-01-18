# StopwordsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteStopwordsSet**](StopwordsApi.md#deletestopwordsset) | **DELETE** /stopwords/{setId} | Delete a stopwords set. |
| [**retrieveStopwordsSet**](StopwordsApi.md#retrievestopwordsset) | **GET** /stopwords/{setId} | Retrieves a stopwords set. |
| [**retrieveStopwordsSets**](StopwordsApi.md#retrievestopwordssets) | **GET** /stopwords | Retrieves all stopwords sets. |
| [**upsertStopwordsSet**](StopwordsApi.md#upsertstopwordsset) | **PUT** /stopwords/{setId} | Upserts a stopwords set. |



## deleteStopwordsSet

> DeleteStopwordsSet200Response deleteStopwordsSet(setId)

Delete a stopwords set.

Permanently deletes a stopwords set, given it\&#39;s name.

### Example

```ts
import {
  Configuration,
  StopwordsApi,
} from '';
import type { DeleteStopwordsSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new StopwordsApi(config);

  const body = {
    // string | The ID of the stopwords set to delete.
    setId: countries,
  } satisfies DeleteStopwordsSetRequest;

  try {
    const data = await api.deleteStopwordsSet(body);
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
| **setId** | `string` | The ID of the stopwords set to delete. | [Defaults to `undefined`] |

### Return type

[**DeleteStopwordsSet200Response**](DeleteStopwordsSet200Response.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stopwords set rule deleted. |  -  |
| **404** | Stopwords set not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveStopwordsSet

> StopwordsSetRetrieveSchema retrieveStopwordsSet(setId)

Retrieves a stopwords set.

Retrieve the details of a stopwords set, given it\&#39;s name.

### Example

```ts
import {
  Configuration,
  StopwordsApi,
} from '';
import type { RetrieveStopwordsSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new StopwordsApi(config);

  const body = {
    // string | The ID of the stopwords set to retrieve.
    setId: countries,
  } satisfies RetrieveStopwordsSetRequest;

  try {
    const data = await api.retrieveStopwordsSet(body);
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
| **setId** | `string` | The ID of the stopwords set to retrieve. | [Defaults to `undefined`] |

### Return type

[**StopwordsSetRetrieveSchema**](StopwordsSetRetrieveSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stopwords set fetched. |  -  |
| **404** | Stopwords set not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveStopwordsSets

> StopwordsSetsRetrieveAllSchema retrieveStopwordsSets()

Retrieves all stopwords sets.

Retrieve the details of all stopwords sets

### Example

```ts
import {
  Configuration,
  StopwordsApi,
} from '';
import type { RetrieveStopwordsSetsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new StopwordsApi(config);

  try {
    const data = await api.retrieveStopwordsSets();
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

[**StopwordsSetsRetrieveAllSchema**](StopwordsSetsRetrieveAllSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stopwords sets fetched. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertStopwordsSet

> StopwordsSetSchema upsertStopwordsSet(setId, stopwordsSetUpsertSchema)

Upserts a stopwords set.

When an analytics rule is created, we give it a name and describe the type, the source collections and the destination collection.

### Example

```ts
import {
  Configuration,
  StopwordsApi,
} from '';
import type { UpsertStopwordsSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new StopwordsApi(config);

  const body = {
    // string | The ID of the stopwords set to upsert.
    setId: countries,
    // StopwordsSetUpsertSchema | The stopwords set to upsert.
    stopwordsSetUpsertSchema: ...,
  } satisfies UpsertStopwordsSetRequest;

  try {
    const data = await api.upsertStopwordsSet(body);
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
| **setId** | `string` | The ID of the stopwords set to upsert. | [Defaults to `undefined`] |
| **stopwordsSetUpsertSchema** | [StopwordsSetUpsertSchema](StopwordsSetUpsertSchema.md) | The stopwords set to upsert. | |

### Return type

[**StopwordsSetSchema**](StopwordsSetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stopwords set successfully upserted. |  -  |
| **400** | Bad request, see error message for details. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


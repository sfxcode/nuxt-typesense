# SynonymsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteSynonymSet**](SynonymsApi.md#deletesynonymset) | **DELETE** /synonym_sets/{synonymSetName} | Delete a synonym set |
| [**deleteSynonymSetItem**](SynonymsApi.md#deletesynonymsetitem) | **DELETE** /synonym_sets/{synonymSetName}/items/{itemId} | Delete a synonym set item |
| [**retrieveSynonymSet**](SynonymsApi.md#retrievesynonymset) | **GET** /synonym_sets/{synonymSetName} | Retrieve a synonym set |
| [**retrieveSynonymSetItem**](SynonymsApi.md#retrievesynonymsetitem) | **GET** /synonym_sets/{synonymSetName}/items/{itemId} | Retrieve a synonym set item |
| [**retrieveSynonymSetItems**](SynonymsApi.md#retrievesynonymsetitems) | **GET** /synonym_sets/{synonymSetName}/items | List items in a synonym set |
| [**retrieveSynonymSets**](SynonymsApi.md#retrievesynonymsets) | **GET** /synonym_sets | List all synonym sets |
| [**upsertSynonymSet**](SynonymsApi.md#upsertsynonymset) | **PUT** /synonym_sets/{synonymSetName} | Create or update a synonym set |
| [**upsertSynonymSetItem**](SynonymsApi.md#upsertsynonymsetitem) | **PUT** /synonym_sets/{synonymSetName}/items/{itemId} | Create or update a synonym set item |



## deleteSynonymSet

> SynonymSetDeleteSchema deleteSynonymSet(synonymSetName)

Delete a synonym set

Delete a specific synonym set by its name

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { DeleteSynonymSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  const body = {
    // string | The name of the synonym set to delete
    synonymSetName: synonymSetName_example,
  } satisfies DeleteSynonymSetRequest;

  try {
    const data = await api.deleteSynonymSet(body);
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
| **synonymSetName** | `string` | The name of the synonym set to delete | [Defaults to `undefined`] |

### Return type

[**SynonymSetDeleteSchema**](SynonymSetDeleteSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Synonym set successfully deleted |  -  |
| **404** | Synonym set not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSynonymSetItem

> SynonymItemDeleteSchema deleteSynonymSetItem(synonymSetName, itemId)

Delete a synonym set item

Delete a specific synonym item by its id

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { DeleteSynonymSetItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  const body = {
    // string | The name of the synonym set
    synonymSetName: synonymSetName_example,
    // string | The id of the synonym item to delete
    itemId: itemId_example,
  } satisfies DeleteSynonymSetItemRequest;

  try {
    const data = await api.deleteSynonymSetItem(body);
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
| **synonymSetName** | `string` | The name of the synonym set | [Defaults to `undefined`] |
| **itemId** | `string` | The id of the synonym item to delete | [Defaults to `undefined`] |

### Return type

[**SynonymItemDeleteSchema**](SynonymItemDeleteSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Synonym item successfully deleted |  -  |
| **404** | Synonym item not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveSynonymSet

> SynonymSetSchema retrieveSynonymSet(synonymSetName)

Retrieve a synonym set

Retrieve a specific synonym set by its name

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { RetrieveSynonymSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  const body = {
    // string | The name of the synonym set to retrieve
    synonymSetName: synonymSetName_example,
  } satisfies RetrieveSynonymSetRequest;

  try {
    const data = await api.retrieveSynonymSet(body);
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
| **synonymSetName** | `string` | The name of the synonym set to retrieve | [Defaults to `undefined`] |

### Return type

[**SynonymSetSchema**](SynonymSetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Synonym set fetched |  -  |
| **404** | Synonym set not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveSynonymSetItem

> SynonymItemSchema retrieveSynonymSetItem(synonymSetName, itemId)

Retrieve a synonym set item

Retrieve a specific synonym item by its id

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { RetrieveSynonymSetItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  const body = {
    // string | The name of the synonym set
    synonymSetName: synonymSetName_example,
    // string | The id of the synonym item to retrieve
    itemId: itemId_example,
  } satisfies RetrieveSynonymSetItemRequest;

  try {
    const data = await api.retrieveSynonymSetItem(body);
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
| **synonymSetName** | `string` | The name of the synonym set | [Defaults to `undefined`] |
| **itemId** | `string` | The id of the synonym item to retrieve | [Defaults to `undefined`] |

### Return type

[**SynonymItemSchema**](SynonymItemSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Synonym item fetched |  -  |
| **404** | Synonym item not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveSynonymSetItems

> Array&lt;SynonymItemSchema&gt; retrieveSynonymSetItems(synonymSetName)

List items in a synonym set

Retrieve all synonym items in a set

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { RetrieveSynonymSetItemsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  const body = {
    // string | The name of the synonym set to retrieve items for
    synonymSetName: synonymSetName_example,
  } satisfies RetrieveSynonymSetItemsRequest;

  try {
    const data = await api.retrieveSynonymSetItems(body);
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
| **synonymSetName** | `string` | The name of the synonym set to retrieve items for | [Defaults to `undefined`] |

### Return type

[**Array&lt;SynonymItemSchema&gt;**](SynonymItemSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of synonym items |  -  |
| **404** | Synonym set not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveSynonymSets

> Array&lt;SynonymSetSchema&gt; retrieveSynonymSets()

List all synonym sets

Retrieve all synonym sets

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { RetrieveSynonymSetsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  try {
    const data = await api.retrieveSynonymSets();
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

[**Array&lt;SynonymSetSchema&gt;**](SynonymSetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all synonym sets |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertSynonymSet

> SynonymSetSchema upsertSynonymSet(synonymSetName, synonymSetCreateSchema)

Create or update a synonym set

Create or update a synonym set with the given name

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { UpsertSynonymSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  const body = {
    // string | The name of the synonym set to create/update
    synonymSetName: synonymSetName_example,
    // SynonymSetCreateSchema | The synonym set to be created/updated
    synonymSetCreateSchema: ...,
  } satisfies UpsertSynonymSetRequest;

  try {
    const data = await api.upsertSynonymSet(body);
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
| **synonymSetName** | `string` | The name of the synonym set to create/update | [Defaults to `undefined`] |
| **synonymSetCreateSchema** | [SynonymSetCreateSchema](SynonymSetCreateSchema.md) | The synonym set to be created/updated | |

### Return type

[**SynonymSetSchema**](SynonymSetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Synonym set successfully created/updated |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertSynonymSetItem

> SynonymItemSchema upsertSynonymSetItem(synonymSetName, itemId, synonymItemUpsertSchema)

Create or update a synonym set item

Create or update a synonym set item with the given id

### Example

```ts
import {
  Configuration,
  SynonymsApi,
} from '';
import type { UpsertSynonymSetItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new SynonymsApi(config);

  const body = {
    // string | The name of the synonym set
    synonymSetName: synonymSetName_example,
    // string | The id of the synonym item to upsert
    itemId: itemId_example,
    // SynonymItemUpsertSchema | The synonym item to be created/updated
    synonymItemUpsertSchema: ...,
  } satisfies UpsertSynonymSetItemRequest;

  try {
    const data = await api.upsertSynonymSetItem(body);
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
| **synonymSetName** | `string` | The name of the synonym set | [Defaults to `undefined`] |
| **itemId** | `string` | The id of the synonym item to upsert | [Defaults to `undefined`] |
| **synonymItemUpsertSchema** | [SynonymItemUpsertSchema](SynonymItemUpsertSchema.md) | The synonym item to be created/updated | |

### Return type

[**SynonymItemSchema**](SynonymItemSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Synonym item successfully created/updated |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


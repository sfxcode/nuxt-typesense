# CurationSetsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteCurationSet**](CurationSetsApi.md#deletecurationset) | **DELETE** /curation_sets/{curationSetName} | Delete a curation set |
| [**deleteCurationSetItem**](CurationSetsApi.md#deletecurationsetitem) | **DELETE** /curation_sets/{curationSetName}/items/{itemId} | Delete a curation set item |
| [**retrieveCurationSet**](CurationSetsApi.md#retrievecurationset) | **GET** /curation_sets/{curationSetName} | Retrieve a curation set |
| [**retrieveCurationSetItem**](CurationSetsApi.md#retrievecurationsetitem) | **GET** /curation_sets/{curationSetName}/items/{itemId} | Retrieve a curation set item |
| [**retrieveCurationSetItems**](CurationSetsApi.md#retrievecurationsetitems) | **GET** /curation_sets/{curationSetName}/items | List items in a curation set |
| [**retrieveCurationSets**](CurationSetsApi.md#retrievecurationsets) | **GET** /curation_sets | List all curation sets |
| [**upsertCurationSet**](CurationSetsApi.md#upsertcurationset) | **PUT** /curation_sets/{curationSetName} | Create or update a curation set |
| [**upsertCurationSetItem**](CurationSetsApi.md#upsertcurationsetitem) | **PUT** /curation_sets/{curationSetName}/items/{itemId} | Create or update a curation set item |



## deleteCurationSet

> CurationSetDeleteSchema deleteCurationSet(curationSetName)

Delete a curation set

Delete a specific curation set by its name

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { DeleteCurationSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  const body = {
    // string | The name of the curation set to delete
    curationSetName: curationSetName_example,
  } satisfies DeleteCurationSetRequest;

  try {
    const data = await api.deleteCurationSet(body);
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
| **curationSetName** | `string` | The name of the curation set to delete | [Defaults to `undefined`] |

### Return type

[**CurationSetDeleteSchema**](CurationSetDeleteSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Curation set successfully deleted |  -  |
| **404** | Curation set not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCurationSetItem

> CurationItemDeleteSchema deleteCurationSetItem(curationSetName, itemId)

Delete a curation set item

Delete a specific curation item by its id

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { DeleteCurationSetItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  const body = {
    // string | The name of the curation set
    curationSetName: curationSetName_example,
    // string | The id of the curation item to delete
    itemId: itemId_example,
  } satisfies DeleteCurationSetItemRequest;

  try {
    const data = await api.deleteCurationSetItem(body);
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
| **curationSetName** | `string` | The name of the curation set | [Defaults to `undefined`] |
| **itemId** | `string` | The id of the curation item to delete | [Defaults to `undefined`] |

### Return type

[**CurationItemDeleteSchema**](CurationItemDeleteSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Curation item successfully deleted |  -  |
| **404** | Curation item not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveCurationSet

> CurationSetSchema retrieveCurationSet(curationSetName)

Retrieve a curation set

Retrieve a specific curation set by its name

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { RetrieveCurationSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  const body = {
    // string | The name of the curation set to retrieve
    curationSetName: curationSetName_example,
  } satisfies RetrieveCurationSetRequest;

  try {
    const data = await api.retrieveCurationSet(body);
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
| **curationSetName** | `string` | The name of the curation set to retrieve | [Defaults to `undefined`] |

### Return type

[**CurationSetSchema**](CurationSetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Curation set fetched |  -  |
| **404** | Curation set not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveCurationSetItem

> CurationItemSchema retrieveCurationSetItem(curationSetName, itemId)

Retrieve a curation set item

Retrieve a specific curation item by its id

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { RetrieveCurationSetItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  const body = {
    // string | The name of the curation set
    curationSetName: curationSetName_example,
    // string | The id of the curation item to retrieve
    itemId: itemId_example,
  } satisfies RetrieveCurationSetItemRequest;

  try {
    const data = await api.retrieveCurationSetItem(body);
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
| **curationSetName** | `string` | The name of the curation set | [Defaults to `undefined`] |
| **itemId** | `string` | The id of the curation item to retrieve | [Defaults to `undefined`] |

### Return type

[**CurationItemSchema**](CurationItemSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Curation item fetched |  -  |
| **404** | Curation item not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveCurationSetItems

> Array&lt;CurationItemSchema&gt; retrieveCurationSetItems(curationSetName)

List items in a curation set

Retrieve all curation items in a set

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { RetrieveCurationSetItemsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  const body = {
    // string | The name of the curation set to retrieve items for
    curationSetName: curationSetName_example,
  } satisfies RetrieveCurationSetItemsRequest;

  try {
    const data = await api.retrieveCurationSetItems(body);
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
| **curationSetName** | `string` | The name of the curation set to retrieve items for | [Defaults to `undefined`] |

### Return type

[**Array&lt;CurationItemSchema&gt;**](CurationItemSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of curation items |  -  |
| **404** | Curation set not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveCurationSets

> Array&lt;CurationSetSchema&gt; retrieveCurationSets()

List all curation sets

Retrieve all curation sets

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { RetrieveCurationSetsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  try {
    const data = await api.retrieveCurationSets();
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

[**Array&lt;CurationSetSchema&gt;**](CurationSetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all curation sets |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertCurationSet

> CurationSetSchema upsertCurationSet(curationSetName, curationSetCreateSchema)

Create or update a curation set

Create or update a curation set with the given name

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { UpsertCurationSetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  const body = {
    // string | The name of the curation set to create/update
    curationSetName: curationSetName_example,
    // CurationSetCreateSchema | The curation set to be created/updated
    curationSetCreateSchema: ...,
  } satisfies UpsertCurationSetRequest;

  try {
    const data = await api.upsertCurationSet(body);
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
| **curationSetName** | `string` | The name of the curation set to create/update | [Defaults to `undefined`] |
| **curationSetCreateSchema** | [CurationSetCreateSchema](CurationSetCreateSchema.md) | The curation set to be created/updated | |

### Return type

[**CurationSetSchema**](CurationSetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Curation set successfully created/updated |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertCurationSetItem

> CurationItemSchema upsertCurationSetItem(curationSetName, itemId, curationItemCreateSchema)

Create or update a curation set item

Create or update a curation set item with the given id

### Example

```ts
import {
  Configuration,
  CurationSetsApi,
} from '';
import type { UpsertCurationSetItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CurationSetsApi(config);

  const body = {
    // string | The name of the curation set
    curationSetName: curationSetName_example,
    // string | The id of the curation item to upsert
    itemId: itemId_example,
    // CurationItemCreateSchema | The curation item to be created/updated
    curationItemCreateSchema: ...,
  } satisfies UpsertCurationSetItemRequest;

  try {
    const data = await api.upsertCurationSetItem(body);
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
| **curationSetName** | `string` | The name of the curation set | [Defaults to `undefined`] |
| **itemId** | `string` | The id of the curation item to upsert | [Defaults to `undefined`] |
| **curationItemCreateSchema** | [CurationItemCreateSchema](CurationItemCreateSchema.md) | The curation item to be created/updated | |

### Return type

[**CurationItemSchema**](CurationItemSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Curation item successfully created/updated |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


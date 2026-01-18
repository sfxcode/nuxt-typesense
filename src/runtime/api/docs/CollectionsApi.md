# CollectionsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCollection**](CollectionsApi.md#createcollection) | **POST** /collections | Create a new collection |
| [**deleteAlias**](CollectionsApi.md#deletealias) | **DELETE** /aliases/{aliasName} | Delete an alias |
| [**deleteCollection**](CollectionsApi.md#deletecollection) | **DELETE** /collections/{collectionName} | Delete a collection |
| [**getAlias**](CollectionsApi.md#getalias) | **GET** /aliases/{aliasName} | Retrieve an alias |
| [**getAliases**](CollectionsApi.md#getaliases) | **GET** /aliases | List all aliases |
| [**getCollection**](CollectionsApi.md#getcollection) | **GET** /collections/{collectionName} | Retrieve a single collection |
| [**getCollections**](CollectionsApi.md#getcollections) | **GET** /collections | List all collections |
| [**updateCollection**](CollectionsApi.md#updatecollection) | **PATCH** /collections/{collectionName} | Update a collection |
| [**upsertAlias**](CollectionsApi.md#upsertalias) | **PUT** /aliases/{aliasName} | Create or update a collection alias |



## createCollection

> CollectionResponse createCollection(collectionSchema)

Create a new collection

When a collection is created, we give it a name and describe the fields that will be indexed from the documents added to the collection.

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { CreateCollectionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // CollectionSchema | The collection object to be created
    collectionSchema: ...,
  } satisfies CreateCollectionRequest;

  try {
    const data = await api.createCollection(body);
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
| **collectionSchema** | [CollectionSchema](CollectionSchema.md) | The collection object to be created | |

### Return type

[**CollectionResponse**](CollectionResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Collection successfully created |  -  |
| **400** | Bad request, see error message for details |  -  |
| **409** | Collection already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteAlias

> CollectionAlias deleteAlias(aliasName)

Delete an alias

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { DeleteAliasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // string | The name of the alias to delete
    aliasName: aliasName_example,
  } satisfies DeleteAliasRequest;

  try {
    const data = await api.deleteAlias(body);
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
| **aliasName** | `string` | The name of the alias to delete | [Defaults to `undefined`] |

### Return type

[**CollectionAlias**](CollectionAlias.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collection alias was deleted |  -  |
| **404** | Alias not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCollection

> CollectionResponse deleteCollection(collectionName)

Delete a collection

Permanently drops a collection. This action cannot be undone. For large collections, this might have an impact on read latencies.

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { DeleteCollectionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // string | The name of the collection to delete
    collectionName: collectionName_example,
  } satisfies DeleteCollectionRequest;

  try {
    const data = await api.deleteCollection(body);
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
| **collectionName** | `string` | The name of the collection to delete | [Defaults to `undefined`] |

### Return type

[**CollectionResponse**](CollectionResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collection deleted |  -  |
| **404** | Collection not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAlias

> CollectionAlias getAlias(aliasName)

Retrieve an alias

Find out which collection an alias points to by fetching it

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { GetAliasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // string | The name of the alias to retrieve
    aliasName: aliasName_example,
  } satisfies GetAliasRequest;

  try {
    const data = await api.getAlias(body);
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
| **aliasName** | `string` | The name of the alias to retrieve | [Defaults to `undefined`] |

### Return type

[**CollectionAlias**](CollectionAlias.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collection alias fetched |  -  |
| **404** | The alias was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAliases

> CollectionAliasesResponse getAliases()

List all aliases

List all aliases and the corresponding collections that they map to.

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { GetAliasesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  try {
    const data = await api.getAliases();
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

[**CollectionAliasesResponse**](CollectionAliasesResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all collection aliases |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCollection

> CollectionResponse getCollection(collectionName)

Retrieve a single collection

Retrieve the details of a collection, given its name.

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { GetCollectionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // string | The name of the collection to retrieve
    collectionName: collectionName_example,
  } satisfies GetCollectionRequest;

  try {
    const data = await api.getCollection(body);
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
| **collectionName** | `string` | The name of the collection to retrieve | [Defaults to `undefined`] |

### Return type

[**CollectionResponse**](CollectionResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collection fetched |  -  |
| **404** | Collection not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCollections

> Array&lt;CollectionResponse&gt; getCollections(getCollectionsParameters)

List all collections

Returns a summary of all your collections. The collections are returned sorted by creation date, with the most recent collections appearing first.

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { GetCollectionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // GetCollectionsGetCollectionsParametersParameter (optional)
    getCollectionsParameters: ...,
  } satisfies GetCollectionsRequest;

  try {
    const data = await api.getCollections(body);
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
| **getCollectionsParameters** | [](.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;CollectionResponse&gt;**](CollectionResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of all collections |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateCollection

> CollectionUpdateSchema updateCollection(collectionName, collectionUpdateSchema)

Update a collection

Update a collection\&#39;s schema to modify the fields and their types.

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { UpdateCollectionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // string | The name of the collection to update
    collectionName: collectionName_example,
    // CollectionUpdateSchema | The document object with fields to be updated
    collectionUpdateSchema: ...,
  } satisfies UpdateCollectionRequest;

  try {
    const data = await api.updateCollection(body);
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
| **collectionName** | `string` | The name of the collection to update | [Defaults to `undefined`] |
| **collectionUpdateSchema** | [CollectionUpdateSchema](CollectionUpdateSchema.md) | The document object with fields to be updated | |

### Return type

[**CollectionUpdateSchema**](CollectionUpdateSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The updated partial collection schema |  -  |
| **400** | Bad request, see error message for details |  -  |
| **404** | The collection was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertAlias

> CollectionAlias upsertAlias(aliasName, collectionAliasSchema)

Create or update a collection alias

Create or update a collection alias. An alias is a virtual collection name that points to a real collection. If you\&#39;re familiar with symbolic links on Linux, it\&#39;s very similar to that. Aliases are useful when you want to reindex your data in the background on a new collection and switch your application to it without any changes to your code.

### Example

```ts
import {
  Configuration,
  CollectionsApi,
} from '';
import type { UpsertAliasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new CollectionsApi(config);

  const body = {
    // string | The name of the alias to create/update
    aliasName: aliasName_example,
    // CollectionAliasSchema | Collection alias to be created/updated (optional)
    collectionAliasSchema: ...,
  } satisfies UpsertAliasRequest;

  try {
    const data = await api.upsertAlias(body);
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
| **aliasName** | `string` | The name of the alias to create/update | [Defaults to `undefined`] |
| **collectionAliasSchema** | [CollectionAliasSchema](CollectionAliasSchema.md) | Collection alias to be created/updated | [Optional] |

### Return type

[**CollectionAlias**](CollectionAlias.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The collection alias was created/updated |  -  |
| **400** | Bad request, see error message for details |  -  |
| **404** | Alias not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


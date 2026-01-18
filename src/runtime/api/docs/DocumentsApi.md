# DocumentsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteDocument**](DocumentsApi.md#deletedocument) | **DELETE** /collections/{collectionName}/documents/{documentId} | Delete a document |
| [**deleteDocuments**](DocumentsApi.md#deletedocuments) | **DELETE** /collections/{collectionName}/documents | Delete a bunch of documents |
| [**exportDocuments**](DocumentsApi.md#exportdocuments) | **GET** /collections/{collectionName}/documents/export | Export all documents in a collection |
| [**getDocument**](DocumentsApi.md#getdocument) | **GET** /collections/{collectionName}/documents/{documentId} | Retrieve a document |
| [**importDocuments**](DocumentsApi.md#importdocuments) | **POST** /collections/{collectionName}/documents/import | Import documents into a collection |
| [**indexDocument**](DocumentsApi.md#indexdocument) | **POST** /collections/{collectionName}/documents | Index a document |
| [**multiSearch**](DocumentsApi.md#multisearch) | **POST** /multi_search | send multiple search requests in a single HTTP request |
| [**searchCollection**](DocumentsApi.md#searchcollection) | **GET** /collections/{collectionName}/documents/search | Search for documents in a collection |
| [**updateDocument**](DocumentsApi.md#updatedocument) | **PATCH** /collections/{collectionName}/documents/{documentId} | Update a document |
| [**updateDocuments**](DocumentsApi.md#updatedocuments) | **PATCH** /collections/{collectionName}/documents | Update documents with conditional query |



## deleteDocument

> object deleteDocument(collectionName, documentId)

Delete a document

Delete an individual document from a collection by using its ID.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { DeleteDocumentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection to search for the document under
    collectionName: collectionName_example,
    // string | The Document ID
    documentId: documentId_example,
  } satisfies DeleteDocumentRequest;

  try {
    const data = await api.deleteDocument(body);
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
| **collectionName** | `string` | The name of the collection to search for the document under | [Defaults to `undefined`] |
| **documentId** | `string` | The Document ID | [Defaults to `undefined`] |

### Return type

**object**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The document referenced by the ID was deleted |  -  |
| **404** | The document or collection was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteDocuments

> DeleteDocuments200Response deleteDocuments(collectionName, deleteDocumentsParameters)

Delete a bunch of documents

Delete a bunch of documents that match a specific filter condition. Use the &#x60;batch_size&#x60; parameter to control the number of documents that should deleted at a time. A larger value will speed up deletions, but will impact performance of other operations running on the server.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { DeleteDocumentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection to delete documents from
    collectionName: collectionName_example,
    // DeleteDocumentsDeleteDocumentsParametersParameter (optional)
    deleteDocumentsParameters: ...,
  } satisfies DeleteDocumentsRequest;

  try {
    const data = await api.deleteDocuments(body);
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
| **collectionName** | `string` | The name of the collection to delete documents from | [Defaults to `undefined`] |
| **deleteDocumentsParameters** | [](.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

[**DeleteDocuments200Response**](DeleteDocuments200Response.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Documents successfully deleted |  -  |
| **404** | Collection not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## exportDocuments

> string exportDocuments(collectionName, exportDocumentsParameters)

Export all documents in a collection

Export all documents in a collection in JSON lines format.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { ExportDocumentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection
    collectionName: collectionName_example,
    // ExportDocumentsExportDocumentsParametersParameter (optional)
    exportDocumentsParameters: ...,
  } satisfies ExportDocumentsRequest;

  try {
    const data = await api.exportDocuments(body);
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
| **collectionName** | `string` | The name of the collection | [Defaults to `undefined`] |
| **exportDocumentsParameters** | [](.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

**string**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exports all the documents in a given collection. |  -  |
| **404** | The collection was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getDocument

> object getDocument(collectionName, documentId)

Retrieve a document

Fetch an individual document from a collection by using its ID.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { GetDocumentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection to search for the document under
    collectionName: collectionName_example,
    // string | The Document ID
    documentId: documentId_example,
  } satisfies GetDocumentRequest;

  try {
    const data = await api.getDocument(body);
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
| **collectionName** | `string` | The name of the collection to search for the document under | [Defaults to `undefined`] |
| **documentId** | `string` | The Document ID | [Defaults to `undefined`] |

### Return type

**object**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The document referenced by the ID |  -  |
| **404** | The document or collection was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## importDocuments

> string importDocuments(collectionName, body, importDocumentsParameters)

Import documents into a collection

The documents to be imported must be formatted in a newline delimited JSON structure. You can feed the output file from a Typesense export operation directly as import.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { ImportDocumentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection
    collectionName: collectionName_example,
    // string | The json array of documents or the JSONL file to import
    body: body_example,
    // ImportDocumentsImportDocumentsParametersParameter (optional)
    importDocumentsParameters: ...,
  } satisfies ImportDocumentsRequest;

  try {
    const data = await api.importDocuments(body);
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
| **collectionName** | `string` | The name of the collection | [Defaults to `undefined`] |
| **body** | `string` | The json array of documents or the JSONL file to import | |
| **importDocumentsParameters** | [](.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

**string**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/octet-stream`
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Result of the import operation. Each line of the response indicates the result of each document present in the request body (in the same order). If the import of a single document fails, it does not affect the other documents. If there is a failure, the response line will include a corresponding error message and as well as the actual document content. |  -  |
| **400** | Bad request, see error message for details |  -  |
| **404** | The collection was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## indexDocument

> object indexDocument(collectionName, body, action, dirtyValues)

Index a document

A document to be indexed in a given collection must conform to the schema of the collection.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { IndexDocumentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection to add the document to
    collectionName: collectionName_example,
    // object | The document object to be indexed
    body: Object,
    // IndexAction | Additional action to perform (optional)
    action: action_example,
    // DirtyValues | Dealing with Dirty Data (optional)
    dirtyValues: ...,
  } satisfies IndexDocumentRequest;

  try {
    const data = await api.indexDocument(body);
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
| **collectionName** | `string` | The name of the collection to add the document to | [Defaults to `undefined`] |
| **body** | `object` | The document object to be indexed | |
| **action** | `IndexAction` | Additional action to perform | [Optional] [Defaults to `undefined`] [Enum: create, update, upsert, emplace] |
| **dirtyValues** | `DirtyValues` | Dealing with Dirty Data | [Optional] [Defaults to `undefined`] [Enum: coerce_or_reject, coerce_or_drop, drop, reject] |

### Return type

**object**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Document successfully created/indexed |  -  |
| **404** | Collection not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## multiSearch

> MultiSearchResult multiSearch(multiSearchParameters, multiSearchSearchesParameter)

send multiple search requests in a single HTTP request

This is especially useful to avoid round-trip network latencies incurred otherwise if each of these requests are sent in separate HTTP requests. You can also use this feature to do a federated search across multiple collections in a single HTTP request.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { MultiSearchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // MultiSearchParameters
    multiSearchParameters: ...,
    // MultiSearchSearchesParameter (optional)
    multiSearchSearchesParameter: ...,
  } satisfies MultiSearchRequest;

  try {
    const data = await api.multiSearch(body);
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
| **multiSearchParameters** | [](.md) |  | [Defaults to `undefined`] |
| **multiSearchSearchesParameter** | [MultiSearchSearchesParameter](MultiSearchSearchesParameter.md) |  | [Optional] |

### Return type

[**MultiSearchResult**](MultiSearchResult.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Search results |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchCollection

> SearchResult searchCollection(collectionName, searchParameters)

Search for documents in a collection

Search for documents in a collection that match the search criteria.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { SearchCollectionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection to search for the document under
    collectionName: collectionName_example,
    // SearchParameters
    searchParameters: ...,
  } satisfies SearchCollectionRequest;

  try {
    const data = await api.searchCollection(body);
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
| **collectionName** | `string` | The name of the collection to search for the document under | [Defaults to `undefined`] |
| **searchParameters** | [](.md) |  | [Defaults to `undefined`] |

### Return type

[**SearchResult**](SearchResult.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Search results |  -  |
| **400** | Bad request, see error message for details |  -  |
| **404** | The collection or field was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateDocument

> object updateDocument(collectionName, documentId, body, dirtyValues)

Update a document

Update an individual document from a collection by using its ID. The update can be partial.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { UpdateDocumentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection to search for the document under
    collectionName: collectionName_example,
    // string | The Document ID
    documentId: documentId_example,
    // object | The document object with fields to be updated
    body: Object,
    // DirtyValues | Dealing with Dirty Data (optional)
    dirtyValues: ...,
  } satisfies UpdateDocumentRequest;

  try {
    const data = await api.updateDocument(body);
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
| **collectionName** | `string` | The name of the collection to search for the document under | [Defaults to `undefined`] |
| **documentId** | `string` | The Document ID | [Defaults to `undefined`] |
| **body** | `object` | The document object with fields to be updated | |
| **dirtyValues** | `DirtyValues` | Dealing with Dirty Data | [Optional] [Defaults to `undefined`] [Enum: coerce_or_reject, coerce_or_drop, drop, reject] |

### Return type

**object**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The document referenced by the ID was updated |  -  |
| **404** | The document or collection was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateDocuments

> UpdateDocuments200Response updateDocuments(collectionName, body, updateDocumentsParameters)

Update documents with conditional query

The filter_by query parameter is used to filter to specify a condition against which the documents are matched. The request body contains the fields that should be updated for any documents that match the filter condition. This endpoint is only available if the Typesense server is version &#x60;0.25.0.rc12&#x60; or later.

### Example

```ts
import {
  Configuration,
  DocumentsApi,
} from '';
import type { UpdateDocumentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DocumentsApi(config);

  const body = {
    // string | The name of the collection to update documents in
    collectionName: collectionName_example,
    // object | The document fields to be updated
    body: Object,
    // UpdateDocumentsUpdateDocumentsParametersParameter (optional)
    updateDocumentsParameters: ...,
  } satisfies UpdateDocumentsRequest;

  try {
    const data = await api.updateDocuments(body);
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
| **collectionName** | `string` | The name of the collection to update documents in | [Defaults to `undefined`] |
| **body** | `object` | The document fields to be updated | |
| **updateDocumentsParameters** | [](.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

[**UpdateDocuments200Response**](UpdateDocuments200Response.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The response contains a single field, &#x60;num_updated&#x60;, indicating the number of documents affected. |  -  |
| **400** | Bad request, see error message for details |  -  |
| **404** | The collection was not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


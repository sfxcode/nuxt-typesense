# OperationsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**clearCache**](OperationsApi.md#clearcache) | **POST** /operations/cache/clear | Clear the cached responses of search requests in the LRU cache. |
| [**compactDb**](OperationsApi.md#compactdb) | **POST** /operations/db/compact | Compacting the on-disk database |
| [**getSchemaChanges**](OperationsApi.md#getschemachanges) | **GET** /operations/schema_changes | Get the status of in-progress schema change operations |
| [**retrieveAPIStats**](OperationsApi.md#retrieveapistats) | **GET** /stats.json | Get stats about API endpoints. |
| [**retrieveMetrics**](OperationsApi.md#retrievemetrics) | **GET** /metrics.json | Get current RAM, CPU, Disk &amp; Network usage metrics. |
| [**takeSnapshot**](OperationsApi.md#takesnapshot) | **POST** /operations/snapshot | Creates a point-in-time snapshot of a Typesense node\&#39;s state and data in the specified directory. |
| [**toggleSlowRequestLog**](OperationsApi.md#toggleslowrequestlogoperation) | **POST** /config | Toggle Slow Request Log |
| [**vote**](OperationsApi.md#vote) | **POST** /operations/vote | Triggers a follower node to initiate the raft voting process, which triggers leader re-election. |



## clearCache

> SuccessStatus clearCache()

Clear the cached responses of search requests in the LRU cache.

Clear the cached responses of search requests that are sent with &#x60;use_cache&#x60; parameter in the LRU cache.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { ClearCacheRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  try {
    const data = await api.clearCache();
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

[**SuccessStatus**](SuccessStatus.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Clear cache succeeded. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## compactDb

> SuccessStatus compactDb()

Compacting the on-disk database

Typesense uses RocksDB to store your documents on the disk. If you do frequent writes or updates, you could benefit from running a compaction of the underlying RocksDB database. This could reduce the size of the database and decrease read latency. While the database will not block during this operation, we recommend running it during off-peak hours.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { CompactDbRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  try {
    const data = await api.compactDb();
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

[**SuccessStatus**](SuccessStatus.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Compacting the on-disk database succeeded. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSchemaChanges

> Array&lt;SchemaChangeStatus&gt; getSchemaChanges()

Get the status of in-progress schema change operations

Returns the status of any ongoing schema change operations. If no schema changes are in progress, returns an empty response.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { GetSchemaChangesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  try {
    const data = await api.getSchemaChanges();
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

[**Array&lt;SchemaChangeStatus&gt;**](SchemaChangeStatus.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of schema changes in progress |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveAPIStats

> APIStatsResponse retrieveAPIStats()

Get stats about API endpoints.

Retrieve the stats about API endpoints.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { RetrieveAPIStatsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  try {
    const data = await api.retrieveAPIStats();
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

[**APIStatsResponse**](APIStatsResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stats fetched. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveMetrics

> object retrieveMetrics()

Get current RAM, CPU, Disk &amp; Network usage metrics.

Retrieve the metrics.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { RetrieveMetricsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  try {
    const data = await api.retrieveMetrics();
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

**object**

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Metrics fetched. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## takeSnapshot

> SuccessStatus takeSnapshot(snapshotPath)

Creates a point-in-time snapshot of a Typesense node\&#39;s state and data in the specified directory.

Creates a point-in-time snapshot of a Typesense node\&#39;s state and data in the specified directory. You can then backup the snapshot directory that gets created and later restore it as a data directory, as needed.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { TakeSnapshotRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  const body = {
    // string | The directory on the server where the snapshot should be saved.
    snapshotPath: snapshotPath_example,
  } satisfies TakeSnapshotRequest;

  try {
    const data = await api.takeSnapshot(body);
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
| **snapshotPath** | `string` | The directory on the server where the snapshot should be saved. | [Defaults to `undefined`] |

### Return type

[**SuccessStatus**](SuccessStatus.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Snapshot is created. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## toggleSlowRequestLog

> SuccessStatus toggleSlowRequestLog(toggleSlowRequestLogRequest)

Toggle Slow Request Log

Enable logging of requests that take over a defined threshold of time. Default is &#x60;-1&#x60; which disables slow request logging. Slow requests are logged to the primary log file, with the prefix SLOW REQUEST.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { ToggleSlowRequestLogOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  const body = {
    // ToggleSlowRequestLogRequest (optional)
    toggleSlowRequestLogRequest: ...,
  } satisfies ToggleSlowRequestLogOperationRequest;

  try {
    const data = await api.toggleSlowRequestLog(body);
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
| **toggleSlowRequestLogRequest** | [ToggleSlowRequestLogRequest](ToggleSlowRequestLogRequest.md) |  | [Optional] |

### Return type

[**SuccessStatus**](SuccessStatus.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Toggle Slow Request Log database succeeded. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## vote

> SuccessStatus vote()

Triggers a follower node to initiate the raft voting process, which triggers leader re-election.

Triggers a follower node to initiate the raft voting process, which triggers leader re-election. The follower node that you run this operation against will become the new leader, once this command succeeds.

### Example

```ts
import {
  Configuration,
  OperationsApi,
} from '';
import type { VoteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new OperationsApi(config);

  try {
    const data = await api.vote();
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

[**SuccessStatus**](SuccessStatus.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Re-election is performed. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


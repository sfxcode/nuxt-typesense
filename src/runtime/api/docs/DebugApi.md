# DebugApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**debug**](DebugApi.md#debug) | **GET** /debug | Print debugging information |



## debug

> Debug200Response debug()

Print debugging information

Print debugging information

### Example

```ts
import {
  Configuration,
  DebugApi,
} from '';
import type { DebugRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new DebugApi(config);

  try {
    const data = await api.debug();
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

[**Debug200Response**](Debug200Response.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Debugging information |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


# PresetsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deletePreset**](PresetsApi.md#deletepreset) | **DELETE** /presets/{presetId} | Delete a preset. |
| [**retrieveAllPresets**](PresetsApi.md#retrieveallpresets) | **GET** /presets | Retrieves all presets. |
| [**retrievePreset**](PresetsApi.md#retrievepreset) | **GET** /presets/{presetId} | Retrieves a preset. |
| [**upsertPreset**](PresetsApi.md#upsertpreset) | **PUT** /presets/{presetId} | Upserts a preset. |



## deletePreset

> PresetDeleteSchema deletePreset(presetId)

Delete a preset.

Permanently deletes a preset, given it\&#39;s name.

### Example

```ts
import {
  Configuration,
  PresetsApi,
} from '';
import type { DeletePresetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new PresetsApi(config);

  const body = {
    // string | The ID of the preset to delete.
    presetId: listing_view,
  } satisfies DeletePresetRequest;

  try {
    const data = await api.deletePreset(body);
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
| **presetId** | `string` | The ID of the preset to delete. | [Defaults to `undefined`] |

### Return type

[**PresetDeleteSchema**](PresetDeleteSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Preset deleted. |  -  |
| **404** | Preset not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveAllPresets

> PresetsRetrieveSchema retrieveAllPresets()

Retrieves all presets.

Retrieve the details of all presets

### Example

```ts
import {
  Configuration,
  PresetsApi,
} from '';
import type { RetrieveAllPresetsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new PresetsApi(config);

  try {
    const data = await api.retrieveAllPresets();
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

[**PresetsRetrieveSchema**](PresetsRetrieveSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Presets fetched. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrievePreset

> PresetSchema retrievePreset(presetId)

Retrieves a preset.

Retrieve the details of a preset, given it\&#39;s name.

### Example

```ts
import {
  Configuration,
  PresetsApi,
} from '';
import type { RetrievePresetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new PresetsApi(config);

  const body = {
    // string | The ID of the preset to retrieve.
    presetId: listing_view,
  } satisfies RetrievePresetRequest;

  try {
    const data = await api.retrievePreset(body);
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
| **presetId** | `string` | The ID of the preset to retrieve. | [Defaults to `undefined`] |

### Return type

[**PresetSchema**](PresetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Preset fetched. |  -  |
| **404** | Preset not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertPreset

> PresetSchema upsertPreset(presetId, presetUpsertSchema)

Upserts a preset.

Create or update an existing preset.

### Example

```ts
import {
  Configuration,
  PresetsApi,
} from '';
import type { UpsertPresetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new PresetsApi(config);

  const body = {
    // string | The name of the preset set to upsert.
    presetId: listing_view,
    // PresetUpsertSchema | The stopwords set to upsert.
    presetUpsertSchema: ...,
  } satisfies UpsertPresetRequest;

  try {
    const data = await api.upsertPreset(body);
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
| **presetId** | `string` | The name of the preset set to upsert. | [Defaults to `undefined`] |
| **presetUpsertSchema** | [PresetUpsertSchema](PresetUpsertSchema.md) | The stopwords set to upsert. | |

### Return type

[**PresetSchema**](PresetSchema.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Preset successfully upserted. |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


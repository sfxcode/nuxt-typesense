# AnalyticsApi

All URIs are relative to *http://localhost:8108*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createAnalyticsEvent**](AnalyticsApi.md#createanalyticsevent) | **POST** /analytics/events | Create an analytics event |
| [**createAnalyticsRule**](AnalyticsApi.md#createanalyticsruleoperation) | **POST** /analytics/rules | Create analytics rule(s) |
| [**deleteAnalyticsRule**](AnalyticsApi.md#deleteanalyticsrule) | **DELETE** /analytics/rules/{ruleName} | Delete an analytics rule |
| [**flushAnalytics**](AnalyticsApi.md#flushanalytics) | **POST** /analytics/flush | Flush in-memory analytics to disk |
| [**getAnalyticsEvents**](AnalyticsApi.md#getanalyticsevents) | **GET** /analytics/events | Retrieve analytics events |
| [**getAnalyticsStatus**](AnalyticsApi.md#getanalyticsstatus) | **GET** /analytics/status | Get analytics subsystem status |
| [**retrieveAnalyticsRule**](AnalyticsApi.md#retrieveanalyticsrule) | **GET** /analytics/rules/{ruleName} | Retrieves an analytics rule |
| [**retrieveAnalyticsRules**](AnalyticsApi.md#retrieveanalyticsrules) | **GET** /analytics/rules | Retrieve analytics rules |
| [**upsertAnalyticsRule**](AnalyticsApi.md#upsertanalyticsrule) | **PUT** /analytics/rules/{ruleName} | Upserts an analytics rule |



## createAnalyticsEvent

> AnalyticsEventCreateResponse createAnalyticsEvent(analyticsEvent)

Create an analytics event

Submit a single analytics event. The event must correspond to an existing analytics rule by name.

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { CreateAnalyticsEventRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  const body = {
    // AnalyticsEvent | The analytics event to be created
    analyticsEvent: ...,
  } satisfies CreateAnalyticsEventRequest;

  try {
    const data = await api.createAnalyticsEvent(body);
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
| **analyticsEvent** | [AnalyticsEvent](AnalyticsEvent.md) | The analytics event to be created | |

### Return type

[**AnalyticsEventCreateResponse**](AnalyticsEventCreateResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Analytics event successfully created |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createAnalyticsRule

> CreateAnalyticsRule200Response createAnalyticsRule(createAnalyticsRuleRequest)

Create analytics rule(s)

Create one or more analytics rules. You can send a single rule object or an array of rule objects.

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { CreateAnalyticsRuleOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  const body = {
    // CreateAnalyticsRuleRequest | The analytics rule(s) to be created
    createAnalyticsRuleRequest: ...,
  } satisfies CreateAnalyticsRuleOperationRequest;

  try {
    const data = await api.createAnalyticsRule(body);
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
| **createAnalyticsRuleRequest** | [CreateAnalyticsRuleRequest](CreateAnalyticsRuleRequest.md) | The analytics rule(s) to be created | |

### Return type

[**CreateAnalyticsRule200Response**](CreateAnalyticsRule200Response.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Analytics rule(s) successfully created |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteAnalyticsRule

> AnalyticsRule deleteAnalyticsRule(ruleName)

Delete an analytics rule

Permanently deletes an analytics rule, given it\&#39;s name

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { DeleteAnalyticsRuleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  const body = {
    // string | The name of the analytics rule to delete
    ruleName: ruleName_example,
  } satisfies DeleteAnalyticsRuleRequest;

  try {
    const data = await api.deleteAnalyticsRule(body);
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
| **ruleName** | `string` | The name of the analytics rule to delete | [Defaults to `undefined`] |

### Return type

[**AnalyticsRule**](AnalyticsRule.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Analytics rule deleted |  -  |
| **404** | Analytics rule not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## flushAnalytics

> AnalyticsEventCreateResponse flushAnalytics()

Flush in-memory analytics to disk

Triggers a flush of analytics data to persistent storage.

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { FlushAnalyticsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  try {
    const data = await api.flushAnalytics();
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

[**AnalyticsEventCreateResponse**](AnalyticsEventCreateResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Flush triggered |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAnalyticsEvents

> AnalyticsEventsResponse getAnalyticsEvents(userId, name, n)

Retrieve analytics events

Retrieve the most recent events for a user and rule.

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { GetAnalyticsEventsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  const body = {
    // string
    userId: userId_example,
    // string | Analytics rule name
    name: name_example,
    // number | Number of events to return (max 1000)
    n: 56,
  } satisfies GetAnalyticsEventsRequest;

  try {
    const data = await api.getAnalyticsEvents(body);
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
| **userId** | `string` |  | [Defaults to `undefined`] |
| **name** | `string` | Analytics rule name | [Defaults to `undefined`] |
| **n** | `number` | Number of events to return (max 1000) | [Defaults to `undefined`] |

### Return type

[**AnalyticsEventsResponse**](AnalyticsEventsResponse.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Events fetched |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAnalyticsStatus

> AnalyticsStatus getAnalyticsStatus()

Get analytics subsystem status

Returns sizes of internal analytics buffers and queues.

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { GetAnalyticsStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  try {
    const data = await api.getAnalyticsStatus();
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

[**AnalyticsStatus**](AnalyticsStatus.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Status fetched |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveAnalyticsRule

> AnalyticsRule retrieveAnalyticsRule(ruleName)

Retrieves an analytics rule

Retrieve the details of an analytics rule, given it\&#39;s name

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { RetrieveAnalyticsRuleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  const body = {
    // string | The name of the analytics rule to retrieve
    ruleName: ruleName_example,
  } satisfies RetrieveAnalyticsRuleRequest;

  try {
    const data = await api.retrieveAnalyticsRule(body);
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
| **ruleName** | `string` | The name of the analytics rule to retrieve | [Defaults to `undefined`] |

### Return type

[**AnalyticsRule**](AnalyticsRule.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Analytics rule fetched |  -  |
| **404** | Analytics rule not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retrieveAnalyticsRules

> Array&lt;AnalyticsRule&gt; retrieveAnalyticsRules(ruleTag)

Retrieve analytics rules

Retrieve all analytics rules. Use the optional rule_tag filter to narrow down results.

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { RetrieveAnalyticsRulesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  const body = {
    // string | Filter rules by rule_tag (optional)
    ruleTag: ruleTag_example,
  } satisfies RetrieveAnalyticsRulesRequest;

  try {
    const data = await api.retrieveAnalyticsRules(body);
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
| **ruleTag** | `string` | Filter rules by rule_tag | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;AnalyticsRule&gt;**](AnalyticsRule.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Analytics rules fetched |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## upsertAnalyticsRule

> AnalyticsRule upsertAnalyticsRule(ruleName, analyticsRuleUpdate)

Upserts an analytics rule

Upserts an analytics rule with the given name.

### Example

```ts
import {
  Configuration,
  AnalyticsApi,
} from '';
import type { UpsertAnalyticsRuleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: api_key_header
    apiKey: "YOUR API KEY",
  });
  const api = new AnalyticsApi(config);

  const body = {
    // string | The name of the analytics rule to upsert
    ruleName: ruleName_example,
    // AnalyticsRuleUpdate | The Analytics rule to be upserted
    analyticsRuleUpdate: ...,
  } satisfies UpsertAnalyticsRuleRequest;

  try {
    const data = await api.upsertAnalyticsRule(body);
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
| **ruleName** | `string` | The name of the analytics rule to upsert | [Defaults to `undefined`] |
| **analyticsRuleUpdate** | [AnalyticsRuleUpdate](AnalyticsRuleUpdate.md) | The Analytics rule to be upserted | |

### Return type

[**AnalyticsRule**](AnalyticsRule.md)

### Authorization

[api_key_header](../README.md#api_key_header)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Analytics rule successfully upserted |  -  |
| **400** | Bad request, see error message for details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


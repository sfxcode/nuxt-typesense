
# APIStatsResponse


## Properties

Name | Type
------------ | -------------
`deleteLatencyMs` | number
`deleteRequestsPerSecond` | number
`importLatencyMs` | number
`importRequestsPerSecond` | number
`latencyMs` | object
`overloadedRequestsPerSecond` | number
`pendingWriteBatches` | number
`requestsPerSecond` | object
`searchLatencyMs` | number
`searchRequestsPerSecond` | number
`totalRequestsPerSecond` | number
`writeLatencyMs` | number
`writeRequestsPerSecond` | number

## Example

```typescript
import type { APIStatsResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "deleteLatencyMs": null,
  "deleteRequestsPerSecond": null,
  "importLatencyMs": null,
  "importRequestsPerSecond": null,
  "latencyMs": null,
  "overloadedRequestsPerSecond": null,
  "pendingWriteBatches": null,
  "requestsPerSecond": null,
  "searchLatencyMs": null,
  "searchRequestsPerSecond": null,
  "totalRequestsPerSecond": null,
  "writeLatencyMs": null,
  "writeRequestsPerSecond": null,
} satisfies APIStatsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as APIStatsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



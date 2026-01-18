
# AnalyticsEvent


## Properties

Name | Type
------------ | -------------
`name` | string
`eventType` | string
`data` | [AnalyticsEventData](AnalyticsEventData.md)

## Example

```typescript
import type { AnalyticsEvent } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "eventType": null,
  "data": null,
} satisfies AnalyticsEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AnalyticsEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



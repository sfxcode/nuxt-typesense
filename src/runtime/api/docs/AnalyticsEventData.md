
# AnalyticsEventData

Event payload

## Properties

Name | Type
------------ | -------------
`userId` | string
`docId` | string
`docIds` | Array&lt;string&gt;
`q` | string
`analyticsTag` | string

## Example

```typescript
import type { AnalyticsEventData } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "docId": null,
  "docIds": null,
  "q": null,
  "analyticsTag": null,
} satisfies AnalyticsEventData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AnalyticsEventData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



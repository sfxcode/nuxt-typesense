
# AnalyticsRuleCreateParams


## Properties

Name | Type
------------ | -------------
`destinationCollection` | string
`limit` | number
`captureSearchRequests` | boolean
`metaFields` | Array&lt;string&gt;
`expandQuery` | boolean
`counterField` | string
`weight` | number

## Example

```typescript
import type { AnalyticsRuleCreateParams } from ''

// TODO: Update the object below with actual values
const example = {
  "destinationCollection": null,
  "limit": null,
  "captureSearchRequests": null,
  "metaFields": null,
  "expandQuery": null,
  "counterField": null,
  "weight": null,
} satisfies AnalyticsRuleCreateParams

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AnalyticsRuleCreateParams
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



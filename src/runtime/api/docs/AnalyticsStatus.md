
# AnalyticsStatus


## Properties

Name | Type
------------ | -------------
`popularPrefixQueries` | number
`nohitsPrefixQueries` | number
`logPrefixQueries` | number
`queryLogEvents` | number
`queryCounterEvents` | number
`docLogEvents` | number
`docCounterEvents` | number

## Example

```typescript
import type { AnalyticsStatus } from ''

// TODO: Update the object below with actual values
const example = {
  "popularPrefixQueries": null,
  "nohitsPrefixQueries": null,
  "logPrefixQueries": null,
  "queryLogEvents": null,
  "queryCounterEvents": null,
  "docLogEvents": null,
  "docCounterEvents": null,
} satisfies AnalyticsStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AnalyticsStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# CreateAnalyticsRule200Response


## Properties

Name | Type
------------ | -------------
`name` | string
`type` | [AnalyticsRuleType](AnalyticsRuleType.md)
`collection` | string
`eventType` | string
`ruleTag` | string
`params` | [AnalyticsRuleCreateParams](AnalyticsRuleCreateParams.md)

## Example

```typescript
import type { CreateAnalyticsRule200Response } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "type": null,
  "collection": null,
  "eventType": null,
  "ruleTag": null,
  "params": null,
} satisfies CreateAnalyticsRule200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateAnalyticsRule200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



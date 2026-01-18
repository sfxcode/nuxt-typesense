
# AnalyticsRule


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
import type { AnalyticsRule } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "type": null,
  "collection": null,
  "eventType": null,
  "ruleTag": null,
  "params": null,
} satisfies AnalyticsRule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AnalyticsRule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



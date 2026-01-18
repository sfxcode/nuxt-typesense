
# CreateAnalyticsRule200ResponseOneOfInner


## Properties

Name | Type
------------ | -------------
`name` | string
`type` | [AnalyticsRuleType](AnalyticsRuleType.md)
`collection` | string
`eventType` | string
`ruleTag` | string
`params` | [AnalyticsRuleCreateParams](AnalyticsRuleCreateParams.md)
`error` | string

## Example

```typescript
import type { CreateAnalyticsRule200ResponseOneOfInner } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "type": null,
  "collection": null,
  "eventType": null,
  "ruleTag": null,
  "params": null,
  "error": null,
} satisfies CreateAnalyticsRule200ResponseOneOfInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateAnalyticsRule200ResponseOneOfInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



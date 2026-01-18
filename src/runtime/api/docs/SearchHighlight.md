
# SearchHighlight


## Properties

Name | Type
------------ | -------------
`field` | string
`snippet` | string
`snippets` | Array&lt;string&gt;
`value` | string
`values` | Array&lt;string&gt;
`indices` | Array&lt;number&gt;
`matchedTokens` | Array&lt;object&gt;

## Example

```typescript
import type { SearchHighlight } from ''

// TODO: Update the object below with actual values
const example = {
  "field": company_name,
  "snippet": <mark>Stark</mark> Industries,
  "snippets": ["<mark>Stark</mark> Industries","<mark>Stark</mark> Corp"],
  "value": <mark>Stark</mark> Industries is a major supplier of space equipment.,
  "values": ["<mark>Stark</mark> Industries","<mark>Stark</mark> Corp"],
  "indices": 1,
  "matchedTokens": null,
} satisfies SearchHighlight

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchHighlight
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



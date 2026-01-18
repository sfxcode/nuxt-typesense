
# SearchResultHitTextMatchInfo


## Properties

Name | Type
------------ | -------------
`bestFieldScore` | string
`bestFieldWeight` | number
`fieldsMatched` | number
`numTokensDropped` | number
`score` | string
`tokensMatched` | number
`typoPrefixScore` | number

## Example

```typescript
import type { SearchResultHitTextMatchInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "bestFieldScore": null,
  "bestFieldWeight": null,
  "fieldsMatched": null,
  "numTokensDropped": null,
  "score": null,
  "tokensMatched": null,
  "typoPrefixScore": null,
} satisfies SearchResultHitTextMatchInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResultHitTextMatchInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



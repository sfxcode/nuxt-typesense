
# SearchResultHit


## Properties

Name | Type
------------ | -------------
`highlights` | [Array&lt;SearchHighlight&gt;](SearchHighlight.md)
`highlight` | { [key: string]: any; }
`document` | { [key: string]: object; }
`textMatch` | number
`textMatchInfo` | [SearchResultHitTextMatchInfo](SearchResultHitTextMatchInfo.md)
`geoDistanceMeters` | { [key: string]: number; }
`vectorDistance` | number
`hybridSearchInfo` | [SearchResultHitHybridSearchInfo](SearchResultHitHybridSearchInfo.md)
`searchIndex` | number

## Example

```typescript
import type { SearchResultHit } from ''

// TODO: Update the object below with actual values
const example = {
  "highlights": null,
  "highlight": null,
  "document": null,
  "textMatch": null,
  "textMatchInfo": null,
  "geoDistanceMeters": null,
  "vectorDistance": null,
  "hybridSearchInfo": null,
  "searchIndex": null,
} satisfies SearchResultHit

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResultHit
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



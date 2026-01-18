
# MultiSearchResultItem


## Properties

Name | Type
------------ | -------------
`facetCounts` | [Array&lt;FacetCounts&gt;](FacetCounts.md)
`found` | number
`foundDocs` | number
`searchTimeMs` | number
`outOf` | number
`searchCutoff` | boolean
`page` | number
`groupedHits` | [Array&lt;SearchGroupedHit&gt;](SearchGroupedHit.md)
`hits` | [Array&lt;SearchResultHit&gt;](SearchResultHit.md)
`requestParams` | [SearchRequestParams](SearchRequestParams.md)
`conversation` | [SearchResultConversation](SearchResultConversation.md)
`unionRequestParams` | [Array&lt;SearchRequestParams&gt;](SearchRequestParams.md)
`metadata` | { [key: string]: any; }
`code` | number
`error` | string

## Example

```typescript
import type { MultiSearchResultItem } from ''

// TODO: Update the object below with actual values
const example = {
  "facetCounts": null,
  "found": null,
  "foundDocs": null,
  "searchTimeMs": null,
  "outOf": null,
  "searchCutoff": null,
  "page": null,
  "groupedHits": null,
  "hits": null,
  "requestParams": null,
  "conversation": null,
  "unionRequestParams": null,
  "metadata": null,
  "code": null,
  "error": null,
} satisfies MultiSearchResultItem

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MultiSearchResultItem
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



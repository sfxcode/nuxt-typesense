
# MultiSearchCollectionParameters


## Properties

Name | Type
------------ | -------------
`q` | string
`queryBy` | string
`queryByWeights` | string
`textMatchType` | string
`prefix` | string
`infix` | string
`maxExtraPrefix` | number
`maxExtraSuffix` | number
`filterBy` | string
`sortBy` | string
`facetBy` | string
`maxFacetValues` | number
`facetQuery` | string
`numTypos` | string
`page` | number
`perPage` | number
`limit` | number
`offset` | number
`groupBy` | string
`groupLimit` | number
`groupMissingValues` | boolean
`includeFields` | string
`excludeFields` | string
`highlightFullFields` | string
`highlightAffixNumTokens` | number
`highlightStartTag` | string
`highlightEndTag` | string
`snippetThreshold` | number
`dropTokensThreshold` | number
`dropTokensMode` | [DropTokensMode](DropTokensMode.md)
`typoTokensThreshold` | number
`enableTyposForAlphaNumericalTokens` | boolean
`filterCuratedHits` | boolean
`enableSynonyms` | boolean
`enableAnalytics` | boolean
`synonymPrefix` | boolean
`synonymNumTypos` | number
`pinnedHits` | string
`hiddenHits` | string
`curationTags` | string
`highlightFields` | string
`preSegmentedQuery` | boolean
`preset` | string
`enableCurations` | boolean
`prioritizeExactMatch` | boolean
`prioritizeTokenPosition` | boolean
`prioritizeNumMatchingFields` | boolean
`enableTyposForNumericalTokens` | boolean
`exhaustiveSearch` | boolean
`searchCutoffMs` | number
`useCache` | boolean
`cacheTtl` | number
`minLen1typo` | number
`minLen2typo` | number
`vectorQuery` | string
`remoteEmbeddingTimeoutMs` | number
`remoteEmbeddingNumTries` | number
`facetStrategy` | string
`stopwords` | string
`facetReturnParent` | string
`voiceQuery` | string
`conversation` | boolean
`conversationModelId` | string
`conversationId` | string
`collection` | string
`xTypesenseApiKey` | string
`rerankHybridMatches` | boolean

## Example

```typescript
import type { MultiSearchCollectionParameters } from ''

// TODO: Update the object below with actual values
const example = {
  "q": null,
  "queryBy": null,
  "queryByWeights": null,
  "textMatchType": null,
  "prefix": null,
  "infix": null,
  "maxExtraPrefix": null,
  "maxExtraSuffix": null,
  "filterBy": num_employees:>100 && country: [USA, UK],
  "sortBy": null,
  "facetBy": null,
  "maxFacetValues": null,
  "facetQuery": null,
  "numTypos": null,
  "page": null,
  "perPage": null,
  "limit": null,
  "offset": null,
  "groupBy": null,
  "groupLimit": null,
  "groupMissingValues": null,
  "includeFields": null,
  "excludeFields": null,
  "highlightFullFields": null,
  "highlightAffixNumTokens": null,
  "highlightStartTag": null,
  "highlightEndTag": null,
  "snippetThreshold": null,
  "dropTokensThreshold": null,
  "dropTokensMode": null,
  "typoTokensThreshold": null,
  "enableTyposForAlphaNumericalTokens": null,
  "filterCuratedHits": null,
  "enableSynonyms": null,
  "enableAnalytics": null,
  "synonymPrefix": null,
  "synonymNumTypos": null,
  "pinnedHits": null,
  "hiddenHits": null,
  "curationTags": null,
  "highlightFields": null,
  "preSegmentedQuery": null,
  "preset": null,
  "enableCurations": null,
  "prioritizeExactMatch": null,
  "prioritizeTokenPosition": null,
  "prioritizeNumMatchingFields": null,
  "enableTyposForNumericalTokens": null,
  "exhaustiveSearch": null,
  "searchCutoffMs": null,
  "useCache": null,
  "cacheTtl": null,
  "minLen1typo": null,
  "minLen2typo": null,
  "vectorQuery": null,
  "remoteEmbeddingTimeoutMs": null,
  "remoteEmbeddingNumTries": null,
  "facetStrategy": null,
  "stopwords": null,
  "facetReturnParent": null,
  "voiceQuery": null,
  "conversation": null,
  "conversationModelId": null,
  "conversationId": null,
  "collection": null,
  "xTypesenseApiKey": null,
  "rerankHybridMatches": null,
} satisfies MultiSearchCollectionParameters

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MultiSearchCollectionParameters
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



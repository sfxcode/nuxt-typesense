
# MultiSearchParameters

Parameters for the multi search API. 

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
`enableLazyFilter` | boolean
`maxFilterByCandidates` | number
`sortBy` | string
`facetBy` | string
`maxFacetValues` | number
`facetQuery` | string
`facetQueryNumTypos` | number
`numTypos` | string
`page` | number
`perPage` | number
`limit` | number
`offset` | number
`groupBy` | string
`groupLimit` | number
`groupMissingValues` | boolean
`groupMaxCandidates` | number
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
`demoteSynonymMatch` | boolean
`synonymNumTypos` | number
`pinnedHits` | string
`hiddenHits` | string
`curationTags` | string
`highlightFields` | string
`rerankHybridMatches` | boolean
`preSegmentedQuery` | boolean
`preset` | string
`enableCurations` | boolean
`prioritizeExactMatch` | boolean
`prioritizeTokenPosition` | boolean
`prioritizeNumMatchingFields` | boolean
`enableTyposForNumericalTokens` | boolean
`exhaustiveSearch` | boolean
`searchCutoffMs` | number
`limitHits` | number
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
`facetSamplePercent` | number
`facetSampleThreshold` | number
`facetSampleSlope` | number
`voiceQuery` | string
`conversation` | boolean
`conversationModelId` | string
`conversationId` | string
`validateFieldNames` | boolean

## Example

```typescript
import type { MultiSearchParameters } from ''

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
  "enableLazyFilter": null,
  "maxFilterByCandidates": null,
  "sortBy": null,
  "facetBy": null,
  "maxFacetValues": null,
  "facetQuery": null,
  "facetQueryNumTypos": null,
  "numTypos": null,
  "page": null,
  "perPage": null,
  "limit": null,
  "offset": null,
  "groupBy": null,
  "groupLimit": null,
  "groupMissingValues": null,
  "groupMaxCandidates": null,
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
  "demoteSynonymMatch": null,
  "synonymNumTypos": null,
  "pinnedHits": null,
  "hiddenHits": null,
  "curationTags": null,
  "highlightFields": null,
  "rerankHybridMatches": null,
  "preSegmentedQuery": null,
  "preset": null,
  "enableCurations": null,
  "prioritizeExactMatch": null,
  "prioritizeTokenPosition": null,
  "prioritizeNumMatchingFields": null,
  "enableTyposForNumericalTokens": null,
  "exhaustiveSearch": null,
  "searchCutoffMs": null,
  "limitHits": null,
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
  "facetSamplePercent": null,
  "facetSampleThreshold": null,
  "facetSampleSlope": null,
  "voiceQuery": null,
  "conversation": null,
  "conversationModelId": null,
  "conversationId": null,
  "validateFieldNames": null,
} satisfies MultiSearchParameters

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MultiSearchParameters
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



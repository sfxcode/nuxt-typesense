
# PresetUpsertSchemaValue


## Properties

Name | Type
------------ | -------------
`q` | string
`queryBy` | string
`nlQuery` | boolean
`nlModelId` | string
`queryByWeights` | string
`textMatchType` | string
`prefix` | string
`infix` | string
`maxExtraPrefix` | number
`maxExtraSuffix` | number
`filterBy` | string
`maxFilterByCandidates` | number
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
`enableHighlightV1` | boolean
`enableAnalytics` | boolean
`snippetThreshold` | number
`synonymSets` | string
`dropTokensThreshold` | number
`dropTokensMode` | [DropTokensMode](DropTokensMode.md)
`typoTokensThreshold` | number
`enableTyposForAlphaNumericalTokens` | boolean
`filterCuratedHits` | boolean
`enableSynonyms` | boolean
`synonymPrefix` | boolean
`synonymNumTypos` | number
`pinnedHits` | string
`hiddenHits` | string
`curationTags` | string
`highlightFields` | string
`splitJoinTokens` | string
`preSegmentedQuery` | boolean
`preset` | string
`enableCurations` | boolean
`prioritizeExactMatch` | boolean
`maxCandidates` | number
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
`union` | boolean
`searches` | [Array&lt;MultiSearchCollectionParameters&gt;](MultiSearchCollectionParameters.md)

## Example

```typescript
import type { PresetUpsertSchemaValue } from ''

// TODO: Update the object below with actual values
const example = {
  "q": null,
  "queryBy": null,
  "nlQuery": null,
  "nlModelId": null,
  "queryByWeights": null,
  "textMatchType": null,
  "prefix": null,
  "infix": null,
  "maxExtraPrefix": null,
  "maxExtraSuffix": null,
  "filterBy": num_employees:>100 && country: [USA, UK],
  "maxFilterByCandidates": null,
  "sortBy": num_employees:desc,
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
  "enableHighlightV1": null,
  "enableAnalytics": null,
  "snippetThreshold": null,
  "synonymSets": synonym_set_1,synonym_set_2,
  "dropTokensThreshold": null,
  "dropTokensMode": null,
  "typoTokensThreshold": null,
  "enableTyposForAlphaNumericalTokens": null,
  "filterCuratedHits": null,
  "enableSynonyms": null,
  "synonymPrefix": null,
  "synonymNumTypos": null,
  "pinnedHits": null,
  "hiddenHits": null,
  "curationTags": null,
  "highlightFields": null,
  "splitJoinTokens": null,
  "preSegmentedQuery": null,
  "preset": null,
  "enableCurations": null,
  "prioritizeExactMatch": null,
  "maxCandidates": null,
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
  "union": null,
  "searches": null,
} satisfies PresetUpsertSchemaValue

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PresetUpsertSchemaValue
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



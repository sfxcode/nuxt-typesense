
# CurationItemSchema


## Properties

Name | Type
------------ | -------------
`rule` | [CurationRule](CurationRule.md)
`includes` | [Array&lt;CurationInclude&gt;](CurationInclude.md)
`excludes` | [Array&lt;CurationExclude&gt;](CurationExclude.md)
`filterBy` | string
`removeMatchedTokens` | boolean
`metadata` | object
`sortBy` | string
`replaceQuery` | string
`filterCuratedHits` | boolean
`effectiveFromTs` | number
`effectiveToTs` | number
`stopProcessing` | boolean
`id` | string

## Example

```typescript
import type { CurationItemSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "rule": null,
  "includes": null,
  "excludes": null,
  "filterBy": null,
  "removeMatchedTokens": null,
  "metadata": null,
  "sortBy": null,
  "replaceQuery": null,
  "filterCuratedHits": null,
  "effectiveFromTs": null,
  "effectiveToTs": null,
  "stopProcessing": null,
  "id": null,
} satisfies CurationItemSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CurationItemSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



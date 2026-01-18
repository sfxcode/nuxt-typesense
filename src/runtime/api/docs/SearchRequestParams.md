
# SearchRequestParams


## Properties

Name | Type
------------ | -------------
`collectionName` | string
`q` | string
`perPage` | number
`voiceQuery` | [SearchRequestParamsVoiceQuery](SearchRequestParamsVoiceQuery.md)

## Example

```typescript
import type { SearchRequestParams } from ''

// TODO: Update the object below with actual values
const example = {
  "collectionName": null,
  "q": null,
  "perPage": null,
  "voiceQuery": null,
} satisfies SearchRequestParams

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchRequestParams
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



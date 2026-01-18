
# MultiSearchResult


## Properties

Name | Type
------------ | -------------
`results` | [Array&lt;MultiSearchResultItem&gt;](MultiSearchResultItem.md)
`conversation` | [SearchResultConversation](SearchResultConversation.md)

## Example

```typescript
import type { MultiSearchResult } from ''

// TODO: Update the object below with actual values
const example = {
  "results": null,
  "conversation": null,
} satisfies MultiSearchResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MultiSearchResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



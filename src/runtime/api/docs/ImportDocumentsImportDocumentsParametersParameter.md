
# ImportDocumentsImportDocumentsParametersParameter


## Properties

Name | Type
------------ | -------------
`batchSize` | number
`returnId` | boolean
`remoteEmbeddingBatchSize` | number
`returnDoc` | boolean
`action` | [IndexAction](IndexAction.md)
`dirtyValues` | [DirtyValues](DirtyValues.md)

## Example

```typescript
import type { ImportDocumentsImportDocumentsParametersParameter } from ''

// TODO: Update the object below with actual values
const example = {
  "batchSize": null,
  "returnId": null,
  "remoteEmbeddingBatchSize": null,
  "returnDoc": null,
  "action": null,
  "dirtyValues": null,
} satisfies ImportDocumentsImportDocumentsParametersParameter

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ImportDocumentsImportDocumentsParametersParameter
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



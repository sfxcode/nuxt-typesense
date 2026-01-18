
# DeleteDocumentsDeleteDocumentsParametersParameter


## Properties

Name | Type
------------ | -------------
`filterBy` | string
`batchSize` | number
`ignoreNotFound` | boolean
`truncate` | boolean

## Example

```typescript
import type { DeleteDocumentsDeleteDocumentsParametersParameter } from ''

// TODO: Update the object below with actual values
const example = {
  "filterBy": num_employees:>100 && country: [USA, UK],
  "batchSize": null,
  "ignoreNotFound": null,
  "truncate": null,
} satisfies DeleteDocumentsDeleteDocumentsParametersParameter

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DeleteDocumentsDeleteDocumentsParametersParameter
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



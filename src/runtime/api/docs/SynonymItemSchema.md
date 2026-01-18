
# SynonymItemSchema


## Properties

Name | Type
------------ | -------------
`synonyms` | Array&lt;string&gt;
`root` | string
`locale` | string
`symbolsToIndex` | Array&lt;string&gt;
`id` | string

## Example

```typescript
import type { SynonymItemSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "synonyms": null,
  "root": null,
  "locale": null,
  "symbolsToIndex": null,
  "id": null,
} satisfies SynonymItemSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SynonymItemSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



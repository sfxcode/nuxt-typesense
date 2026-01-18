
# SynonymSetSchema


## Properties

Name | Type
------------ | -------------
`items` | [Array&lt;SynonymItemSchema&gt;](SynonymItemSchema.md)
`name` | string

## Example

```typescript
import type { SynonymSetSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "items": null,
  "name": null,
} satisfies SynonymSetSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SynonymSetSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



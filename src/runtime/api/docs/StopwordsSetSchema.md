
# StopwordsSetSchema


## Properties

Name | Type
------------ | -------------
`id` | string
`stopwords` | Array&lt;string&gt;
`locale` | string

## Example

```typescript
import type { StopwordsSetSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "stopwords": null,
  "locale": null,
} satisfies StopwordsSetSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StopwordsSetSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



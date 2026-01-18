
# StemmingDictionary


## Properties

Name | Type
------------ | -------------
`id` | string
`words` | [Array&lt;StemmingDictionaryWordsInner&gt;](StemmingDictionaryWordsInner.md)

## Example

```typescript
import type { StemmingDictionary } from ''

// TODO: Update the object below with actual values
const example = {
  "id": irregular-plurals,
  "words": null,
} satisfies StemmingDictionary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StemmingDictionary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



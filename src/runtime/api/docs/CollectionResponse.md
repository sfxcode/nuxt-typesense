
# CollectionResponse


## Properties

Name | Type
------------ | -------------
`name` | string
`fields` | [Array&lt;Field&gt;](Field.md)
`defaultSortingField` | string
`tokenSeparators` | Array&lt;string&gt;
`synonymSets` | Array&lt;string&gt;
`enableNestedFields` | boolean
`symbolsToIndex` | Array&lt;string&gt;
`voiceQueryModel` | [VoiceQueryModelCollectionConfig](VoiceQueryModelCollectionConfig.md)
`metadata` | object
`numDocuments` | number
`createdAt` | number

## Example

```typescript
import type { CollectionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "name": companies,
  "fields": [{name=num_employees, type=int32, facet=false}, {name=company_name, type=string, facet=false}, {name=country, type=string, facet=true}],
  "defaultSortingField": num_employees,
  "tokenSeparators": null,
  "synonymSets": null,
  "enableNestedFields": true,
  "symbolsToIndex": null,
  "voiceQueryModel": null,
  "metadata": null,
  "numDocuments": null,
  "createdAt": null,
} satisfies CollectionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CollectionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



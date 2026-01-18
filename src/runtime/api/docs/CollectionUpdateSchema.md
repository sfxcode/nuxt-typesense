
# CollectionUpdateSchema


## Properties

Name | Type
------------ | -------------
`fields` | [Array&lt;Field&gt;](Field.md)
`synonymSets` | Array&lt;string&gt;
`metadata` | object

## Example

```typescript
import type { CollectionUpdateSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "fields": [{"name":"company_name","type":"string","facet":false},{"name":"num_employees","type":"int32","facet":false},{"name":"country","type":"string","facet":true}],
  "synonymSets": null,
  "metadata": null,
} satisfies CollectionUpdateSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CollectionUpdateSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



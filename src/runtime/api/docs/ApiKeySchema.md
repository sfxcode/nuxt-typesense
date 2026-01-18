
# ApiKeySchema


## Properties

Name | Type
------------ | -------------
`value` | string
`description` | string
`actions` | Array&lt;string&gt;
`collections` | Array&lt;string&gt;
`expiresAt` | number

## Example

```typescript
import type { ApiKeySchema } from ''

// TODO: Update the object below with actual values
const example = {
  "value": null,
  "description": null,
  "actions": null,
  "collections": null,
  "expiresAt": null,
} satisfies ApiKeySchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiKeySchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



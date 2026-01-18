
# ApiKey


## Properties

Name | Type
------------ | -------------
`value` | string
`description` | string
`actions` | Array&lt;string&gt;
`collections` | Array&lt;string&gt;
`expiresAt` | number
`id` | number
`valuePrefix` | string

## Example

```typescript
import type { ApiKey } from ''

// TODO: Update the object below with actual values
const example = {
  "value": null,
  "description": null,
  "actions": null,
  "collections": null,
  "expiresAt": null,
  "id": null,
  "valuePrefix": null,
} satisfies ApiKey

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiKey
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



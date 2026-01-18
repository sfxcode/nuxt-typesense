
# ConversationModelUpdateSchema


## Properties

Name | Type
------------ | -------------
`id` | string
`modelName` | string
`apiKey` | string
`historyCollection` | string
`accountId` | string
`systemPrompt` | string
`ttl` | number
`maxBytes` | number
`vllmUrl` | string

## Example

```typescript
import type { ConversationModelUpdateSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "modelName": null,
  "apiKey": null,
  "historyCollection": null,
  "accountId": null,
  "systemPrompt": null,
  "ttl": null,
  "maxBytes": null,
  "vllmUrl": null,
} satisfies ConversationModelUpdateSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ConversationModelUpdateSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



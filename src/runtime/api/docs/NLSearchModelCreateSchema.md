
# NLSearchModelCreateSchema


## Properties

Name | Type
------------ | -------------
`modelName` | string
`apiKey` | string
`apiUrl` | string
`maxBytes` | number
`temperature` | number
`systemPrompt` | string
`topP` | number
`topK` | number
`stopSequences` | Array&lt;string&gt;
`apiVersion` | string
`projectId` | string
`accessToken` | string
`refreshToken` | string
`clientId` | string
`clientSecret` | string
`region` | string
`maxOutputTokens` | number
`accountId` | string
`id` | string

## Example

```typescript
import type { NLSearchModelCreateSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "modelName": null,
  "apiKey": null,
  "apiUrl": null,
  "maxBytes": null,
  "temperature": null,
  "systemPrompt": null,
  "topP": null,
  "topK": null,
  "stopSequences": null,
  "apiVersion": null,
  "projectId": null,
  "accessToken": null,
  "refreshToken": null,
  "clientId": null,
  "clientSecret": null,
  "region": null,
  "maxOutputTokens": null,
  "accountId": null,
  "id": null,
} satisfies NLSearchModelCreateSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NLSearchModelCreateSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



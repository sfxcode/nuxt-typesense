
# Field


## Properties

Name | Type
------------ | -------------
`name` | string
`type` | string
`optional` | boolean
`facet` | boolean
`index` | boolean
`locale` | string
`sort` | boolean
`infix` | boolean
`reference` | string
`asyncReference` | boolean
`numDim` | number
`drop` | boolean
`store` | boolean
`vecDist` | string
`rangeIndex` | boolean
`stem` | boolean
`stemDictionary` | string
`tokenSeparators` | Array&lt;string&gt;
`symbolsToIndex` | Array&lt;string&gt;
`embed` | [FieldEmbed](FieldEmbed.md)

## Example

```typescript
import type { Field } from ''

// TODO: Update the object below with actual values
const example = {
  "name": company_name,
  "type": string,
  "optional": true,
  "facet": false,
  "index": true,
  "locale": el,
  "sort": true,
  "infix": true,
  "reference": null,
  "asyncReference": null,
  "numDim": 256,
  "drop": true,
  "store": null,
  "vecDist": null,
  "rangeIndex": null,
  "stem": null,
  "stemDictionary": irregular-plurals,
  "tokenSeparators": null,
  "symbolsToIndex": null,
  "embed": null,
} satisfies Field

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Field
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



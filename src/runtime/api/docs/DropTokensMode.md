
# DropTokensMode

Dictates the direction in which the words in the query must be dropped when the original words in the query do not appear in any document. Values: right_to_left (default), left_to_right, both_sides:3 A note on both_sides:3 - for queries up to 3 tokens (words) in length, this mode will drop tokens from both sides and exhaustively rank all matching results. If query length is greater than 3 words, Typesense will just fallback to default behavior of right_to_left 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { DropTokensMode } from ''

// TODO: Update the object below with actual values
const example = {
} satisfies DropTokensMode

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DropTokensMode
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



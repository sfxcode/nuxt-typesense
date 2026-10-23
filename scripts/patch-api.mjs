// Re-applies the manual fixes the OpenAPI generator output needs.
// Run automatically after `pnpm api-codegen`; safe to run repeatedly.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const apiDir = new URL('../src/runtime/api/', import.meta.url).pathname

function patch(file, fn) {
  const path = join(apiDir, file)
  const before = readFileSync(path, 'utf8')
  const after = fn(before)
  if (after !== before) {
    writeFileSync(path, after)
    console.log(`patched ${file}`)
  }
}

function replaceOnce(src, from, to, file) {
  if (src.includes(to)) return src
  if (!src.includes(from)) throw new Error(`${file}: expected snippet not found:\n${from}`)
  return src.replace(from, to)
}

// 1. DocumentsApi: search params are query parameters, drop undefined values
patch('apis/DocumentsApi.ts', (src) => {
  const file = 'apis/DocumentsApi.ts'
  src = replaceOnce(
    src,
    `} from '../models/index';\n`,
    `} from '../models/index';\n\nimport {removeUndefined} from "../../utils/api";\n`,
    file,
  )
  for (const [param, toJson] of [['multiSearchParameters', 'MultiSearchParametersToJSON'], ['searchParameters', 'SearchParametersToJSON']]) {
    src = replaceOnce(
      src,
      `        const queryParameters: any = {};\n\n        if (requestParameters['${param}'] != null) {\n            queryParameters['${param}'] = requestParameters['${param}'];\n        }`,
      `        let queryParameters: any = {};\n\n        if (requestParameters['${param}'] != null) {\n          queryParameters = removeUndefined(${toJson}(requestParameters.${param}));\n        }`,
      file,
    )
  }
  return src
})

// 2. Error subclass property must be marked `override` (TS 4.3+ noImplicitOverride)
patch('runtime.ts', src =>
  replaceOnce(src, 'constructor(public cause: Error', 'constructor(public override cause: Error', 'runtime.ts'))

// 3. Duplicate import emitted for oneOf-array models
patch('models/CreateAnalyticsRuleRequest.ts', src =>
  src.replace(/(import type \{ AnalyticsRuleCreate \} from '\.\/AnalyticsRuleCreate';\nimport \{[^}]*\} from '\.\/AnalyticsRuleCreate';\n)(?=[\s\S]*\1)/, ''))

// 4. Missing type guard for the oneOf union
patch('models/CreateAnalyticsRule200ResponseOneOfInner.ts', src =>
  replaceOnce(
    src,
    `export function CreateAnalyticsRule200ResponseOneOfInnerFromJSON(`,
    `/**\n * Check if a given object implements the CreateAnalyticsRule200ResponseOneOfInner interface.\n */\nexport function instanceOfCreateAnalyticsRule200ResponseOneOfInner(value: object): value is CreateAnalyticsRule200ResponseOneOfInner {\n    return instanceOfAnalyticsRule(value) || instanceOfCreateAnalyticsRule200ResponseOneOfInnerOneOf(value);\n}\n\nexport function CreateAnalyticsRule200ResponseOneOfInnerFromJSON(`,
    'models/CreateAnalyticsRule200ResponseOneOfInner.ts',
  ))

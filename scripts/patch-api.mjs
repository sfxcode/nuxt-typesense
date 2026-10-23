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

// 5. Fields the Typesense server supports that the OpenAPI spec lacks
// Adds `prop` to a model (interface, FromJSON and ToJSON), placed after the property `after`.
function addField(file, { after, prop, json, type, doc }) {
  patch(`models/${file}.ts`, (src) => {
    if (src.includes(`    ${prop}?: ${type};`)) return src
    const iface = new RegExp(`(    ${after}\\?: [^;]+;\\n)`)
    const fromJson = new RegExp(`(        '${after}': json\\['[a-z_]+'\\][^\\n]*\\n)`)
    const toJson = new RegExp(`(        '[a-z_]+': value\\['${after}'\\],\\n)`)
    for (const re of [iface, fromJson, toJson]) {
      if (!re.test(src)) throw new Error(`models/${file}.ts: anchor for "${after}" not found (${re})`)
    }
    return src
      .replace(iface, `$1    /**\n     * ${doc}\n     */\n    ${prop}?: ${type};\n`)
      .replace(fromJson, `$1        '${prop}': json['${json}'] == null ? undefined : json['${json}'],\n`)
      .replace(toJson, `$1        '${json}': value['${prop}'],\n`)
  })
}

// Linking a curation set to a collection works on the server (verified against Typesense 30.2: the
// collection returns `curation_sets` and applies the pins). A per-query `curation_sets` search parameter
// and `synonym_sets` inside multi-search entries are accepted but ignored, so they are not added here.
for (const file of ['CollectionSchema', 'CollectionUpdateSchema', 'CollectionResponse'])
  addField(file, { after: 'synonymSets', prop: 'curationSets', json: 'curation_sets', type: 'Array<string>', doc: 'Names of the curation sets linked to this collection.' })

// 6. Typesense 30 rejects curation items without an id, but the spec marks it optional
patch('models/CurationItemCreateSchema.ts', src =>
  src.includes('    id: string;') ? src : replaceOnce(src, '    id?: string;', '    id: string;', 'models/CurationItemCreateSchema.ts'))

// 7. The stemming import body is JSON Lines text, but the spec declares application/json, so the
// generated client JSON-encodes the string and Typesense rejects it. Send it as plain text instead.
patch('apis/StemmingApi.ts', (src) => {
  const marker = 'async importStemmingDictionaryRaw('
  const start = src.indexOf(marker)
  if (start === -1) throw new Error('apis/StemmingApi.ts: importStemmingDictionaryRaw not found')
  const from = `headerParameters['Content-Type'] = 'application/json';`
  const at = src.indexOf(from, start)
  if (at === -1) return src // already patched
  return src.slice(0, at) + `headerParameters['Content-Type'] = 'text/plain';` + src.slice(at + from.length)
})

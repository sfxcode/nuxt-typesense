import { describe, it, expect } from 'vitest'
import { removeUndefined } from '../src/runtime/utils/api'

describe('removeUndefined', () => {
  it('drops undefined values and keeps everything else', () => {
    expect(removeUndefined({ a: 1, b: undefined, c: null, d: 0, e: '', f: false }))
      .toEqual({ a: 1, c: null, d: 0, e: '', f: false })
  })

  it('does not mutate the input', () => {
    const input = { a: 1, b: undefined }
    const result = removeUndefined(input)
    expect(result).not.toBe(input)
    expect('b' in input).toBe(true)
  })

  it('returns an empty object when all values are undefined', () => {
    expect(removeUndefined({ a: undefined })).toEqual({})
  })
})

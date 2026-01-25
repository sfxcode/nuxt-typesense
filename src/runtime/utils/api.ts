/**
 * Remove undefined values from an object
 * Returns a new object without modifying the original
 * @param obj - The object to clean
 * @returns A new object with undefined values removed
 */
export function removeUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  const result: Partial<T> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      if (value !== undefined) {
        result[key] = value
      }
    }
  }

  return result
}

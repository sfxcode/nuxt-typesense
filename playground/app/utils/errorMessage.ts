/**
 * Message for a failed `$fetch` call. The module's proxy routes return the upstream
 * Typesense message in `error.data.message`, which is more useful than the generic fetch error text.
 */
export function errorMessage(error: unknown, fallback = 'Unexpected error') {
  const data = (error as { data?: { message?: string } } | null)?.data
  return data?.message || (error instanceof Error ? error.message : fallback)
}

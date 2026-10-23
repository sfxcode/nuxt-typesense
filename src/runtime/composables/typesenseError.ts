import { describeTypesenseError } from '../utils/typesenseErrors'

/**
 * Turns errors thrown by the browser API clients into `{ statusCode, message }`,
 * using the status and message Typesense returned.
 */
export const useTypesenseError = () => ({ describeError: describeTypesenseError })

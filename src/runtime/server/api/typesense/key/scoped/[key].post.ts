import { createError, defineEventHandler, getRouterParam, readBody } from 'h3'
import type { SearchParameters } from '../../../../../api/models'
import { createHmac } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const keyIdParam = getRouterParam(event, 'key')
  if (!keyIdParam) {
    throw createError({
      statusCode: 400,
      message: 'Key ID is required',
    })
  }

  const searchParameters: Partial<SearchParameters> = await readBody<Partial<SearchParameters>>(event)
  const searchParametersString: string = JSON.stringify(searchParameters)
  const digest: string = createHmac('sha256', keyIdParam).update(searchParametersString).digest('base64')
  const keyIdParamPrefix = keyIdParam.slice(0, 4)
  return Buffer.from(`${digest}${keyIdParamPrefix}${searchParametersString}`).toString('base64')
})

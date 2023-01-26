import { ApiResponseStatusEnum } from '../constants/api-response-status.enum'
import { ApiError } from './api-error'
import { request } from './request'

export const appFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T | undefined> => {
  const response = await request<T>(url, options)
  if (!response) return

  if (response.status === 400) throw new ApiError(ApiResponseStatusEnum.ValidationError)
  if (response.status === 402) throw new ApiError(ApiResponseStatusEnum.DownstreamFailure)
  if (response.status === 404) throw new ApiError(ApiResponseStatusEnum.NotFound)
  if (response.status === 409) throw new ApiError(ApiResponseStatusEnum.Conflict)
  if (response.status === 500) throw new ApiError(ApiResponseStatusEnum.Failure)
  if (response.status >= 400) throw new ApiError(`${response.status}`)

  return response.json()
}
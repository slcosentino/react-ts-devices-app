interface TypedResponse<T = any> extends Response {
  json(): Promise<T>
}

export const request = async <T = any>(url: string, options?: RequestInit): Promise<TypedResponse<T> | undefined> => {
  const response = await fetch(url, {    
    ...options
  })

  return response
}

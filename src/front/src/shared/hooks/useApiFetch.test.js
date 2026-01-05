import { renderHook, waitFor } from '@testing-library/react'
import { useApiFetch } from './useApiFetch'
import { apiClient } from '../services/api-client.js'

jest.mock('../services/api-client.js', () => ({
  apiClient: {
    get: jest.fn(),
  },
}))

describe('useApiFetch', () => {
  
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch data successfully', async () => {
    jest.mocked(apiClient.get).mockResolvedValue([])
    
    const { result } = renderHook(() => useApiFetch('/files/data', {}))
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toHaveLength(0)
    expect(result.current.error).toBe(null)
    expect(result.current.loading).toBe(false)
  })

  it('should return an error if the API call fails', async () => {
    jest.mocked(apiClient.get).mockRejectedValue(new Error('API call failed'))
    
    const { result } = renderHook(() => useApiFetch('/files/data', {}))
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toStrictEqual(new Error('API call failed'))
    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
  })
})



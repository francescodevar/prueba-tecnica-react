import { RandomUserApiResponse } from '../types/User.js'
import { API_CONFIG } from '../constants/config.js'

export const userApi = {
  getUsers: async (
    count: number = API_CONFIG.RESULTS_PER_PAGE
  ): Promise<RandomUserApiResponse> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}?results=${count}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      throw new Error(
        `Failed to fetch users from API: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  },

  getUsersWithOffset: async (
    count: number = API_CONFIG.RESULTS_PER_PAGE,
    page: number = 1
  ): Promise<RandomUserApiResponse> => {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}?results=${count}&page=${page}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      throw new Error(
        `Failed to fetch users from API: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  },
}

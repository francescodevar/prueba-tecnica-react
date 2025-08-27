import { User, SortOption } from '../types/User.js'
import { STORAGE_KEYS } from '../constants/config.js'

export const storage = {
  saveUsers: (users: User[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    } catch (error) {
      console.error('Failed to save users to localStorage:', error)
    }
  },

  loadUsers: (): User[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load users from localStorage:', error)
      return []
    }
  },

  saveSearchTerm: (searchTerm: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm)
    } catch (error) {
      console.error('Failed to save search term to localStorage:', error)
    }
  },

  loadSearchTerm: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SEARCH_TERM) || ''
    } catch (error) {
      console.error('Failed to load search term from localStorage:', error)
      return ''
    }
  },

  saveSortOption: (sortOption: SortOption): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SORT_OPTION, sortOption)
    } catch (error) {
      console.error('Failed to save sort option to localStorage:', error)
    }
  },

  loadSortOption: (): SortOption => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SORT_OPTION)
      return (stored as SortOption) || 'nameAsc'
    } catch (error) {
      console.error('Failed to load sort option from localStorage:', error)
      return 'nameAsc'
    }
  },

  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  },
}

import { createContext } from 'react'
import { User, SortOption } from '../types/User.js'

export interface UserProfileContextType {
  users: User[]
  loading: boolean
  loadingMore: boolean
  loadingMoreButton: boolean
  loadingNewProfile: boolean
  error: string | null
  searchTerm: string
  sortOption: SortOption
  selectedUser: User | null
  isModalOpen: boolean
  hasUsers: boolean
  userCount: number

  setSearchTerm: (value: string) => void
  setSortOption: (option: SortOption) => void
  generateNewProfile: () => void
  loadMoreProfiles: (isFromButton?: boolean) => void
  deleteUser: (userId: string) => void
  deleteAllUsers: () => void
  viewUser: (user: User) => void
  closeModal: () => void
  retryFetch: () => void
}
export const UserProfileContext = createContext<
  UserProfileContextType | undefined
>(undefined)

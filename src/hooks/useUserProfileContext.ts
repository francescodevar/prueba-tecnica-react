import { useContext } from 'react'
import { UserProfileContext } from '../context/UserProfileContext.js'
import { UserProfileContextType } from '../types/UserProfileContext.js'

export const useUserProfileContext = (): UserProfileContextType => {
  const context = useContext(UserProfileContext)
  return context!
}

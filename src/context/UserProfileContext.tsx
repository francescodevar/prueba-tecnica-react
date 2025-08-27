import { createContext } from 'react'
import { UserProfileContextType } from '../types/UserProfileContext.js'

export const UserProfileContext = createContext<
    UserProfileContextType | undefined
>(undefined)



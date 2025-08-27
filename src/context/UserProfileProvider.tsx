import React, { ReactNode } from 'react'
import { useUserProfiles } from '../hooks/useUserProfiles.js'
import { UserProfileContext } from './UserProfileContext.js'

interface UserProfileProviderProps {
    children: ReactNode
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
    const userProfileData = useUserProfiles()

    return (
        <UserProfileContext.Provider value={userProfileData}>
            {children}
        </UserProfileContext.Provider>
    )
}


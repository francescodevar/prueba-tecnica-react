import React from 'react';
import { Users } from 'lucide-react';
import { useUserProfileContext } from '../hooks/useUserProfileContext.js';
import ProfileCard from './ProfileCard';

const ProfileGrid: React.FC = () => {
    const { users, searchTerm } = useUserProfileContext();
    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-64 p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Users className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-primary mb-2">
                    {searchTerm ? 'No profiles found' : 'No profiles yet'}
                </h3>

                <p className="text-secondary max-w-md">
                    {searchTerm
                        ? `No profiles match "${searchTerm}". Try adjusting your search terms.`
                        : 'Start by generating some user profiles to see them here.'
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
                <ProfileCard
                    key={user.login.uuid}
                    user={user}
                    index={index}
                />
            ))}
        </div>
    );
};

export default ProfileGrid;


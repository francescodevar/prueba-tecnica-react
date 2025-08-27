import React from 'react';
import { MapPin, Mail, Phone, Trash2 } from 'lucide-react';
import { User } from '../types/User.js';
import { useUserProfileContext } from '../hooks/useUserProfileContext.js';
import { formatFullName, formatPhoneNumber } from '../utils/helpers.js';

interface ProfileCardProps {
    user: User;
    index?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, index = 0 }) => {
    const { viewUser, deleteUser } = useUserProfileContext();

    const handleView = () => {
        viewUser(user);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteUser(user.login.uuid);
    };

    return (
        <div className="bg-white border border-border-light rounded-lg shadow-custom-sm transition-all duration-150 hover:shadow-custom-md hover:-translate-y-0.5 cursor-pointer relative p-6" onClick={handleView}>
            <button
                onClick={handleDelete}
                className="absolute top-4 right-4 p-2 text-text-light cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                aria-label={`Delete ${formatFullName(user)}`}
            >
                <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex justify-center mb-4">
                <div className="relative">
                    <img
                        src={user.picture.large}
                        alt={formatFullName(user)}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        loading={index < 6 ? "eager" : "lazy"}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
            </div>

            <div className="text-center mb-4">
                <h3 className="font-semibold text-primary text-lg mb-1">
                    {formatFullName(user)}
                </h3>
                <div className="flex items-center justify-center text-text-secondary text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location.city}, {user.location.country}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center text-sm text-text-secondary">
                    <Mail className="w-4 h-4 mr-2 text-text-light" />
                    <span className="truncate">{user.email}</span>
                </div>

                <div className="flex items-center text-sm text-text-secondary">
                    <Phone className="w-4 h-4 mr-2 text-text-light" />
                    <span>{formatPhoneNumber(user.phone)}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border-light">
                <p className="text-xs text-text-light text-center">
                    Click to view details
                </p>
            </div>
        </div>
    );
};

export default ProfileCard;

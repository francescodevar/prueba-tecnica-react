import React, { useEffect } from 'react';
import { X, MapPin, Mail, Phone, Calendar, Clock, User as UserIcon } from 'lucide-react';
import { useUserProfileContext } from '../hooks/useUserProfileContext.js';
import { formatFullName, formatAddress, formatDate, formatPhoneNumber } from '../utils/helpers.js';

const ProfileModal: React.FC = () => {
    const { selectedUser: user, isModalOpen: isOpen, closeModal } = useUserProfileContext();
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, closeModal]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (!isOpen || !user) return null;

    return (
        <div className="modal-overlay fade-in" onClick={handleOverlayClick}>
            <div className="modal-content fade-in">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-xl font-semibold text-primary">Profile Details</h2>
                    <button
                        onClick={closeModal}
                        className="p-2 text-text-light hover:text-text-secondary hover:bg-surface rounded-full transition-all duration-200"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>


                <div className="p-6">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={user.picture.large}
                            alt={formatFullName(user)}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                        />
                        <h3 className="text-2xl font-bold text-primary mb-1">
                            {formatFullName(user)}
                        </h3>
                        <p className="text-text-secondary capitalize">{user.gender}</p>
                    </div>


                    <div className="space-y-4">

                        <div className="flex items-start">
                            <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <div>
                                <p className="font-medium text-primary mb-1">Address</p>
                                <p className="text-text-secondary text-sm">{formatAddress(user)}</p>
                                <p className="text-text-light text-xs mt-1">
                                    Coordinates: {user.location.coordinates.latitude}, {user.location.coordinates.longitude}
                                </p>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                <div>
                                    <p className="font-medium text-primary mb-1">Email</p>
                                    <p className="text-text-secondary text-sm break-all">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                <div>
                                    <p className="font-medium text-primary mb-1">Phone</p>
                                    <p className="text-text-secondary text-sm">{formatPhoneNumber(user.phone)}</p>
                                    <p className="text-text-light text-xs">Cell: {formatPhoneNumber(user.cell)}</p>
                                </div>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <Calendar className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                <div>
                                    <p className="font-medium text-primary mb-1">Date of Birth</p>
                                    <p className="text-text-secondary text-sm">{formatDate(user.dob.date)}</p>
                                    <p className="text-light text-xs">{user.dob.age} years old</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Clock className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                <div>
                                    <p className="font-medium text-primary mb-1">Timezone</p>
                                    <p className="text-secondary text-sm">{user.location.timezone.offset}</p>
                                    <p className="text-light text-xs">{user.location.timezone.description}</p>
                                </div>
                            </div>
                        </div>


                        <div className="flex items-start">
                            <UserIcon className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <div>
                                <p className="font-medium text-primary mb-1">Registration</p>
                                <p className="text-secondary text-sm">
                                    Member since {formatDate(user.registered.date)}
                                </p>
                                <p className="text-light text-xs">
                                    {user.registered.age} years as member • Username: {user.login.username}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-end p-6 border-t border-border-light bg-surface">
                    <button
                        onClick={closeModal}
                        className="btn btn-primary"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;


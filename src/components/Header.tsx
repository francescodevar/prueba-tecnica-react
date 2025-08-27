import React from 'react';
import { UserPlus, MoreHorizontal, Trash2 } from 'lucide-react';
import { useUserProfileContext } from '../hooks/useUserProfileContext.js';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import LoadingSpinner from './LoadingSpinner';

const Header: React.FC = () => {
    const {
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
        generateNewProfile,
        loadMoreProfiles,
        deleteAllUsers,
        loadingNewProfile,
        loadingMoreButton,
        userCount,
        hasUsers
    } = useUserProfileContext();
    return (
        <div className="sticky top-0 bg-white/80 backdrop-blur-xs border-b border-border-light z-10">
            <div className="container py-3 sm:py-4 lg:py-6">
                {/* Title */}
                <div className="mb-3 sm:mb-4 lg:mb-6">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1 sm:mb-2">
                        User Profile Card Creator
                    </h1>
                    <p className="text-sm sm:text-base text-text-secondary hidden sm:block">
                        Generate, search, and manage user profiles with ease
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
                    {/* Search */}
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search by name or country..."
                    />

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        {/* Sort */}
                        {hasUsers && (
                            <div className="w-full sm:w-auto">
                                <SortButton
                                    currentSort={sortOption}
                                    onSortChange={setSortOption}
                                />
                            </div>
                        )}

                        {/* Action Buttons Container */}
                        <div className="flex flex-row gap-2">
                            {/* Generate New */}
                            <button
                                onClick={generateNewProfile}
                                disabled={loadingNewProfile}
                                className="btn btn-primary btn-responsive btn-compact"
                            >
                                {loadingNewProfile ? (
                                    <LoadingSpinner size="sm" text="" color="white" />
                                ) : (
                                    <UserPlus className="w-4 h-4 flex-shrink-0" />
                                )}
                                <span className="whitespace-nowrap hidden sm:inline">New Profile</span>
                                <span className="whitespace-nowrap sm:hidden">New</span>
                            </button>

                            {/* Load More */}
                            <button
                                onClick={() => loadMoreProfiles(true)}
                                disabled={loadingMoreButton}
                                className="btn btn-secondary btn-responsive btn-compact"
                            >
                                {loadingMoreButton ? (
                                    <LoadingSpinner size="sm" text="" />
                                ) : (
                                    <MoreHorizontal className="w-4 h-4 flex-shrink-0" />
                                )}
                                <span className="whitespace-nowrap hidden sm:inline">Load More</span>
                                <span className="whitespace-nowrap sm:hidden">More</span>
                            </button>

                            {/* Delete All */}
                            {hasUsers && (
                                <button
                                    onClick={deleteAllUsers}
                                    className="btn btn-danger btn-responsive btn-compact"
                                >
                                    <Trash2 className="w-4 h-4 flex-shrink-0" />
                                    <span className="whitespace-nowrap sm:inline">Delete All</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                {hasUsers && (
                    <div className="text-xs sm:text-sm text-text-secondary">
                        Showing {userCount} profile{userCount !== 1 ? 's' : ''}
                        {searchTerm && (
                            <>
                                <span className="hidden sm:inline"> matching "{searchTerm}"</span>
                                <span className="sm:hidden"> for "{searchTerm}"</span>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;


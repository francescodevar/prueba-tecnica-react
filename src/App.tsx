import React from 'react';
import { UserProfileProvider } from './context/UserProfileProvider';
import { useUserProfileContext } from './hooks/useUserProfileContext';
import Header from './components/Header';
import ProfileGrid from './components/ProfileGrid';
import ProfileModal from './components/ProfileModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './styles.css'

const AppContent: React.FC = () => {
    const { loading, loadingMore, error, hasUsers, retryFetch } = useUserProfileContext();

    return (
        <div className="min-h-screen bg-surface">
            <Header />

            <main className="container py-8">
                {error ? (
                    <ErrorMessage message={error} onRetry={retryFetch} />
                ) : loading && !hasUsers ? (
                    <LoadingSpinner
                        variant="initial"
                        text="Loading profiles..."
                        size="lg"
                    />
                ) : (
                    <>
                        <ProfileGrid />

                        {loadingMore && (
                            <div className="mt-8">
                                <LoadingSpinner
                                    variant="subsequent"
                                    text="Loading more profiles..."
                                    size="md"
                                />
                            </div>
                        )}
                    </>
                )}
            </main>

            <ProfileModal />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <UserProfileProvider>
            <AppContent />
        </UserProfileProvider>
    );
};

export default App;


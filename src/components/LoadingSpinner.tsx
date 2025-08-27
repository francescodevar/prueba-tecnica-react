import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    variant?: 'initial' | 'subsequent';
    color?: 'primary' | 'white';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    text = 'Loading...',
    variant = 'initial',
    color = 'primary'
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'w-4 h-4';
            case 'lg':
                return 'w-8 h-8';
            default:
                return 'w-6 h-6';
        }
    };

    const getContainerClasses = () => {
        if (variant === 'initial') {
            return 'flex flex-col items-center justify-center min-h-64 p-8';
        }
        return 'flex items-center justify-center p-4';
    };

    const getColorClass = () => {
        return color === 'white' ? 'text-white' : 'text-primary';
    };

    if (!text || text === '') {
        return <Loader2 className={`${getSizeClasses()} spinner ${getColorClass()}`} />;
    }

    return (
        <div className={getContainerClasses()}>
            <Loader2 className={`${getSizeClasses()} spinner ${getColorClass()}`} />
            <p className="mt-2 text-secondary font-medium">{text}</p>
        </div>
    );
};

export default LoadingSpinner;


import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    showRetry?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    onRetry,
    showRetry = true
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-64 p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-error" />
            </div>

            <h3 className="text-lg font-semibold text-primary mb-2">
                Oops! Something went wrong
            </h3>

            <p className="text-secondary mb-6 max-w-md">
                {message}
            </p>

            {showRetry && onRetry && (
                <button
                    onClick={onRetry}
                    className="btn btn-primary"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;


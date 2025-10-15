"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
};

// Full page error message
export const PageError: React.FC<{ message: string; onRetry?: () => void }> = ({ 
  message, 
  onRetry 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ErrorMessage message={message} onRetry={onRetry} />
    </div>
  );
};
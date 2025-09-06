import { useState, useCallback } from 'react';
import { User } from '@/types';
import { authService } from '@/services/api';
import { storage } from '@/lib/utils';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (phone: string): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.login(phone);
      storage.set('user', user);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطایی در ورود رخ داده است';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    storage.remove('user');
    setError(null);
  };

  const getCurrentUser = (): User | null => {
    return storage.get('user');
  };

  const clearError = () => setError(null);

  return {
    login,
    logout,
    getCurrentUser,
    isLoading,
    error,
    clearError,
  };
};
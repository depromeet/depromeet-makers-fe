import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { USER_TOKEN_KEY } from '@/constants/auth';

interface AuthContextProps {
  userToken: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [userToken, setUserToken] = useState<string | null>(null);

  const signIn = async (token: string) => {
    setUserToken(token);
    await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
  };

  const signOut = async () => {
    setUserToken(null);
    await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);

        if (!token) return;

        setUserToken(token);
      } catch (error) {
        console.error('Failed to load token', error);
      }
    };

    loadToken();
  }, [router]);

  return <AuthContext.Provider value={{ userToken, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

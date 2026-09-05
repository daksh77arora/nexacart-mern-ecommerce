import React, { createContext, useEffect, useState } from 'react';
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setUser(null);
      localStorage.removeItem('userInfo');
      return;
    }

    const syncUser = async () => {
      const token = await getToken();
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Unable to sync Clerk user');
      const databaseUser = await response.json();
      const sessionUser = { ...databaseUser, token };
      setUser(sessionUser);
      localStorage.setItem('userInfo', JSON.stringify(sessionUser));
    };

    syncUser().catch((error) => console.error(error));
  }, [getToken, isLoaded, isSignedIn, clerkUser]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    signOut();
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useState, useEffect,useCallback } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('jwt_token');
    if (stored) {
      setToken(stored);
      setIsAuthenticated(true);
    }
  }, []);

    // Silent refresh every 5 minutes
   useEffect(() => {
    if (!token) return; // nothing to refresh

    const interval = setInterval(() => {
      // Re‑write the *same* token – mimics a real refresh endpoint
      localStorage.setItem('jwt_token', token);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  const login = () => {
    const mockToken = `mock-jwt-${Date.now()}`;
    localStorage.setItem('jwt_token', mockToken);
    setToken(mockToken);
    setIsAuthenticated(true);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('jwt_token');
    location.reload();
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout, token };
}
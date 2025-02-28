import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser)?.role === 'admin' : false;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.login(credentials);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginAsAdmin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser = { email, role: 'admin' };
        setUser(adminUser);
        setIsAdmin(true);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
      }
      throw new Error('Invalid admin credentials');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAdmin, 
        loading, 
        error, 
        login, 
        loginAsAdmin, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
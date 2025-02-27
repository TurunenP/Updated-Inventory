import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API from '../API/Api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // No need to load before login
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await API.get(
        '/api/users/getuser',
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await API.post(
        '/api/users/login',
        { email, password },
       { withCredentials: true},
      );
        setUser(response.data);
      console.log(response.data)

      if (response.data.role === 'admin') {
        navigate('/Staff'); // Redirect to the admin dashboard
      } else {
        navigate('/Student'); // Redirect to the user dashboard
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.get('/api/users/logout', {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

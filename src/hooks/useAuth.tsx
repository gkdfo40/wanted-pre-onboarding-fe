import axios from 'axios';
import { createContext, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProps } from 'types';

import { useLocalStorage } from './useLocalStorage';

interface AccessToken {
  access_token: string;
}
interface AuthContextProps {
  user: AccessToken | null;
  login: (data: userProps) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (data: userProps) => {
    const response = await axios.post(
      'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin',
      data
    );
    console.log(response);
    if (response.status === 404) {
      return;
    }
    setUser(response.data);
    navigate('/protected/todos', { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

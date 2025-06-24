import { estadoLoginGlobal } from '../context/contexData';
import React, { useState } from 'react';

export default function StateLogin({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return (
    <estadoLoginGlobal.Provider value={{ login, logout, isLogin }}>
      {children}
    </estadoLoginGlobal.Provider>
  );
}

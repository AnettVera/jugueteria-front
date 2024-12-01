import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { authManager } from './auth-manager';

const initialAuthState = {
  user: {
    signed: false,
    roles: [{type: localStorage.getItem('role') || 'CLIENT'}],
  },
};

const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authManager, initialAuthState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };

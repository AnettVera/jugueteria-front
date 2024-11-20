import React, { useContext, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { AuthContext } from '../config/context/auth-context';
import RegisterPage from './../modules/auth/RegisterPage';
import SignInPage from './../modules/auth/SignInPage';
import NotFound from "../modules/errors/NotFound";
import DashboardPage from "../modules/admin/DashboardPage";
import LandingPage from "../modules/user/LandingPage";

const AppRouter = () => {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // Aquí puedes agregar lógica para verificar el token y obtener el rol del usuario
      // Por ejemplo, decodificar el token y obtener el rol
      const roles = [{ type: 'CLIENT' }]; // Reemplaza esto con la lógica real para obtener el rol
      dispatch({ type: 'SIGNIN', payload: { roles } });
    }
  }, [dispatch]);

  const routesFromRole = (role) => {
    switch (role) {
      case 'ADMIN':
        return <Route path="/" element={<DashboardPage />} />;
      case 'CLIENT':
        return <Route path="/" element={<LandingPage />} />;
      default:
        return null;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        {user.signed ? (
          <>
            {routesFromRole(user?.roles[0]?.type)}
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="login" element={<SignInPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
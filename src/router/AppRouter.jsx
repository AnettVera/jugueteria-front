import React, { useContext, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { AuthContext } from '../config/context/auth-context';
import RegisterPage from './../modules/auth/RegisterPage';
import SignInPage from './../modules/auth/SignInPage';
import NotFound from "../modules/errors/NotFound";

import LandingPage from "../modules/user/LandingPage";
import Product from "../modules/user/Product";

import PasswordRecovery from "../modules/auth/PasswordRecovery";
import NewPassword from "../modules/auth/NewPassword";

//Admin
import AdminLayout from "./../components/Admin/layout/AdminLayout";
import DashboardPage from "../modules/admin/DashboardPage";
import ProductsPage from "../modules/admin/ProductsPage";
import ReturnPage from "../modules/admin/RetunrPage";
import SpecificReturnPage from "../modules/admin/SpecificReturnPage";

const AppRouter = () => {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const roles = [{ type: 'CLIENT' }];
      dispatch({ type: 'SIGNIN', payload: { roles } });
    }
  }, [dispatch]);

  const routesFromRole = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route path="devoluciones" element={<ReturnPage />} />
            <Route path="/devoluciones/producto/:productId" element={<SpecificReturnPage />} />
          </Route>
        );
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
        <Route path="login" element={<SignInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="recovery-password" element={<PasswordRecovery />} />
        <Route path="reset-password" element={<NewPassword />} />

        {user.signed ? (
          <>
            {routesFromRole(user?.roles[0]?.type)}
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
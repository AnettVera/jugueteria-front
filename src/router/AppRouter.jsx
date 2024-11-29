import React, { useContext } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
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

const AppRouter = () => {
  const { user } = useContext(AuthContext);

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
          </Route>
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}

        <Route path="login" element={<SignInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </>
    ))} />
   );
  };

export default AppRouter;

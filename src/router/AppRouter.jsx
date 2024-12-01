import React, { useContext, useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { AuthContext } from '../config/context/auth-context';

import RegisterPage from './../modules/auth/RegisterPage';
import SignInPage from './../modules/auth/SignInPage';
import NotFound from "../modules/errors/NotFound";

import LandingPage from "../modules/user/LandingPage";
import Product from "../modules/user/Product";
import Carrito from "./../modules/user/Carrito";
import PurchaseDetails from './../modules/user/PurchaseDetails';
import PurchaseHistory from "./../modules/user/PurchaseHistory";


import PasswordRecovery from "../modules/auth/PasswordRecovery";
import NewPassword from "../modules/auth/NewPassword";

//Admin
import AdminLayout from "./../components/Admin/layout/AdminLayout";
import DashboardPage from "../modules/admin/DashboardPage";
import ProductsPage from "../modules/admin/ProductsPage";
import ReturnPage from "../modules/admin/ReturnPage";
import SpecificReturnPage from "../modules/admin/SpecificReturnPage";

//cajero
import Home from "../modules/countersalesman/Home";

import Loading from "../components/shared/Loading";

const AppRouter = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('role');
    if (token && role) {
      const roles = [{ type: role }];
      dispatch({ type: 'SIGNIN', payload: { roles } });
    }
    // Agregar un retraso artificial de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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
            <Route path="devoluciones/producto/:productId" element={<SpecificReturnPage />} />
          </Route>
        );
      case 'CLIENT':
        return (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="producto/:productName" element={<Product />} />
            <Route path="carrito-de-compras" element={<Carrito />} />
            <Route path="historial" element={<PurchaseHistory />} />
            <Route path="historial/detalles/:id" element={<PurchaseDetails />} />
          </>
        )
      case 'countersaleman':
        return(
          <>
          <Route path="/" element={<Home/>}/>
          </>
        )

      default:
        return null;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="carrito-de-compras" element={<Carrito />} />
        <Route path="producto/:id" element={<Product />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="recovery-password" element={<PasswordRecovery />} />
        <Route path="reset-password" element={<NewPassword />} />
        
        {loading ? (
          <Route path="*" element={<Loading />} />
        ) : user.signed ? (
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
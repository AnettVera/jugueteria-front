import React, {useContext} from "react";
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from 'react-router-dom';
import AuthContext from './../config/context/auth-context';
//Sin iniciar sesion
import RegisterPage from './../modules/auth/RegisterPage';
import SignInPage from './../modules/auth/SignInPage';
import NotFound from "../modules/errors/NotFound";
//Cliente

//Administrador

//Cajero

const AppRouter=()=>{
    const {user}= useContext(AuthContext);

    const routesFromRole=(role)=>{
        switch(role){
            case 'ADMIN':
                return(
                    <></>
                );
            case 'CLIENT':
                return(
                    <></>
                );
            case 'StoreCashier':
                return(
                    <></>
                );
        };
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
            {user.signed ?(
                <>
                {routesFromRole(user?.roles[0]?.type)}
                </>
            ): (
                <>
                <Route path="/" element={<></>}/>
                <Route path="inicio_sesion" element={<SignInPage/>}/>
                <Route path="registro" element={<RegisterPage/>}/>
                </>
            )};
            <Route path="/*" element={<NotFound/>}/>
            </>
        ));

        return <RouterProvider router={router}/>
}

export default AppRouter;
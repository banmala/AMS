import AuthLayout from '@/layout/AuthLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import React from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';


const AuthRoute: Array<RouteObject> = [
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />
      }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />,
  },
];

export default AuthRoute;

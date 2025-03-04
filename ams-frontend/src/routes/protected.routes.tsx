import React from 'react';
import Dashboard from '@/pages/Dashboard';
import { Navigate, RouteObject } from 'react-router-dom';
import ProtectedLayout from '@/layout/ProtectedLayout';

export const ProtectedRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'/dashboard'} replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
];

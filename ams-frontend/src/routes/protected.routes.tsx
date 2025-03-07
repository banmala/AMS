import React from 'react';
import Dashboard from '@/pages/Dashboard';
import { Navigate, RouteObject } from 'react-router-dom';
import ProtectedLayout from '@/layout/ProtectedLayout';
import Music from '@/pages/Music';
import Artist from '@/pages/Artist';
import Users from '@/pages/Users';
import UpdateUsers from '@/pages/CreateUpdateUser';
import MusicDetail from '@/pages/MusicDetail';
import ArtistDetail from '@/pages/ArtistDetail';
import UserDetail from '@/pages/UserDetail';

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
        path: '/music',
        element: <Music />,
      },
      {
        path: '/musicDetail/:id',
        element: <MusicDetail />,
      },
      {
        path: '/artist',
        element: <Artist />,
      },
      {
        path: '/artist/:id',
        element: <ArtistDetail />,
      },
      {
        path: '/user',
        element: <Users />,
      },
      {
        path: '/userDetail/:id',
        element: <UserDetail />,
      },
      {
        path: '/updateUsers',
        element: <UpdateUsers />,
      },
      {
        path: '/updateUsers/:userId',
        element: <UpdateUsers />,
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
];

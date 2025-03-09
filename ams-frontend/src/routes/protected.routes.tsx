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
import UpdateMusics from '@/pages/UpdateMusics';
import UpdateArtists from '@/pages/UpdateArtists';

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
        path: '/musicDetail/:musicId',
        element: <MusicDetail />,
      },
      {
        path: '/artist',
        element: <Artist />,
      },
      {
        path: '/artist/:artistId',
        element: <ArtistDetail />,
      },
      {
        path: '/user',
        element: <Users />,
      },
      {
        path: '/userDetail/:userId',
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
        path: '/updateMusics',
        element: <UpdateMusics />,
      },
      {
        path: '/updateMusics/:musicId',
        element: <UpdateMusics />,
      },
      {
        path: '/updateArtists',
        element: <UpdateArtists />,
      },
      {
        path: '/updateArtists/:artistId',
        element: <UpdateArtists />,
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
];

// import { RedirectHOC } from './redirect.hook';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <h1>Auth Layout</h1>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

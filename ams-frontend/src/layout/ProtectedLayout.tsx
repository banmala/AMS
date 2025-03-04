import React from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from '@app/components/Sidebar';
// import Header from '@app/components/Header';
import { RedirectHOC } from './redirect.hook';

export default function ProtectedLayout() {
  return (
    <RedirectHOC>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
        {/* <Sidebar /> */}
        <div className="flex flex-col">
          {/* <Header /> */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </RedirectHOC>
  );
}

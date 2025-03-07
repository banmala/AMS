// import { RedirectHOC } from './redirect.hook';
import { useAppSelector } from '@/store';
import { Outlet, redirect, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const { authenticated } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  if (authenticated) {
    redirect('/dashboard');
  }
  return (
    <div className='h-[100vh]'>
      <h1>Auth Layout</h1>
      <div className='flex justify-center items-center h-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

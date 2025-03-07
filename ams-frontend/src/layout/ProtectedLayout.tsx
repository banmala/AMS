import { Outlet, useNavigate,Link, redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAuthUser, logoutUser } from '@/store/slices/auth.slice';
import Header from '@/components/Header';

export default function ProtectedLayout() {
  const { authUser, authenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  if(authenticated && !authUser){
    dispatch(fetchAuthUser())
  }
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
}

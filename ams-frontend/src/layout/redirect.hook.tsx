import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAuthUser } from '@/store/slices/auth.slice';
import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const RedirectHOC: React.FC<PropsWithChildren> = props => {
  const { children } = props;
  const { authenticated, authUser } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authenticated) {
      if (!authUser) {
        dispatch(fetchAuthUser());
      }
      navigate('/dashboard');
    } else {
      navigate('/auth/login');
    }
  }, [authenticated]);

  return <>{children}</>;
};

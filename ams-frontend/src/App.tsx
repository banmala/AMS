import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthRoute from './routes/auth.routes';
import { ProtectedRoutes } from './routes/protected.routes';
import { useAppSelector } from './store';
import { ERole } from './@types/auth.type';
import Users from './pages/Users';

function App() {
  const routes = [];
  const {authenticated,authUser} = useAppSelector(state => state.auth);
  if (authenticated) {
    routes.push(...ProtectedRoutes);
  } else {
    routes.push(...AuthRoute);
  }
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App

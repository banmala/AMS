import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthRoute from './routes/auth.routes';
import { ProtectedRoutes } from './routes/protected.routes';
import { useAppSelector } from './store';
import { ERole } from './@types/auth.type';
import Users from './pages/Users';
import Snackbar from './components/SnackBar';

const createRoutes = (authenticated: boolean) => {
  return authenticated ? [...ProtectedRoutes] : [...AuthRoute];
};

function App() {
  const { authenticated } = useAppSelector((state) => state.auth);
  const router = createBrowserRouter(createRoutes(authenticated));

  return (
    <>
      <RouterProvider router={router} />
      <Snackbar />
    </>
  );
}

export default App

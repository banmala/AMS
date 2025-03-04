import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import AuthRoute from './routes/auth.routes';
import { ProtectedRoutes } from './routes/protected.routes';
import { useAppSelector } from './store';

function App() {
  const routes = [];
  const authenticated = useAppSelector(state => state.auth.authenticated);
  if (authenticated) {
    routes.push(...ProtectedRoutes);
  } else {
    routes.push(...AuthRoute);
  }
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App

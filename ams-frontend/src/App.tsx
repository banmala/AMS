import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard';
import { AuthRedirectRoute } from './context/AuthRedirectRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './context/ProtectedRoute';
import ProtectedLayout from './layout/ProtectedLayout';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/">
            <Route index element={<AuthRedirectRoute element={<Home />} />} />
            <Route
              path="/login"
              element={<AuthRedirectRoute element={<Login />} />}
            />
            <Route
              path="/register"
              element={<AuthRedirectRoute element={<Register />} />}
            />
            <Route element= {<ProtectedLayout element={<ProtectedRoute />} />} >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App

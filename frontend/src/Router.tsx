import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/Profilesettings',
    element: <Settings />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;

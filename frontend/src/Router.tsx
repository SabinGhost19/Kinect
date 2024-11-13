import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Profile from './pages/Profile';

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
]);

const Router = () => <RouterProvider router={router} />;

export default Router;

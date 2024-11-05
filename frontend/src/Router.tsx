import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';

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
    path: '/login',
    element: <LogIn />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;

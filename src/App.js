import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home/index';
import Login from './pages/Login/index';
import Admin from './pages/Admin/index';
import Error from "./pages/Error";
import Private from './routes/Private';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Private><Admin /></Private>
  },
  {
    path: '/profile',
    element: <Private><Profile /></Private>
  },
  {
    path: '*',
    element: <Error />
  }
])

export { router };
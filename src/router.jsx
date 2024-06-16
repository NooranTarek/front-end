import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from './pages/register/register'; 
import Login from './pages/login/login';
import ResetPassword from './pages/resetPassword/resetPassword';
import Articles from './pages/articles/articles';
import Source from './pages/sources/sources';
import Layout from './components/layout';
import History from './pages/history/history';
import Home from './pages/home/home';

const router = createBrowserRouter([

  {

    path: '/',
    element: <Layout />, 
    children: [
      {
        path: 'articles',
        element: <Articles />, 
      },
      {
        path: 'sources',
        element: <Source />,
      },
      {
        path: 'history',
        element: <History />,
      },
      ,
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '',
        element: <Home />,
      },
    ]},
    
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },



]);



export default router;

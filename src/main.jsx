import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import Loader from './components/Loader/Loader.jsx';
import transition from './utils/transition.jsx';

// Lazy + Animated Pages
const Home = transition(
  lazy(() => import('./pages/Home/Home')),
  'home'
);
const Login = transition(lazy(() => import('./pages/Login/Login')));
const VerifyEmail = transition(
  lazy(() => import('./pages/VerifyEmail/VerifyEmail'))
);
const ResetPassword = transition(
  lazy(() => import('./pages/ResetPassword/ResetPassword'))
);
const UserPage = transition(
  lazy(() => import('./pages/UserPage/UserPage'), 'user-page')
);

// Suspense Wrapper
const withSuspense = (Component) => (
  <Suspense
    fallback={
      <Loader
        height={'100px'}
        width={'100px'}
        bdWidth={'10px'}
      />
    }>
    <Component />
  </Suspense>
);

// React Router Setup
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: 'login',
        element: withSuspense(Login),
      },
      {
        path: 'verify/email',
        element: withSuspense(VerifyEmail),
      },
      {
        path: 'reset/password',
        element: withSuspense(ResetPassword),
      },
      {
        path: 'user-page',
        element: withSuspense(UserPage),
      },
    ],
  },
]);

// Render to DOM
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home/Home'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail/VerifyEmail'));
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword'));
const Login = lazy(() => import('./pages/Login/Login'));

import { AuthContextProvider } from './context/AuthContext.jsx';
import Loader from './components/Loader/Loader.jsx';

// Wrap lazy-loaded components with Suspense
const withSuspense = (Component) => (
  <Suspense
    fallback={
      <div className="flex">
        <Loader />
      </div>
    }>
    <Component />
  </Suspense>
);

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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

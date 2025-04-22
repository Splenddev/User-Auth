import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import React from 'react';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import Login from './pages/Login/Login.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'verify/email',
        element: <VerifyEmail />,
      },
      {
        path: 'reset/password',
        element: <ResetPassword />,
      },
    ],
  },
]);
// import App from '../AppTest/AppTest.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

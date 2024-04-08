import { protectRoutes } from '@vaadin/hilla-react-auth';
import LoginView from 'Frontend/views/login/LoginView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import WelcomeView from 'Frontend/views/welcome/WelcomeView.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const InfoView = lazy(async () => import('Frontend/views/info/InfoView.js'));

const routing = protectRoutes([
  {
    element: <MainLayout />,
    handle: { title: 'Main' },
    children: [
      { path: '/', element: <WelcomeView />, handle: { title: 'Welcome' } },
      { path: '/info', element: <InfoView />, handle: { title: 'Info', requiresLogin: true } },
    ],
  },
  { path: '/login', element: <LoginView /> },
]) as RouteObject[];

export const routes = routing;
export default createBrowserRouter(routes);

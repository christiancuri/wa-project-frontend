import React from 'react';
import { Redirect } from 'react-router';

import { PrivateLayout } from '../layout/Private';
import { DashboardPage } from '../pages/Dashboard';
import { ExamsPage } from '../pages/Exam';
import { LabaratoriesPage } from '../pages/Labs';
import { RouteConfig } from './Route';

export const publicRoutes: RouteConfig[] = [
  {
    path: '',
    component: PrivateLayout,
    routes: [
      {
        path: '',
        exact: true,
        component: () => <Redirect to="/dashboard" />,
      },
      {
        path: 'dashboard',
        exact: true,
        component: DashboardPage,
      },
      {
        path: 'exams',
        exact: true,
        component: ExamsPage,
      },
      {
        path: 'labs',
        exact: true,
        component: LabaratoriesPage,
      },
    ],
  },
];

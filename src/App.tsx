/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PetList } from './components/PetList';
import { PetForm } from './components/PetForm';
import { PetDetails } from './components/PetDetails';
import { usePets } from './hooks/usePets';

const Root = () => {
  const petData = usePets();
  return <Outlet context={petData} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Root />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'pets', element: <PetList /> },
          { path: 'pets/new', element: <PetForm /> },
          { path: 'pets/:id', element: <PetDetails /> },
          { path: 'pets/:id/edit', element: <PetForm /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}


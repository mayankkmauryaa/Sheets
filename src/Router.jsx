import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import LandingPage from './features/landing/LandingPage';

// Route wrapper component that syncs URL params with store
const SheetRoute = () => {
    return <App />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/u/all',
        element: <SheetRoute />
    },
    {
        path: '/u/:slug',
        element: <SheetRoute />
    },
    {
        path: '*',
        element: <Navigate to="/u/all" replace />
    }
]);

export default function Router() {
    return <RouterProvider router={router} />;
}

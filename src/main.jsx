import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Properties from './pages/Properties.jsx'
import RootLayout from './components/layouts/RootLayout.jsx'
import PropertyForm from './pages/PropertyForm.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx';
import Register from './pages/Authentication/Register.jsx';
import Login from './pages/Authentication/Login.jsx';
import Authenticated from './utilities/Authenticated.jsx';
import { AuthProvider } from './hooks/AuthContext.jsx';
import Profile from './pages/User/Profile.jsx';

export const queryClient = new QueryClient()
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Properties />} />
    <Route path="properties" element={<Properties />} />
    <Route element={<Authenticated/>}>
      <Route path="properties/create" element={<PropertyForm />} />
      <Route path="users/profile" element={<Profile />} />
    </Route>
    <Route path="properties/:id" element={<PropertyDetail />} />
    <Route path="users/register" element={<Register />} />
    <Route path="users/login" element={<Login />} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

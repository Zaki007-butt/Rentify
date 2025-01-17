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
import UserProperties from './pages/User/UserProperties.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx';
import Register from './pages/Authentication/Register.jsx';
import Login from './pages/Authentication/Login.jsx';
import Authenticated from './utilities/Authenticated.jsx';
import { AuthProvider } from './hooks/AuthContext.jsx';
import Profile from './pages/User/Profile.jsx';
import Customers from './pages/User/Customers.jsx';
import UserPropertyManage from './pages/User/UserPropertyManage.jsx';
import Agreements from './pages/User/Agreements.jsx';
import CustomerAgreements from './pages/Customer/Agreements.jsx';
import AgreementForm from './pages/Customer/AgreementForm.jsx';
import AgreementDetail from './pages/AgreementDetail.jsx';
import CustomerForm from './pages/Customer/CustomerForm.jsx';
import ProfileUpdateForm from './pages/User/ProfileForm.jsx'
import CustomerDetail from './pages/User/CustomerDetail.jsx'
import PaymentForm from './pages/User/PaymentForm.jsx'
import UserPayments from './pages/Customer/Payments'
import UtilityBillForm from './pages/User/UtilityBillForm'
import UserUtilityBills from './pages/Customer/UtilityBills'
import PaymentsList from "./pages/User/PaymentsList";
import UtilityBillsList from "./pages/User/UtilityBillsList";
import Dashboard from './pages/Admin/Dashboard';

export const queryClient = new QueryClient()

let basename = '/';
if (import.meta.env.NODE_ENV === 'production') {
  basename = '/RealEstate-Frontend/';
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Properties />} />
    <Route path="properties" element={<Properties />} />
    <Route path="admin" element={<Authenticated admin />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="properties" element={<UserProperties />} />
      <Route path="properties/create" element={<PropertyForm />} />
      <Route path="properties/:id" element={<UserPropertyManage />} />
      <Route path="properties/:id/edit" element={<PropertyForm />} />
      <Route path="customers" element={<Customers />} />
      <Route path="customers/:id" element={<CustomerDetail />} />
      <Route path="agreements" element={<Agreements />} />
      <Route path="agreements/:id" element={<AgreementDetail />} />
      <Route path="agreements/:id/payments" element={<PaymentsList />} />
      <Route path="agreements/:id/utility-bills" element={<UtilityBillsList />} />
      <Route path="agreements/:id/payments/create" element={<PaymentForm />} />
      <Route path="agreements/:id/utility-bills/create" element={<UtilityBillForm />} />
      <Route path="profile/edit" element={<ProfileUpdateForm />} />
    </Route>
    <Route path="user" element={<Authenticated />}>
      <Route path="profile" element={<Profile />} />
      <Route path="agreements" element={<CustomerAgreements />} />
      <Route path="customers/create" element={<CustomerForm />} />
      <Route path="agreements/create" element={<AgreementForm />} />
      <Route path="agreements/:id" element={<AgreementDetail />} />
      <Route path="profile/edit" element={<ProfileUpdateForm />} />
      <Route path="payments" element={<UserPayments />} />
      <Route path="utility-bills" element={<UserUtilityBills />} />
    </Route>
    <Route path="properties/:id" element={<PropertyDetail />} />
    <Route path="users/register" element={<Register />} />
    <Route path="users/login" element={<Login />} />
  </Route>
), { basename })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

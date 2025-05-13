// src/App.jsx (Route adicionada)
import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import DevNavBar from './components/common/DevNavBar';
import LoginScreenWeb from './components/web/LoginScreen';
import RegisterScreenWeb from './components/web/RegisterScreen';
import DashboardScreenWeb from './components/web/DashboardScreen';
import NewOrderScreenWeb from './components/web/NewOrderScreen';
import OrdersListScreenWeb from './components/web/OrdersListScreen';
import OrderDetailsScreenWeb from './components/web/OrderDetailsScreen'; // Importe OrderDetailsScreenWeb
import ProfileSettingsScreenWeb from './components/web/ProfileSettingsScreen';
import LoginScreenMotoboy from './components/motoboy/LoginScreen';
import DashboardScreenMotoboy from './components/motoboy/DashboardScreen';
import AvailableOrdersScreenMotoboy from './components/motoboy/AvailableOrdersScreen';
import AcceptedOrdersScreenMotoboy from './components/motoboy/AcceptedOrdersScreen';
import OrderDetailsScreenMotoboy from './components/motoboy/OrderDetailsScreen';
import MapScreenMotoboy from './components/motoboy/MapScreen';
import ProfileSettingsScreenMotoboy from './components/motoboy/ProfileSettingsScreen';
import './App.css'
import ProtectedRoute from './components/common/ProtectedRoute'; // Import ProtectedRoute

function App() {

  return (
    <Router>
      <DevNavBar />

      <Routes>
        <Route path="/" element={<LoginScreenWeb />} />
        <Route path="/register-web" element={<RegisterScreenWeb />} />

        {/* Rotas protegidas - Web Client */}
        <Route path="/dashboard-web" element={<ProtectedRoute> <DashboardScreenWeb /> </ProtectedRoute>} />
        <Route path="/new-order-web" element={<ProtectedRoute> <NewOrderScreenWeb /> </ProtectedRoute>} />
        <Route path="/orders-list-web" element={<ProtectedRoute> <OrdersListScreenWeb /> </ProtectedRoute>} />
        <Route path="/order-details-web/:orderId" element={<ProtectedRoute><OrderDetailsScreenWeb /></ProtectedRoute>} /> {/* Rota para OrderDetailsScreenWeb com :orderId */}
        <Route path="/profile-web" element={<ProtectedRoute> <ProfileSettingsScreenWeb /> </ProtectedRoute>} />

        <Route path="/login-motoboy" element={<LoginScreenMotoboy />} />

        {/* Rotas protegidas - Motoboy */}
        <Route path="/dashboard-motoboy" element={<ProtectedRoute> <DashboardScreenMotoboy /> </ProtectedRoute>} />
        <Route path="/available-orders-motoboy" element={<ProtectedRoute> <AvailableOrdersScreenMotoboy /> </ProtectedRoute>} />
        <Route path="/accepted-orders-motoboy" element={<ProtectedRoute> <AcceptedOrdersScreenMotoboy /> </ProtectedRoute>} />
        <Route path="/order-details-motoboy" element={<ProtectedRoute> <OrderDetailsScreenMotoboy /> </ProtectedRoute>} />
        <Route path="/map-motoboy" element={<ProtectedRoute> <MapScreenMotoboy /> </ProtectedRoute>} />
        <Route path="/profile-motoboy" element={<ProtectedRoute> <ProfileSettingsScreenMotoboy /> </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
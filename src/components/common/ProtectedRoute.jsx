// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    const token = authService.getToken(); // Get the token for logging

    console.log("[ProtectedRoute] isAuthenticated:", isAuthenticated); // Log authentication status
    console.log("[ProtectedRoute] JWT Token:", token ? token.substring(0, 20) + "..." : 'No token'); // Log token (first 20 chars for brevity)


    if (!isAuthenticated) {
        console.log("[ProtectedRoute] Redirecting to Login - Not Authenticated"); // Log redirection
        return <Navigate to="/" replace />;
    }

    // Se estiver autenticado, renderiza os componentes filhos (a página protegida)
    console.log("[ProtectedRoute] User Authenticated - Rendering children"); // Log successful auth
    return children;
};

export default ProtectedRoute;
// src/components/web/OrdersListScreen.jsx (Link adicionado)
import React, { useState, useEffect } from 'react';
import GenericOrdersListScreen from '../common/GenericOrdersListScreen';
import api from '../../services/apiClient';
import authService from '../../services/authService';
import { Typography, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link

const OrdersListScreenWeb = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);

            try {
                const token = authService.getToken();
                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }

                const response = await api.apiClient('client/orders.php?type=active', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response && response.orders) {
                    setOrders(response.orders);
                } else {
                    console.error("Erro ao buscar pedidos: Resposta da API incompleta:", response);
                }


            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const processedOrders = orders.map(order => ({
        primaryText: (
            <Link to={`/order-details-web/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Adicione Link aqui */}
                `Pedido #${order.id}`
            </Link>
        ),
        secondaryText: `Coleta: ${order.pickup_address}, Entrega: ${order.delivery_address} - Status: ${order.status}`,
    }));


    return (
        <GenericOrdersListScreen
            userType="web"
            title="Listagem de Pedidos Ativos"
            orders={processedOrders}
        >
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2 }}>Carregando pedidos...</Typography>
                </Box>
            )}
            {!loading && orders.length === 0 && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                    Nenhum pedido ativo encontrado.
                </Typography>
            )}
        </GenericOrdersListScreen>
    );
};

export default OrdersListScreenWeb;
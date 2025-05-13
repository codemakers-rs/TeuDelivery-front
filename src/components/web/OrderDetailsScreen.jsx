// src/components/web/OrderDetailsScreen.jsx
import React, { useState, useEffect } from 'react';
import GenericOrderDetailsScreen from '../common/GenericOrderDetailsScreen';
import { List, ListItem, CircularProgress, Box, Typography } from '@mui/material';
import api from '../../services/apiClient';
import authService from '../../services/authService';
import { useParams } from 'react-router-dom';

const OrderDetailsScreenWeb = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = authService.getToken();
                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }

                const response = await api.apiClient(`orders/order_details.php?order_id=${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response) {
                    setOrderDetails(response);
                } else {
                    console.error("Erro ao buscar detalhes do pedido: Resposta da API incompleta:", response);
                    setError("Erro ao buscar detalhes do pedido: Resposta inválida do servidor.");
                }


            } catch (error) {
                console.error("Erro ao buscar detalhes do pedido:", error);
                setError(`Erro ao buscar detalhes do pedido: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);


    let processedOrderDetails = [];

    if (orderDetails) {
        processedOrderDetails = [
            { label: 'ID do Pedido', value: orderDetails.id },
            { label: 'Status', value: orderDetails.status },
            { label: 'Data de Criação', value: orderDetails.created_at },
            { label: 'Endereço de Coleta', value: orderDetails.pickup_address },
            { label: 'Endereço de Entrega', value: orderDetails.delivery_address },
            { label: 'Descrição', value: orderDetails.order_description || 'Nenhuma descrição' },
        ];
    }


    return (
        <GenericOrderDetailsScreen
            userType="web"
            orderDetails={{ orderId: orderId, details: processedOrderDetails }}
        >
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2 }}>Carregando detalhes do pedido...</Typography>
                </Box>
            )}
            {error && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="error" textAlign="center">{error}</Typography>
                </Box>
            )}
             {!loading && !orderDetails && !error && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                    Pedido não encontrado.
                </Typography>
            )}
        </GenericOrderDetailsScreen>
    );
};

export default OrderDetailsScreenWeb;
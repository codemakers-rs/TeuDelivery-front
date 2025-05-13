// src/components/motoboy/AvailableOrdersScreen.jsx
import React, { useState, useEffect } from 'react';
import GenericOrdersListScreen from '../common/GenericOrdersListScreen';
import { Button, Typography, CircularProgress, Box } from '@mui/material';
import api from '../../services/apiClient';
import authService from '../../services/authService';

const AvailableOrdersScreenMotoboy = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Para lidar com erros de requisição

    useEffect(() => {
        const fetchPendingOrders = async () => {
            setLoading(true);
            setError(null); // Limpa erros anteriores

            try {
                const token = authService.getToken();
                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }

                const response = await api.apiClient('motoboy/pending_orders.php', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response && response.orders) {
                    setOrders(response.orders);
                } else {
                    console.error("Erro ao buscar pedidos pendentes: Resposta da API incompleta:", response);
                    setError("Erro ao buscar pedidos pendentes: Resposta inválida do servidor."); // Define mensagem de erro
                }


            } catch (error) {
                console.error("Erro ao buscar pedidos pendentes:", error);
                setError(`Erro ao buscar pedidos pendentes: ${error.message}`); // Define mensagem de erro
            } finally {
                setLoading(false);
            }
        };

        fetchPendingOrders();
    }, []);

    const listItemAction = (order) => (
        <Button variant="contained" color="primary">
            Aceitar
        </Button>
    );

    const processedOrders = orders.map(order => ({
        primaryText: `Pedido #${order.id}`,
        secondaryText: `Origem: ${order.pickup_address}, Destino: ${order.delivery_address}`,
        id: order.id, // Mantém o ID do pedido para ações futuras (ex: aceitar pedido)
    }));


    return (
        <GenericOrdersListScreen
            userType="motoboy"
            title="Pedidos Disponíveis"
            orders={processedOrders}
        >
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2 }}>Carregando pedidos pendentes...</Typography>
                </Box>
            )}
            {error && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="error" textAlign="center">{error}</Typography>
                </Box>
            )}
            {!loading && orders.length === 0 && !error && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                    Nenhum pedido pendente encontrado.
                </Typography>
            )}
        </GenericOrdersListScreen>
    );
};

export default AvailableOrdersScreenMotoboy;
// src/components/motoboy/OrderDetailsScreen.jsx
import React from 'react';
import GenericOrderDetailsScreen from '../common/GenericOrderDetailsScreen';
import { List, ListItem, Button } from '@mui/material';

const OrderDetailsScreenMotoboy = () => {
    const orderDetails = {
        orderId: '134', // Example order ID, replace with dynamic value
        details: [
            { label: 'Endereço de Coleta', value: 'Restaurante XYZ, Rua da Coleta, 789' },
            { label: 'Endereço de Entrega', value: 'Cliente ABC, Rua da Entrega, 1011' },
            {
                label: 'Itens',
                value: (
                    <List>
                        <ListItem>Prato Principal</ListItem>
                        <ListItem>Bebida</ListItem>
                    </List>
                ),
            },
            { label: 'Status', value: 'Aceito' },
        ],
    };

    const actions = (
        <Button variant="contained" color="success">
            Iniciar Rota
        </Button>
    );

    return (
        <GenericOrderDetailsScreen
            userType="motoboy"
            orderDetails={orderDetails}
            actions={actions}
        />
    );
};

export default OrderDetailsScreenMotoboy;
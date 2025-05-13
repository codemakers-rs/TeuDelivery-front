// src/components/motoboy/AcceptedOrdersScreen.jsx
import React from 'react';
import GenericOrdersListScreen from '../common/GenericOrdersListScreen';

const AcceptedOrdersScreenMotoboy = () => {
    const motoboyAcceptedOrders = [
        { primaryText: 'Pedido #134', secondaryText: 'Em Rota para Coleta' },
        { primaryText: 'Pedido #135', secondaryText: 'A caminho do Cliente' },
        // Mais itens de pedidos aceitos motoboy aqui
    ];

    return (
        <GenericOrdersListScreen
            userType="motoboy"
            title="Pedidos Aceitos"
            orders={motoboyAcceptedOrders}
        />
    );
};

export default AcceptedOrdersScreenMotoboy;
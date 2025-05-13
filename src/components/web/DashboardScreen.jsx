// src/components/web/DashboardScreen.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import GenericDashboardScreen from '../common/GenericDashboardScreen';
import ChartWidget from '../common/ChartWidget';
import AlertWidget from '../common/AlertWidget';
import { List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import api from '../../services/apiClient'; // Import apiClient

const DashboardScreenWeb = () => {
    // --- State para armazenar os dados do gráfico ---
    const [ordersChartData, setOrdersChartData] = useState({
        labels: [], // Inicializa com labels vazios
        datasets: [], // Inicializa com datasets vazios
    });

    // Example Chart Options (unchanged)
    const ordersChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false, // Title is in the widget header now
                text: 'Estatísticas de Pedidos Mensais',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    // --- useEffect para buscar dados da API ---
    useEffect(() => {
        const fetchMonthlyOrderStats = async () => {
            try {
                const data = await api.apiClient('client/dashboard/monthly_order_stats.php'); // Chama o apiClient para buscar os dados
                if (data) {
                    setOrdersChartData(data); // Atualiza o estado com os dados recebidos da API
                } else {
                    console.error("Erro ao buscar dados do gráfico: Resposta da API vazia.");
                    //  setOrdersChartData(deliveryPerformanceData); // Fallback to example data if API fails severely - REMOVE IN PROD
                }
            } catch (error) {
                console.error("Erro ao buscar dados do gráfico:", error);
                // setOrdersChartData(deliveryPerformanceData); // Fallback to example data on error - REMOVE IN PROD
            }
        };

        fetchMonthlyOrderStats(); // Chama a função de busca de dados
    }, []); // Dependency array vazio para executar apenas no mount


    const webWidgets = [
        {
            title: 'Pedidos Recentes',
            icon: 'pi pi-list',
            sm: 12,
            md: 6,
            lg: 4,
            content: (
                <List>
                    <ListItem>
                        <ListItemText primary="Pedido #123" secondary="Em Andamento" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Pedido #124" secondary="Entregue" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Pedido #125" secondary="Novo" />
                    </ListItem>
                </List>
            ),
        },
        {
            title: 'Estatísticas de Pedidos Mensais', // Updated title
            icon: 'pi pi-chart-line',
            sm: 12,
            md: 12,
            lg: 8, // Wider for chart
            content: (
                <ChartWidget
                    chartData={ordersChartData} // Usa o estado ordersChartData (dinâmico)
                    chartOptions={ordersChartOptions}
                />
            ),
        },
        {
            title: 'Ações Rápidas',
            icon: 'pi pi-bolt',
            sm: 12,
            md: 12,
            lg: 4,
            content: (
                <List>
                    <ListItem key="new-order">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<i className="pi pi-plus-circle"></i>}
                            href="/#/new-order-web"
                            component="a"
                        >
                            Criar Novo Pedido
                        </Button>
                    </ListItem>
                    <ListItem key="orders-list">
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            startIcon={<i className="pi pi-list"></i>}
                            href="/#/orders-list-web"
                            component="a"
                            sx={{ mt: 1 }} // Added marginTop for spacing
                        >
                            Ver Lista de Pedidos
                        </Button>
                    </ListItem>
                    <ListItem key="profile-settings">
                        <Button
                            variant="outlined"
                            color="secondary" // Changed color to secondary for visual distinction
                            fullWidth
                            startIcon={<i className="pi pi-cog"></i>}
                            href="/#/profile-web"
                            component="a"
                            sx={{ mt: 1 }} // Added marginTop for spacing
                        >
                            Configurações do Perfil
                        </Button>
                    </ListItem>
                </List>
            ),
        },
        {
            title: 'Notificações Importantes',
            icon: 'pi pi-bell', // Added icon for notifications
            sm: 12,
            md: 12,
            lg: 4, // Example placement, adjust as needed
            content: (
                <Box>
                    <AlertWidget
                        title="Aviso de Estoque Baixo"
                        message="O estoque de 'Item X' está baixo. Reabastecer em breve."
                        type="warning"
                    />
                    <AlertWidget
                        title="Novo Pedido Urgente"
                        message="Pedido #789 é urgente e precisa ser processado imediatamente!"
                        type="error"
                        sx={{ mt: 2 }} // Added marginTop for spacing
                    />
                    {/* Add more AlertWidgets here */}
                </Box>
            ),
        },
        // Adicione mais widgets web aqui
    ];

    return (
        <GenericDashboardScreen
            userType="web"
            widgets={webWidgets}
        />
    );
};

export default DashboardScreenWeb;
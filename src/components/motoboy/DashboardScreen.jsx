// src/components/motoboy/DashboardScreen.jsx
import React from 'react';
import GenericDashboardScreen from '../common/GenericDashboardScreen';
import ChartWidget from '../common/ChartWidget';
import AlertWidget from '../common/AlertWidget';
import { List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';

const DashboardScreenMotoboy = () => {
    // Example Chart Data and Options (Placeholder - Replace with real data)
    const deliveryPerformanceData = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Entregas Concluídas',
                data: [50, 68, 75, 82],
                backgroundColor: 'rgba(75, 192, 192, 0.8)', // Green color
            },
            {
                label: 'Entregas Canceladas',
                data: [5, 3, 2, 1],
                backgroundColor: 'rgba(255, 159, 64, 0.8)', // Orange color
            },
        ],
    };

    const deliveryPerformanceOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false, // Title in widget header
                text: 'Desempenho de Entregas Mensal',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    const motoboyWidgets = [
        {
            title: 'Entregas de Hoje',
            icon: 'pi pi-truck',
            sm: 12,
            md: 6,
            lg: 4,
            content: (
                <List>
                    <ListItem>
                        <ListItemText primary="Pedidos Aceitos" secondary="5" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Pedidos em Rota" secondary="2" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Pedidos Entregues" secondary="3" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Ganhos Estimados Hoje" secondary="R$ 35,00" />
                    </ListItem>
                </List>
            ),
        },
        {
            title: 'Ganhos da Semana',
            icon: 'pi pi-chart-line',
            sm: 12,
            md: 6,
            lg: 4,
            content: (
                <Box>
                    <Typography component="p" variant="body1">
                        Total Ganho nesta Semana: <Typography variant="h5" component="span">R$ 185,00</Typography>
                    </Typography>
                    {/* Placeholder for Gauge/Progress Bar */}
                    <Box
                        sx={{
                            width: '100%',
                            height: 80,
                            border: '1px dashed grey',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 2,
                            color: 'grey',
                            fontSize: '0.8em'
                        }}
                    >
                        <Typography variant="caption">Gauge Placeholder</Typography>
                    </Box>
                </Box>
            ),
        },
        {
            title: 'Desempenho de Entregas Mensal',
            icon: 'pi pi-chart-bar',
            sm: 12,
            md: 12,
            lg: 8,
            content: (
                <ChartWidget
                    chartData={deliveryPerformanceData}
                    chartOptions={deliveryPerformanceOptions}
                />
            ),
        },
        {
            title: 'Próximas Ações',
            icon: 'pi pi-directions',
            sm: 12,
            md: 12,
            lg: 4,
            content: (
                <List>
                    <ListItem key="available-orders">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<i className="pi pi-map-marker"></i>}
                            href="/#/available-orders-motoboy"
                            component="a"
                        >
                            Ver Pedidos Disponíveis
                        </Button>
                    </ListItem>
                    <ListItem key="accepted-orders">
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            startIcon={<i className="pi pi-check-circle"></i>}
                            href="/#/accepted-orders-motoboy"
                            component="a"
                            sx={{ mt: 1 }}
                        >
                            Ver Pedidos Aceitos
                        </Button>
                    </ListItem>
                    <ListItem key="map">
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            startIcon={<i className="pi pi-map"></i>}
                            href="/#/map-motoboy"
                            component="a"
                            sx={{ mt: 1 }}
                        >
                            Abrir Mapa
                        </Button>
                    </ListItem>
                    <ListItem key="profile-settings">
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            startIcon={<i className="pi pi-cog"></i>}
                            href="/#/profile-motoboy"
                            component="a"
                            sx={{ mt: 1 }}
                        >
                            Configurações do Perfil
                        </Button>
                    </ListItem>
                </List>
            ),
        },
        {
            title: 'Alertas e Notificações',
            icon: 'pi pi-exclamation-triangle',
            sm: 12,
            md: 12,
            lg: 4,
            content: (
                <Box>
                    <AlertWidget
                        title="Novo Pedido Disponível!"
                        message="Um novo pedido de entrega está disponível para aceitação."
                        type="info"
                    />
                    <AlertWidget
                        title="Atenção: Rota com Trânsito"
                        message="A rota para o Pedido #135 está com trânsito intenso. Considere rotas alternativas."
                        type="warning"
                        sx={{ mt: 2 }}
                    />
                    <AlertWidget
                        title="Lembrete de Manutenção da Moto"
                        message="A manutenção da sua moto está agendada para amanhã. Não se esqueça!"
                        type="info"
                        sx={{ mt: 2 }}
                    />
                </Box>
            ),
        },
        // Adicione mais widgets motoboy aqui
    ];


    return (
        <GenericDashboardScreen
            userType="motoboy"
            widgets={motoboyWidgets}
        />
    );
};

export default DashboardScreenMotoboy;
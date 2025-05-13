// src/components/common/GenericOrderDetailsScreen.jsx
import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const GenericOrderDetailsScreen = ({ userType, orderDetails, actions }) => {
    const title = `Detalhes do Pedido ${userType === 'web' ? '' : '#' + orderDetails.orderId}`; // Assuming orderDetails has orderId for motoboy, adjust if needed
    const mainTitle = userType === 'web' ? `Detalhes do Pedido #${orderDetails.orderId}` : title;

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {mainTitle}
            </Typography>
            <Paper sx={{ p: 2 }}>
                <List>
                    {orderDetails.details.map((detail, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={<Typography variant="subtitle1" fontWeight="bold">{detail.label}:</Typography>}
                                secondary={detail.value}
                            />
                        </ListItem>
                    ))}
                </List>
                {actions && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        {actions}
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default GenericOrderDetailsScreen;
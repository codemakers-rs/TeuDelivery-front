// src/components/common/GenericOrdersListScreen.jsx
import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const GenericOrdersListScreen = ({ userType, title, orders, listItemAction }) => {
    const mainTitle = `${title} ${userType === 'web' ? '(Cliente Web)' : '(Motoboy)'}`;

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {mainTitle}
            </Typography>
            <Paper sx={{ p: 2 }}>
                <List>
                    {orders.map((order, index) => (
                        <ListItem divider key={index} secondaryAction={listItemAction ? listItemAction(order) : null}>
                            <ListItemText
                                primary={order.primaryText}
                                secondary={order.secondaryText}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default GenericOrdersListScreen;
// src/components/common/GenericProfileSettingsScreen.jsx
import React from 'react';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

const GenericProfileSettingsScreen = ({ userType, onSubmit }) => {
    const title = `Configurações do Perfil ${userType === 'web' ? 'Cliente Web' : 'Motoboy'}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        } else {
            alert('Implementar lógica para salvar perfil de ' + userType);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {title}
            </Typography>
            <Paper sx={{ p: 2 }}>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nome"
                        name="name"
                        autoComplete="name"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />
                    {/* Adicionar mais campos de perfil genéricos aqui se necessário */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Salvar Alterações
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default GenericProfileSettingsScreen;
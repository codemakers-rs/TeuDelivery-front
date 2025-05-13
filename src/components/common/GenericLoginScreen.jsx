// src/components/common/GenericLoginScreen.jsx
import React from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';

const GenericLoginScreen = ({ userType, onLogin, onRegisterLink }) => {
    const title = `Login ${userType === 'web' ? 'Cliente Web' : 'Motoboy'}`;
    const registerText = userType === 'web' ? 'Cadastrar' : 'Registrar';
    const registerHref = userType === 'web' ? '/register-web' : '#'; // Ajuste conforme necessário

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você chamaria a função onLogin passada por prop,
        // que lidaria com a lógica de login específica do tipo de usuário.
        if (onLogin) {
            onLogin(event); // Passa o evento para a função de login específica
        } else {
            alert('Implementar lógica de login para ' + userType);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Usuário"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>
                    <Link href={registerHref} variant="body2">
                        {`Não tem uma conta? ${registerText}`}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default GenericLoginScreen;
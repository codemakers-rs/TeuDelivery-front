// src/components/motoboy/LoginScreen.jsx
import React from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import authService from '../../services/authService'; // Import authService
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginScreen = () => {
    const title = `Login Motoboy`;
    const registerText = 'Registrar';
    const registerHref = '#'; // Ajustar se houver tela de registro para motoboy
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("handleSubmit foi chamado!");

        const username = event.target.username.value;
        const password = event.target.password.value;

        console.log("Dados do formulário coletados:", { username, password });

        try {
            const response = await authService.login(username, password, 'motoboy'); // Usa authService.login
            console.log("Login Motoboy bem-sucedido:", response);
            alert("Login Motoboy bem-sucedido! Redirecionando para o Dashboard...");

            // Redirecionar para o dashboard do motoboy após login bem-sucedido
            navigate('/dashboard-motoboy'); // Redirecionamento usando useNavigate


        } catch (error) {
            console.error("Erro ao fazer login Motoboy:", error);
            alert(`Erro ao fazer login Motoboy: ${error.message}`);
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
                {/* Placeholder SVG Illustration */}
                <Box
                    sx={{
                        width: 150,
                        height: 150,
                        border: '2px dashed grey',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 3,
                        color: 'grey',
                    }}
                >
                    <Typography variant="body2">SVG Logo</Typography>
                </Box>

                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
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
                        InputProps={{
                            startAdornment: (
                                <i className="pi pi-user" style={{ marginRight: '8px', color: 'action.active' }}></i>
                            ),
                        }}
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
                        InputProps={{
                            startAdornment: (
                                <i className="pi pi-lock" style={{ marginRight: '8px', color: 'action.active' }}></i>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={<i className="pi pi-sign-in"></i>}
                    >
                        Entrar
                    </Button>
                    <Link href={registerHref} variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="pi pi-user-plus" style={{ marginRight: '5px' }}></i>
                        {`Não tem uma conta? ${registerText}`}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginScreen;
// src/components/web/RegisterScreen.jsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import api from '../../services/apiClient';
import AlertWidget from '../common/AlertWidget';
import { useNavigate } from 'react-router-dom';

const RegisterScreenWeb = () => {
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);

        const username = event.target.businessName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!username || !password || !email) {
            setMessage({ type: 'error', text: 'Todos os campos são obrigatórios.', errorCode: 'REQUIRED_FIELDS' }); // Added errorCode
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage({ type: 'error', text: 'Email inválido.', errorCode: 'INVALID_EMAIL' }); // Added errorCode
            return;
        }

        try {
            const response = await api.apiClient('client/register.php', { // Using api/client/register.php
                method: 'POST',
                data: { username: username, password: password }, // Sending username and password only
            });

            setMessage({ type: 'success', text: `Registro bem-sucedido! Bem-vindo(a), ${response.username}. Redirecionando para login...` });

            setTimeout(() => {
                navigate('/');
            }, 2000);


        } catch (error) {
            console.error("Erro ao registrar cliente:", error);
            let errorMessage = `Erro no registro: ${error.message}`; // Default error message
            if (error.errorCode === 'USERNAME_TAKEN') { // Check for errorCode from backend
                errorMessage = "Este nome de usuário já está em uso. Por favor, escolha outro.";
            }
            setMessage({ type: 'error', text: errorMessage, errorCode: error.errorCode }); // Include errorCode in state
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
                {/* Placeholder SVG Illustration - unchanged */}
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

                <Typography component="h1" variant="h5" sx={{ mb: 2 }}> {/* Added marginBottom */}
                    Cadastro Cliente Web
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {message && (
                        <AlertWidget type={message.type} message={message.text} title={message.type === 'success' ? 'Sucesso' : 'Erro'}  />
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="businessName"
                        label="Usuário (Nome do Restaurante/Farmácia)" // Alterado label para indicar username
                        name="businessName"
                        autoComplete="organization"
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <i className="pi pi-building" style={{ marginRight: '8px', color: 'action.active' }}></i>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        InputProps={{
                            startAdornment: (
                                <i className="pi pi-envelope" style={{ marginRight: '8px', color: 'action.active' }}></i>
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
                        autoComplete="new-password"
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
                        startIcon={<i className="pi pi-user-plus"></i>} // Added Register Icon
                    >
                        Cadastrar
                    </Button>
                    <Link href="/" variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="pi pi-sign-in" style={{ marginRight: '5px' }}></i> {/* Added Login Icon */}
                        {"Voltar para Login"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterScreenWeb;
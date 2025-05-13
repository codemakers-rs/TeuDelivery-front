// src/components/web/NewOrderScreen.jsx
import React, { useState } from 'react'; // Import useState
import { Container, Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import api from '../../services/apiClient'; // Import apiClient
import AlertWidget from '../common/AlertWidget'; // Import AlertWidget

const NewOrderScreen = () => {
    const [message, setMessage] = useState(null); // State para mensagens de sucesso/erro

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage(null); // Limpa mensagens anteriores ao submeter novamente

        const clientId = 1; // *** TODO: Obter client_id do usuário logado (via JWT) - MVP: Hardcoded
        const pickupAddress = event.target.pickupAddress.value;
        const deliveryAddress = event.target.deliveryAddress.value;
        const orderDescription = event.target.items.value; // Usando 'items' como nome do campo de descrição no form (manter consistência ou renomear no form)


        if (!pickupAddress || !deliveryAddress) {
            setMessage({ type: 'error', text: 'Endereço de Coleta e Endereço de Entrega são obrigatórios.' });
            return;
        }

        try {
            const response = await api.apiClient('orders/create.php', {
                method: 'POST',
                data: {
                    client_id: clientId,
                    pickup_address: pickupAddress,
                    delivery_address: deliveryAddress,
                    order_description: orderDescription,
                },
            });

            setMessage({ type: 'success', text: `Pedido criado com sucesso! ID do Pedido: ${response.order_id}. Mensagem: ${response.message}` });
            event.target.reset(); // Limpa o formulário em caso de sucesso


        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            setMessage({ type: 'error', text: `Erro ao criar pedido: ${error.message}` }); // Exibe mensagem de erro da API
        }
    };


    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Novo Pedido
            </Typography>
            <Paper sx={{ p: 2 }}>

                {message && ( // Renderiza AlertWidget apenas se houver uma mensagem no state 'message'
                    <AlertWidget type={message.type} message={message.text} title={message.type === 'success' ? 'Sucesso' : 'Erro'} sx={{ mb: 2 }} />
                )}

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="pickupAddress"
                                label="Endereço de Coleta"
                                name="pickupAddress"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="deliveryAddress"
                                label="Endereço de Entrega"
                                name="deliveryAddress"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                id="items"
                                label="Itens do Pedido (Opcional)"
                                name="items"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Criar Pedido
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default NewOrderScreen;
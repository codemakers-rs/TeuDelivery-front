// src/components/motoboy/MapScreen.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import MapComponent from '../common/MapComponent';

const MapScreenMotoboy = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Mapa de Geolocalização do Motoboy
            </Typography>
            <MapComponent />
        </Container>
    );
};

export default MapScreenMotoboy;
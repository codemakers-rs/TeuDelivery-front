// src/components/common/MapComponent.jsx
import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = () => {
    useEffect(() => {
        // Initialize Leaflet map after component mounts
        const map = L.map('map-container').setView([-23.5505, -46.6333], 12); // Default to São Paulo, adjust as needed

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Placeholder for marker (will be updated dynamically later)
        L.marker([-23.5505, -46.6333]).addTo(map)
            .bindPopup('Localização do Motoboy (Placeholder)')
            .openPopup();

        return () => {
            map.remove(); // Cleanup map when component unmounts
        };
    }, []); // Empty dependency array ensures effect runs only once after initial render

    return (
        <Paper sx={{ height: 600 }}>
            <div id="map-container" style={{ height: '100%' }} />
        </Paper>
    );
};

export default MapComponent;
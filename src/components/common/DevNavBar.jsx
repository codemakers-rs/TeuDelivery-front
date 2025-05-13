// src/components/common/DevNavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const DevNavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Teu Delivery - Dev Navigation (Simplified)
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default DevNavBar;
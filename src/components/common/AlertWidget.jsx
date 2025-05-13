// src/components/common/AlertWidget.jsx
import React from 'react';
import { Paper, Typography, Box, Alert, AlertTitle } from '@mui/material'; // Import Alert and AlertTitle

const AlertWidget = ({ title, message, type = 'info', icon }) => {
    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {icon ? (
                    <i className={`pi ${icon}`} style={{ marginRight: '8px', fontSize: '1.5em', color: 'primary.main' }}></i>
                ) : (
                    <Box
                        sx={{
                            width: 30,
                            height: 30,
                            border: '1px dashed grey',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 1,
                            color: 'grey',
                            fontSize: '0.8em'
                        }}
                    >
                        <Typography variant="caption">Alert Icon</Typography>
                    </Box>
                )}
                <Typography component="h3" variant="h6" color="primary">
                    {title}
                </Typography>
            </Box>
            <Alert severity={type} icon={false}> {/* Use Material UI Alert */}
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Paper>
    );
};

export default AlertWidget;
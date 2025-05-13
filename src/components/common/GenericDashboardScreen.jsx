// src/components/common/GenericDashboardScreen.jsx
import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';

const GenericDashboardScreen = ({ userType, widgets }) => {
    const title = `Dashboard ${userType === 'web' ? 'Cliente Web' : 'Motoboy'}`;

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}> {/* Increased maxWidth to xl for wider dashboards */}
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={3}>
                {widgets.map((widget, index) => (
                    <Grid item xs={12} sm={widget.sm} md={widget.md} lg={widget.lg} key={index}> {/* Added sm breakpoint */}
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> {/* Removed fixed height */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}> {/* Container for title and icon/placeholder */}
                                {widget.icon ? (
                                    <i className={`pi ${widget.icon}`} style={{ marginRight: '8px', fontSize: '1.5em', color: 'primary.main' }}></i>
                                ) : (
                                    // Placeholder SVG for Widget Icon/Header
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
                                        <Typography variant="caption">Icon</Typography>
                                    </Box>
                                )}
                                <Typography component="h3" variant="h6" color="primary"> {/* Changed to h3 for widget titles */}
                                    {widget.title}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}> {/* Allow content to take remaining space */}
                                {widget.content}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default GenericDashboardScreen;
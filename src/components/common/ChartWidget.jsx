// src/components/common/ChartWidget.jsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2'; // Or other chart type you want to use
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartWidget = ({ title, icon, chartData, chartOptions, chartType = Bar }) => {
    const ChartComponent = chartType; // Dynamically use the chart type

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
                        <Typography variant="caption">Chart Icon</Typography>
                    </Box>
                )}
                <Typography component="h3" variant="h6" color="primary">
                    {title}
                </Typography>
            </Box>
            <Box sx={{ height: 300 }}> {/* Adjust height as needed */}
                <ChartComponent options={chartOptions} data={chartData} />
            </Box>
        </Paper>
    );
};

export default ChartWidget;
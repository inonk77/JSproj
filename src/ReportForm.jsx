/*import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, Box, Container } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import dbLibrary from './idb'; // Import the instance of IDBLibrary

// Register chart.js components
ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

const ReportForm = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [reportData, setReportData] = useState([]);
    const [chartData, setChartData] = useState(null);

    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    const generateReport = async (e) => {
        e.preventDefault();
        if (month && year) {
            const data = await dbLibrary.getByMonthAndYear('costs', parseInt(month), parseInt(year));
            setReportData(data);

            // Aggregate costs by category
            const categorySums = data.reduce((acc, item) => {
                const category = item.category;
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += item.sum;
                return acc;
            }, {});

            // Prepare data for the pie chart
            const chartLabels = Object.keys(categorySums);
            const chartValues = Object.values(categorySums);

            // Set chart data
            setChartData({
                labels: chartLabels,
                datasets: [{
                    data: chartValues,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Customize colors
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                }],
            });
        } else {
            alert('Please select both month and year.');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '40px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Generate Cost Report
                </Typography>

                <form onSubmit={generateReport}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Month (1-12)"
                                type="number"
                                value={month}
                                onChange={handleMonthChange}
                                fullWidth
                                required
                                inputProps={{ min: 1, max: 12 }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Year"
                                type="number"
                                value={year}
                                onChange={handleYearChange}
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Box mt={2} display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary">
                            Generate Report
                        </Button>
                    </Box>
                </form>

                {reportData.length > 0 && (
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Report for {month}/{year}
                        </Typography>
                        <ul>
                            {reportData.map((item, index) => (
                                <li key={index}>
                                    <Typography variant="body1">
                                        {`Sum: ${item.sum}, Category: ${item.category}, Description: ${item.description}, Date: ${new Date(item.date).toLocaleDateString()}`}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}


                {chartData && (
                    <Box mt={4} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Cost Distribution by Category
                        </Typography>
                        <Pie data={chartData} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ReportForm;*/
/*import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Paper, Box, Container } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import dbLibrary from './idbWrapper';

// Register chart.js components
ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

const ReportForm = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [reportData, setReportData] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function initDB() {
            await window.idb.openCostsDB("CostManagerDB", 1);
        }
        initDB();
    }, []);

    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    const generateReport = async (e) => {
        e.preventDefault();
        if (month && year) {
            try {
                const data = await dbLibrary.getByMonthAndYear('costs', parseInt(month), parseInt(year));
                setReportData(data);

                // Aggregate costs by category
                const categorySums = data.reduce((acc, item) => {
                    const category = item.category;
                    if (!acc[category]) {
                        acc[category] = 0;
                    }
                    acc[category] += item.sum;
                    return acc;
                }, {});

                // Prepare data for the pie chart
                const chartLabels = Object.keys(categorySums);
                const chartValues = Object.values(categorySums);

                // Set chart data
                setChartData({
                    labels: chartLabels,
                    datasets: [{
                        data: chartValues,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Customize colors
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    }],
                });
            } catch (error) {
                console.error('Error generating report:', error);
                alert('Failed to generate report.');
            }
        } else {
            alert('Please select both month and year.');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '40px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Generate Cost Report
                </Typography>

                <form onSubmit={generateReport}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Month (1-12)"
                                type="number"
                                value={month}
                                onChange={handleMonthChange}
                                fullWidth
                                required
                                inputProps={{ min: 1, max: 12 }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Year"
                                type="number"
                                value={year}
                                onChange={handleYearChange}
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Box mt={2} display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary">
                            Generate Report
                        </Button>
                    </Box>
                </form>

                {reportData.length > 0 && (
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Report for {month}/{year}
                        </Typography>
                        <ul>
                            {reportData.map((item, index) => (
                                <li key={index}>
                                    <Typography variant="body1">
                                        {`Sum: ${item.sum}, Category: ${item.category}, Description: ${item.description}, Date: ${new Date(item.date).toLocaleDateString()}`}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}


                {chartData && (
                    <Box mt={4} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Cost Distribution by Category
                        </Typography>
                        <Pie data={chartData} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ReportForm;*/

import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, Box, Container } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import dbLibrary from './idbWrapper';

ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

const ReportForm = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [reportData, setReportData] = useState([]);
    const [chartData, setChartData] = useState(null);

    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    const generateReport = async (e) => {
        e.preventDefault();
        if (month && year) {
            const data = await dbLibrary.getByMonthAndYear('costs', parseInt(month), parseInt(year));
            setReportData(data);

            const categorySums = data.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + item.sum;
                return acc;
            }, {});

            setChartData({
                labels: Object.keys(categorySums),
                datasets: [{
                    data: Object.values(categorySums),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                }],
            });
        }
    };

    return (
        <Container maxWidth={false} style={{ marginTop: '40px', width: '202%' }}>
            <Grid container spacing={4} alignItems="stretch">
                {/* טופס יצירת הדוח */}
                <Grid item xs={6}>
                    <Paper elevation={5} style={{ padding: '30px', backgroundColor: '#f5f5f5', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h4" align="center" gutterBottom style={{ color: '#2C3E50', fontWeight: 'bold' }}>
                            Generate Cost Report
                        </Typography>
                        <form onSubmit={generateReport}>
                            <TextField label="Month (1-12)" type="number" value={month} onChange={handleMonthChange} fullWidth required />
                            <Box mt={2}>
                                <TextField label="Year" type="number" value={year} onChange={handleYearChange} fullWidth required />
                            </Box>
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#3498db', fontSize: '16px' }}>
                                    Generate Report
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                {/* תרשים עוגה מימין */}
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {chartData && (
                        <Paper elevation={5} style={{ padding: '18px', backgroundColor: '#ecf0f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                            <Pie data={chartData} style={{ maxWidth: '400px', maxHeight: '400px' }} />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReportForm;





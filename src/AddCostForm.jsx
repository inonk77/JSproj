// AddCostForm.jsx
/*import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import dbLibrary from './idb'; // ייבוא מופע של IDBLibrary

const AddCostForm = () => {
    const [formData, setFormData] = useState({
        sum: '',
        category: '',
        description: '',
        date: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dbLibrary) {
            await dbLibrary.add('costs', {
                ...formData,
                sum: parseFloat(formData.sum),
                date: new Date(formData.date),
            });
            alert('Cost added successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Sum" name="sum" value={formData.sum} onChange={handleChange} fullWidth />
            <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth />
            <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Add Cost
            </Button>
        </form>
    );
};

export default AddCostForm;*/

/*import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import dbLibrary from './idbWrapper';

const AddCostForm = () => {
    const [formData, setFormData] = useState({
        sum: '',
        category: '',
        description: '',
        date: '',
    });

    useEffect(() => {
        // מבטיחים שה-DB מאותחל לפני השימוש
        async function initDB() {
            await window.idb.openCostsDB("CostManagerDB", 1);
        }
        initDB();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dbLibrary) {
                await dbLibrary.add('costs', {
                    ...formData,
                    sum: parseFloat(formData.sum),
                    date: new Date(formData.date),
                });
                alert('Cost added successfully!');
                setFormData({ sum: '', category: '', description: '', date: '' }); // ניקוי טופס
            }
        } catch (error) {
            console.error('Error adding cost:', error);
            alert('Failed to add cost.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Sum" name="sum" value={formData.sum} onChange={handleChange} fullWidth required />
            <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth required />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth required />
            <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth required
            />
            <Button type="submit" variant="contained" color="primary">
                Add Cost
            </Button>
        </form>
    );
};

export default AddCostForm;*/


import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dbLibrary from './idbWrapper';
import ReportForm from './ReportForm';

const AddCostForm = () => {
    const [formData, setFormData] = useState({
        sum: '',
        category: '',
        description: '',
        date: '',
    });

    const [costs, setCosts] = useState([]);
    const [maxHeight, setMaxHeight] = useState('auto'); // שמירה על גובה זהה של הטופס והטבלה

    useEffect(() => {
        async function initDB() {
            await window.idb.openCostsDB("CostManagerDB", 1);
            fetchCosts();
        }
        initDB();
    }, []);

    const fetchCosts = async () => {
        const data = await dbLibrary.getAll('costs');
        setCosts(data);

        // חישוב הגובה המקסימלי לפי מספר הרשומות בטבלה
        const rowHeight = 50; // גובה משוער של כל שורה
        const headerHeight = 60; // גובה כותרת הטבלה
        const padding = 40; // מרווחים פנימיים
        const calculatedHeight = Math.max(400, data.length * rowHeight + headerHeight + padding);
        setMaxHeight(`${calculatedHeight}px`);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dbLibrary) {
                await dbLibrary.add('costs', {
                    ...formData,
                    sum: parseFloat(formData.sum),
                    date: new Date(formData.date),
                });
                alert('Cost added successfully!');
                setFormData({ sum: '', category: '', description: '', date: '' });
                fetchCosts();
            }
        } catch (error) {
            console.error('Error adding cost:', error);
            alert('Failed to add cost.');
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log(`Attempting to delete cost with ID: ${id}`);
            await dbLibrary.delete('costs', id);
            alert(`Cost  deleted successfully!`);
            fetchCosts(); // ריענון הרשימה אחרי מחיקה
        } catch (error) {
            console.error('Error deleting cost:', error);
            alert('Failed to delete cost.');
        }
    };

    return (
        <Container maxWidth={false} style={{ marginTop: '40px', width: '202%' }}>
            <Grid container spacing={4} alignItems="stretch">
                {/* טופס הוספת הוצאה */}
                <Grid item xs={6}>
                    <Paper elevation={5} style={{ padding: '30px', backgroundColor: '#f5f5f5', borderRadius: '10px', height: maxHeight, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Typography variant="h4" align="center" gutterBottom style={{ color: '#2C3E50', fontWeight: 'bold' }}>
                            Add Cost
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={4}>
                                    <TextField label="Sum" name="sum" type="number" value={formData.sum} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth required />
                                </Grid>
                            </Grid>

                            <Box mt={2}>
                                <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth required multiline rows={3} />
                            </Box>

                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#3498db', fontSize: '16px' }}>
                                    ADD COST
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                {/* טבלה עם רשומות קיימות */}
                <Grid item xs={6}>
                    <Paper elevation={5} style={{ padding: '20px', backgroundColor: '#ecf0f1', borderRadius: '10px', height: maxHeight, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" align="center" gutterBottom style={{ color: '#2C3E50', fontWeight: 'bold' }}>
                            Existing Costs
                        </Typography>
                        <TableContainer component={Paper} style={{ flex: 1, overflowY: 'auto' }}>
                            <Table>
                                <TableHead style={{ backgroundColor: '#3498db' }}>
                                    <TableRow>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Sum</TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {costs.map((item) => (
                                        <TableRow key={item.id} style={{ backgroundColor: '#ffffff' }}>
                                            <TableCell>{item.sum}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <IconButton color="secondary" onClick={() => handleDelete(item.id)}>
                                                    <DeleteIcon style={{ color: '#e74c3c' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddCostForm;




/*import AddCostForm from './AddCostForm.jsx';
import ReportForm from './ReportForm.jsx';
import {Typography} from "@mui/material";
import React from "react";

const App = () => {
    return (
        <div>

            <h1 variant="h4" align="center" gutterBottom style={{ color: '#2C3E50', fontWeight: 'bold' }} >Cost Maneger</h1>
            <AddCostForm />
            <ReportForm />
        </div>
    );
};

export default App;*/
import React, { useEffect } from "react";
import AddCostForm from "./AddCostForm.jsx";
import ReportForm from "./ReportForm.jsx";
import { Typography, Container } from "@mui/material";

const App = () => {
    useEffect(() => {
        document.title = "Cost Manager"; // שינוי שם האתר בלשונית
    }, []);

    return (
        <Container maxWidth="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h3" align="center" gutterBottom style={{ color: "#2C3E50", fontWeight: "bold" }}>
                Cost Manager
            </Typography>
            <AddCostForm />
            <ReportForm />
        </Container>
    );
};

export default App;

import express from 'express';

import employeesRoutes from './routes/employees.routes.js';

import "./config.js";




const app = express();

app.use(express.json());
app.use('/api', employeesRoutes);


// If endpoint not found
app.use((req, res, next) => {
    return res.status(500).json({
        message: 'Enpoint not found'
    });
});


export default app;
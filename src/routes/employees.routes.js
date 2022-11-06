// Manejo de rutas
import { Router } from "express";

import {
    getEmployees,
    createEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee
} from '../controllers/employees.controllers.js';


const router = Router();


router.get('/employees', getEmployees);
// url con parámetros obligatorios
router.get('/employees/:id', getEmployee);

router.post('/employees', createEmployees);

router.delete('/employees/:id', deleteEmployee);

router.patch('/employees/:id', updateEmployee);


export default router;
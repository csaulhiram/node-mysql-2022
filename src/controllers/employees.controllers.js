import { json } from 'express';
import { pool } from '../db.js';


export const getEmployees = async (req, res) => {
    try {
        
        const [rows] = await pool.query('SELECT * FROM employee AS result');
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        });
    }
}

export const getEmployee = async (req, res) => {
    try {
        // parámetros de la url
        console.log(req.params);
        const { id } = req.params;

        const [rows] = await pool.query('SELECT * FROM employee  WHERE id = ?', [id]);
        console.log(rows);
        if (!rows[0]) {

            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        });
    }
}

export const createEmployees = async (req, res) => {
    try {
        const { name, salary } = req.body;
        const [rows] = await pool.query('INSERT into employee (name, salary) VALUES(?, ?)', [name, salary]);
        console.log(req.body);

        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        });
    }
}

export const deleteEmployee = async (req, res) => {

    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM employee  WHERE id = ?', [id]);

    try {
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        });
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    try {

        // name = IFNULL(?, name), salary -> Si no se envía uno de los dos parámetros del formulario
        //  entonces pondrá los que tenía por default
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary)  WHERE id = ?', [name, salary, id]);

        // IF USER NOT FOUND
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'User not found' });

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        });
    }
}
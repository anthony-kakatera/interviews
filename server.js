const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Assuming you are using mysql2 for database connection
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '172.16.0.4',
    user: 'root',
    password: 'root',
    database: 'interviews'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/api/api/leave/my-requests/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const items = await db.promise().query('SELECT * FROM leave_request WHERE user_id = ?', [id]);
        res.status(200).json(items[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

app.post('/api/leave/requests', async (req, res) => {
    const { user_id, start_date, end_date, reason, leave_type } = req.body;
    try {
        const result = await db.promise().query(
            'INSERT INTO leave_request (user_id, start_date, end_date, reason, leave_type) VALUES (?, ?, ?, ?, ?)',
            [user_id, start_date, end_date, reason, leave_type]
        );
        res.status(201).json({ message: 'Leave request submitted successfully', id: result[0].insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit leave request' });
    }
});

app.get('/api/leave/requests', async (req, res) => {
    try {
        const items = await db.promise().query('SELECT * FROM leave_request');
        res.status(200).json(items[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

app.get('/api/leave/requests/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const items = await db.promise().query('SELECT * FROM leave_request WHERE id = ?', [id]);
        if (items[0].length === 0) {
            res.status(404).json({ error: 'Leave request not found' });
        } else {
            res.status(200).json(items[0][0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

app.put('/api/leave/approve/:id', async (req, res) => {
    const { user_id } = req.params;
    const approverId = 2; //hard coded approval ID

    try {
        const result = await db.promise().query('UPDATE leave_request SET status_id = ? WHERE user_id = ?', [approverId, user_id]);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: 'Leave request not found' });
        } else {
            res.status(200).json({ message: 'Leave request approved successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve leave request' });
    }
});

app.put('/api/leave/reject/:id', async (req, res) => {
    const { user_id } = req.params;
    const rejectedId = 3; //hard coded rejection ID

    try {
        const result = await db.promise().query('UPDATE leave_request SET status_id = ? WHERE user_id = ?', [rejectedId, user_id]);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: 'Leave request not found' });
        } else {
            res.status(200).json({ message: 'Leave request rejected successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject leave request' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
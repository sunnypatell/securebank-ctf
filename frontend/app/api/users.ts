import {NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import db from '../../database/db'; 

// LATER, will add some basic filtering for requests coming in
const handler = nextConnect();

// GET all users
handler.get((req: NextApiRequest, res: NextApiResponse) => {
    const users = db.prepare('SELECT * FROM Users').all();
    res.json(users);
});

// POST to log in 
handler.post((req: NextApiRequest, res: NextApiResponse) => {
    const {user, password } = req.body;

    if (!user || !password) {
        res.status(400).json({ error: "Missing field" });
        return;
    }

    // SQL Injectable - String interpolation used intentionally
    const query = `SELECT * FROM Users WHERE username = '${user}' AND password = '${password}'`;
    
    try {
        const login = db.prepare(query).get();

        if (login) {
            res.json({ success: true, message: "Login successful", login });
        } else {
            res.status(401).json({ success: false, message: "Username or Password incorrect" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

// Register a new user (SQL Injectable)
handler.put((req: NextApiRequest, res: NextApiResponse) => {
    const { username, password} = req.body;

    if (!username || !password) {
        
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    const query = `INSERT INTO Users (username, password, role) VALUES ('${username}', '${password}', 'user')`; // one challenge will be to ovverride this 

    try {
        const result = db.prepare(query).run();
        res.json({ success: true, userId: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while adding the user" });
    }
});

export default handler;

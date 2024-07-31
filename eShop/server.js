const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create Users table
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)");

    // Create Orders table
    db.run("CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, cart_data TEXT, FOREIGN KEY(user_id) REFERENCES users(id))");
});

// Sign up endpoint
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], function(err) {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ id: this.lastID, username, email });
    });
});

// Checkout endpoint
app.post('/checkout', (req, res) => {
    const { user_id, cart_data } = req.body;
    db.run("INSERT INTO orders (user_id, cart_data) VALUES (?, ?)", [user_id, cart_data], function(err) {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ id: this.lastID, user_id, cart_data });
    });
});

// Get all users endpoint
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        res.json(rows);
    });
});

// Get all orders endpoint
app.get('/orders', (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

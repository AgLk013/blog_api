const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '04112120111997',
    database: 'blog_project'
});

router.get('/', (req, res) => {
    db.query(
        `SELECT posts.*, authors.name AS author_name, authors.email AS author_email 
         FROM posts 
         JOIN authors ON posts.author_id = authors.id`,
        (err, results) => {
            if (err) throw err;
            res.json(results);
        }
    );
});

router.post('/', (req, res) => {
    const { title, description, category, author_id } = req.body;
    db.query(
        'INSERT INTO posts (title, description, category, author_id) VALUES (?, ?, ?, ?)',
        [title, description, category, author_id],
        (err, results) => {
            if (err) throw err;
            res.json({ id: results.insertId, title, description, category, author_id });
        }
    );
});

module.exports = router;

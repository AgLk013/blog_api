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
    db.query('SELECT * FROM authors', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { name, email, image } = req.body;
    db.query('INSERT INTO authors (name, email, image) VALUES (?, ?, ?)', [name, email, image], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, name, email, image });
    });
});

router.get('/:id/posts', (req, res) => {
    const authorId = req.params.id;
    db.query('SELECT * FROM posts WHERE author_id = ?', [authorId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;

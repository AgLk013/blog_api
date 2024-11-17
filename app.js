const express = require('express');
const app = express();
const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/authors', authorsRoutes);
app.use('/api/posts', postsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

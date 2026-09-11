const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes/attempts');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Node.js API is running'
    });
});

app.use('/api', routes);


module.exports = app;
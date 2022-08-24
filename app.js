const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API router
app.use('/api', require('./routes/api/index'));

app.use('*', (req, res) => {
	res.json('404 NOT FOUND');
});

app.listen(PORT, () => console.log(`>> Listening on port ${PORT}`));

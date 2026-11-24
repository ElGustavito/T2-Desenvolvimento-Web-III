require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const serieRoutes = require('./routes/serieRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/series', serieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
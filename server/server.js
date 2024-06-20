require('dotenv').config();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ayowolemieniomosule:Ayowolemi%4021@marketplace.iimdtae.mongodb.net/?retryWrites=true&w=majority&appName=marketplace'
const mongoose = require('mongoose')
const express = require('express');
const router = require('./routes/routes');

const app = express()

app.use(express.json());
app.use('/api', router)

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT} and this app has been connected to MongoDB`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

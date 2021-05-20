const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ limit: "30mb", extended: true }));


app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/companyprofile', require('./routes/api/companyprofile'));
app.use('/api/employeeprofile', require('./routes/api/employeeprofile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
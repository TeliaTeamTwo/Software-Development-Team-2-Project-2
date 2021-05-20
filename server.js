const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ limit: "30mb", extended: true }));


app.get('/', (req, res)=> res.send('API is running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/companyprofile', require('./routes/api/companyprofile'));
app.use('/api/employeeprofile', require('./routes/api/employeeprofile'));

//Serve statis assets in production
if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
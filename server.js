const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./config/default.json').mongoURI;

const employeeRoutes = require('./routes/employees');

const app = express();

// to make every empployeeRoute use /employees
app.use('/employees', employeeRoutes);

// when sending images, make sure to limit the file size
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
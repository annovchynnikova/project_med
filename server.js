const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Connect database
connectDB();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/auth'));
app.use('/medicines', require('./routes/medicines'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
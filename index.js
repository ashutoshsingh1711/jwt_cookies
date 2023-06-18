const express = require('express');
const app = express();
const user = require('./routes/user');
require('./routes/user');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

require('./config/database').connect();
app.use('/api/v1',user);

app.listen(PORT, () =>{
    console.log(`Server started at ${PORT}`);
})

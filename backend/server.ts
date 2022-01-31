export{}
require("dotenv").config()
const port = process.env.PORT || 5000
const express = require('express')
const app = express()
const fileupload = require("express-fileupload");
const connectToDataBase = require('./db/connect.ts')
const router = require('./routes/routes.ts')

app.use(fileupload())

app.use(express.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next()
});

app.use('/api/v1/', router)

const start = async () => {
    try {
        await connectToDataBase()
        app.listen(port, console.log(`Listening port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()
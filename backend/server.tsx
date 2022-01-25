require("dotenv").config()
const port = process.env.PORT || 8000
const express = require('express')
const app = express()
const connectToDataBase = require('./db/connect.tsx')
// const router = require('./routes/routes')
app.use(express.json())
const server = app.listen(port, () => {
    console.log("Listening on port: " + port);
});
const io = require('socket.io')(server);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "Origin-Url")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
});

const start = async () => {
    try {
        await connectToDataBase(process.env.CLUSTER_URI)
        io.on('connection', (socket) => {
            console.log('a user connected');
        });
    } catch (error) {
        console.log(error);
    }
}
start()
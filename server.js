var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var dbUrl = 'mongodb://kish:Kish%407298@ds147030.mlab.com:47030/learning-nodejs1'

var message = mongoose.model("message",{
    name:String,
    message:String
})


app.get('/messages', (req, res) => {
    message.find({},(err,messages)=>{
        res.send(messages)
    });
});

app.post('/messages', (req, res) => {
    var message1 = new message(req.body)

    message1.save((err)=>{
        if(err)
            sendStatus(500)

        messages.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    });
    
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
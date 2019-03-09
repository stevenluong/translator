console.log("node app running")
const express = require('express'); 
const nodemailer = require('nodemailer');
var cors = require('cors');
var https = require('https');
var Tesseract = require('tesseract.js')
var bodyParser = require('body-parser');
var config = require('./config');

var socket = require('socket.io'),
    http = require('http'),
    server = http.createServer(),
    socket = socket.listen(server);

socket.on('connection', function(connection) {
    socket.emit('status', true);
    console.log('User Connected: '+connection.id);
    connection.on('message', function(msg){
        console.log(msg);
        socket.emit('message', 'hello from server');
    });
    connection.on('image', function(image){
        console.log("Image reception in progress");
        var base64Data = image.replace(/^data:image\/png;base64,/, "").replace(/^data:image\/jpeg;base64,/, "");
        Tesseract.recognize(new Buffer(base64Data,"base64"),{
            lang: 'eng'
        })
        .progress(message => {
            console.log(message);
            socket.to(connection.id).emit('progress',message);
        })
            .catch(err => {
                console.log("err");
            })
        .then(function(result){
            console.log("result");
            console.log(result.text);
            socket.to(connection.id).emit('result', result.text);
        })
    });
});

server.listen(3000, function(){
    console.log('Server started');
});
/*
   const app = express(); 
   app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
   app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   limit: '50mb',
   extended: true
   })); 
   app.use(cors({origin: 'https://translator.slapps.fr'}));
//app.use(cors());
app.post('/image', (req, res) => {
console.log("body");
//var image = Buffer.from(req.body.image,"base64");
var image = req.body.image;
//console.log(image);
var base64Data = image.replace(/^data:image\/png;base64,/, "").replace(/^data:image\/jpeg;base64,/, "");
//var d = new Date();
//var n = d.getTime();
//require("fs").writeFile("./"+n, base64Data, 'base64', function(err) {
//    console.log(err);
//Tesseract.recognize("./"+n,{
Tesseract.recognize(new Buffer(base64Data,"base64"),{
lang: 'eng'
})
.progress(message => console.log(message))
.catch(err => {
//console.error(err);
//console.log(err);
console.log("err");
})
.then(function(result){
console.log("result");
console.log(result.text);
//console.log(result);
res.send({result:result.text});
})
//});
}); 
app.listen(3000, () => console.log('Server listening on port 3000!') );
*/

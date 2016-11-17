const http = require('http');
const express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
const port = 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/todos", function(req, res){
});


app.get('/*',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let todolist = require('./todolist');
const db = require('./db.js');
var fs = require('fs');

// start by testing the app running
app.use(function(req, res, next) {
  console.log('App is running.');
  next();
})

//sending database datas to client side
app.get('/todos', function(req,res, next){
	res.json(db.getTodoList());
	let todos = db.getTodoList();
  next();
});

//sending each ids of todo list.
app.get('/todos/:todo_id', function(req,res,next){
	let id=req.params.todo_id;
	let todo = db.getTodo(id);
	if(todo)
	res.json(todo);
    // console.log(req.params.todo_id);
});

//getting a request and post the body
app.post('/todos', function(req,res, next){
	db.getTodoList(req.body);
	console.log(req.body);
	todolist.push(req.body);
});


//----------------------------------
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});

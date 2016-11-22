const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let todolist = require('./todolist')
const db = require('./db.js');


//----------------------- OUR CODE ------------------------

app.get('/todos', function(req,res, next){
	res.json(db.getTodoList);
	let tasks=db.getTodoList();
	// res.send("hello");
	next();
	// res.send(req.query.id);
});

app.get('/todos/:todo_id', function(req,res,next){
	console.log(req.params.task_id);
	let todo = db.getTodo(req.params.task_id);
	if(todo)
		res.json(todo);
});


app.post('/todos', function(req,res, next){
	db.getTodoList(req.body);
	// console.log(req.body);
	// todolist2.push(req.body);
	console.log(todos);
});

//
//
// app.get('/*',function(req,res){
// 	res.sendFile(__dirname + '/index.html');
// });
//
//
//
//

//----------------------------------
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});

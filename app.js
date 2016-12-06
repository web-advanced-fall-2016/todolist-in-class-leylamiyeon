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

	let todos = db.getTodoList();
  if(todos) {
      res.json({code: 200, messsage: ' ', data: todos});
  }else {
    res.json({code: 100, messsage: ' ', data: {}});
  }

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
	let data = req.body;
  console.log(data);
  let result = db.addTodo(data.description);
  if( result ) {
      res.json({code: 200, message: 'Succesfully added new task', data: result})
  }else {
    res.json({code: 100, message: 'Couldnt add new item', data: {}});
  }
});

// /* Adding an item to the to do list */
// app.post('/todo/add/', urlencodedParser, function(req, res) {
//     if (req.body.newtodo != '') {
//         req.session.todolist.push(req.body.newtodo);
//     }
//     res.redirect('/todo');
// })

// /* Deletes an item from the to do list */
 app.get('/todos/delete/:id', function(req, res) {
    let id = req.params.id;
    console.log('request for delete of item: '+ id);
    res.json({message: 'jsut for now'});

});


//----------------------------------
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});

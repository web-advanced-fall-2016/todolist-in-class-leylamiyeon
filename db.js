let todos = require('./todolist.json');
let fs = require('fs');

let db = {
	getTodoList: function(){

		let tdo = todos.slice(0);
		console.log("going");
		return tdo;
	},
	getTodo: (id) => {
		for(let todo of todos){
			if(todo.id == id)

				return Object.assign({}, todo);
		}
		return false;
	},
	sendTodo: function(newTodo){

	}

};

module.exports = db;

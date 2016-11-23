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
			// let res = Object.assign({}, todo); // cloning and return the copy of the item
				return Object.assign({}, todo);
			// return res;
			console.log("getTodo works");
		}
		return false;
	},
	addTodo: (todo) => {
        todo.id = todo.length;
        todos.push(item);//push the changes back to json file
        db.updateList();//update list
				console.log("addTodo");
    },
    // removeItem:(item) =>{

    // },

    updateList: ()=> {
        fs.writeFile('./todolist.json', JSON.stringify(list), (err) => {
           if (err){
            console.log('File not updated');
            console.log('File updated!');
        }
    });
    }
};
// 	sendTodo: function(newTodo){
//
// 	}
//
// };

module.exports = db;

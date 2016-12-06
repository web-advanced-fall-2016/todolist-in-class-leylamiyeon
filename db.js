let todos = require('./todolist.json');
let fs = require('fs');

let db = {
	getTodoList: function(){
	let tdo = todos.slice(0);
	return tdo;
	},
	getTodo: (id) => {
		for(let todo of todos){
			if(todo.id == id)
				// cloning and return the copy of the item
				return Object.assign({}, todo);
				// return res;
				console.log("getTodo works");
		}
		return false;
	},
	addTodo: (todo) => {
        let id = todos.length;
				let newTask = {
					id: id,
					description:  todo
				};

        todos.push(newTask); //push the changes back to json file
        //db.updateList();//update list
				console.log(newTask);
				return newTask;
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

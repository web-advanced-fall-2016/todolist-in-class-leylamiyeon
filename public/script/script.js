let url = "http://localhost:3000";
let addBtn = document.getElementById('addBtn');
let list = document.getElementById('List');

var i = 0;
console.log("test1");

window.onload=function(){
  $.ajax({
    url:url,
    method:"GET"
  }).done(function(response){
    console.log('response work');
    console.log(response.length);

    for(let i = 0; i < response.length; i++){
			var count = i;
			var div = document.createElement('div');
			div.className = "List";
			div.id=i;
			list.appendChild(div);

			var description = document.createElement('li');
			description.innerHTML = response[i].description;

			var addBtn = document.createElement('span');
    	addBtn.className = "todoclass";
			addBtn.innerHTML = "X";

			div.appendChild(description);
			div.appendChild(addBtn);
		}

	})

};


function sendTodo(data){
	$.ajax({
		type: "POST",
		url: url + '/todos',
		data: data,
		success: console.log("sent")
	})

	let config = {
		method: "GET",
		headers: new Headers({})
	}

	let request = new Request(`${url}/todos`, config);
	  fetch(request)
        .then(function(res) {
            if (res.status == 200)
                return res.json();
            else
                throw new Error('Something went wrong on api server!');
        })
        .then(function(res) {
            console.log("The result is" + res);
            // res.json(res);
        })

    .catch(function(err) {
        console.warn("Couldn't fetch info list");
        console.log(err);
    });


}


function saveTodo(){
	// console.log("running");

	var todoForm = document.getElementById("todoForm");
	var submitButton = document.querySelector("addBtn");

	submitButton.addEventListener('submit', function(evnt){
		evnt.preventDefault();

		var form = todoForm;

	});


	var todoInput = document.getElementById("todoInput");
	var todo = taskInput.value;

	if(todo){
		newTodo = { description: todo, id: i};
		sendTodo(newTodo);

	}

	var todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	console.log(todo);
	todoDiv.innerHTML += `<p class='todoName'>${todo}</p><span class='deleteTodo'>x</span>`;

	todoDiv.id = i++;
	todoList.appendChild(todoDiv);
	todoInput.value = "";
}



// function deleteTodo(){
// 	var deleteButton = document.querySelectorAll("deleteTodo");
// 	console.log(deleteButton);
// }
//
// var button = document.querySelector("addBtn");
//
// button.addEventListener('click', function(e){
// 		e.preventDefault();
// 		// console.log("clicked");
// 		// runs save task function if clicked
// 		saveTodo();
//
// 	});

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
    console.log('response working');
    console.log(response.length);

    for(let i = 0; i < response.length; i++){
			var count = i;
			var div = document.createElement('div');
			div.className = "List";
			div.id = i;
			list.appendChild(div);

			var description = document.createElement('li');
			description.innerHTML = response[i].description;

			var addBtn = document.createElement('span');
    		addBtn.className = "todoClass";
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
            // console.log("The result is" + res);
            // res.json(res);
            console.log(res);

            for (i = 0; i < res.length; i++) {
                console.log(res[i]);
                initialItems.push(res[i]);
            }
            saveTodo();
            deleteTodo();
        })

    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log(err);
    });
}


function saveTodo(){
	// console.log("running");

	var todoForm = document.getElementById("todoForm");
	var submitButton = document.getElementById("newButton");

	submitButton.addEventListener('submit', function(evnt){
		evnt.preventDefault();

		var form = todoForm;

	});


	var todoInput = document.getElementById("myInput");
	var todo = todoInput.value;

	if(todo){
		newTodo = { description: todo, id: i};
		sendTodo(newTodo);

	}

	var todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	console.log(todo);
	todoDiv.innerHTML += `<p class='todoName'>${todo}</p><span class='deleteTodo'>x</span>`;

	todoDiv.id = i++;
	todoInput.appendChild(todoDiv);
	todoInput.value = "";
}



function deleteTodo(){
	var deleteButton = document.querySelectorAll("deleteTodo");
	console.log(deleteButton);
}

var button = document.getElementById("newButton");

button.addEventListener('click', function(e){
		e.preventDefault();
		console.log("clicked");
		// runs save task function if clicked
		saveTodo();

	});

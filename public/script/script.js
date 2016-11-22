let url = "http://localhost:8000";
let addBtn = document.getElementById('addBtn');
let list = document.getElementById('List');


window.onload=function(){
  $.ajax({
    method:"GET",
    url:url+'/todos'
  }).done(function(response){
    console.log('response.length');

    for(let i = 0; i < response.length; i++){
			// var count = i;
			console.log(response[i]);

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


function sendTodo(){
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



function deleteTodo(){
	var deleteButton = document.querySelectorAll("deleteTodo");
	console.log(deleteButton);
}

var button = document.querySelector("addBtn");

button.addEventListener('click', function(e){
		e.preventDefault();
		// console.log("clicked");
		// runs save task function if clicked
		saveTodo();

	});




// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("X");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }
//
//
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }
//
//
// var list2 = document.querySelector('ul');
// list2.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);
//
//
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";
//
//
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("X");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);
//
//
//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }

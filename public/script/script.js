let url = "http://localhost:3000";
let list = document.getElementById('List');
// let addBtn = document.getElementById('addBtn');
var deleteButton;
var updateList = [];
var i = 0;
console.log("test1");

//when the window is loaded, get the data from the server and show it
window.onload=function(){
  $.ajax({
    url:url + '/todos',
    method:"GET"
  }).done(function(response){
    console.log('response working');

//this part allows to show all the description from the database on the website.
//to do that, we need to get the length of response and create new div and span to hold the data.
//and created a deletebutton next to the description.

    for(let i = 0; i < response.length; i++){
			var count = i;
      console.log(response.length);
			var div = document.createElement('div');
			div.className = "List";
			// div.id = i;
			list.appendChild(div);

			var description = document.createElement('span');
			description.innerHTML = response[i].description;

		  deleteButton = document.createElement('span');
    	deleteButton.className = "todoClass";
			deleteButton.innerHTML = "X";
			div.appendChild(description);
			div.appendChild(deleteButton);
		}
	})
};
//---------work work ---------------------
//Add an Item, Called on Clicking Add Button, Takes Input Value & ID object

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
            console.log(res.length);
            saveTodo();
            deleteTodo();
        })
    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log("err");
    });
}

//saving inputs into description and add id to it

function saveTodo(){
	var todoInput = document.getElementById("myInput");
	var todo = todoInput.value;

	if(todo){
		newTodo = { description: todo, id: i};
		sendTodo(newTodo);
	}

	var todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	console.log(todo);
  	var inputValue = document.getElementById("myInput").value;
 	var t = document.createTextNode(inputValue);
  	todoDiv.appendChild(t);
	// todoDiv.innerHTML += `<li class='todoName'>${todo}</p><span class='deleteTodo'>x</span>`;
  	document.getElementById("List").appendChild(todoDiv);
	todoDiv.id = i++;
	// todoInput.appendChild(todoDiv);
	todoInput.value = "";
}


function renewItem(data) {
  updateList = data;
  console.log(updateList);
  console.log("new list refresh");
  var List = document.querySelector('div');
  List.innerHTML = "";
    for (item of updatedList) {
        List.innerHTML += "<div id=' " + item.id + "'>" + item.name + "</div>";
    } 
      // createCloseButton();
}

//delete button
//it's still not working but will figure out!!
function deleteTodo(id) {
 $.ajax({
        type:"DELETE",
        url: url + `/todos`,
        data: {"id":id},
        success: function(result){
        	console.log("delete");
        }
    }).done(function(res){
        console.log(id + " was sent to server");
        var deleteButton = document.querySelectorAll("deleteTodo");
		console.log("deleteButton");
        renewItem(res);
        
});
}



// function deleteTodo(){
// 	var deleteButton = document.querySelectorAll("deleteTodo");
// 	console.log("deleteButton");
// }

var button = document.getElementById("newButton");

button.addEventListener('click', function(e){
		e.preventDefault();
		console.log("add to list");
		// runs save task function if clicked
		saveTodo();

	});

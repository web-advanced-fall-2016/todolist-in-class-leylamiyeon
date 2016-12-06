let url = "http://localhost:3000";
let list = document.getElementById('List');
list.addEventListener('click', function(evnt){
  let target = evnt.target;

  if(target.classList.contains('delete')) {
    let taskElement =  target.parentNode;
    sendDeleteRequest(taskElement.dataset.id);
  }
});
// let addBtn = document.getElementById('addBtn');
var deleteButton;
var updateList = [];
var i = 0;
var todoInput = document.getElementById("myInput");

//when the window is loaded, get the data from the server and show it
let updateTasks=function(){
  $.ajax({
    url:url + '/todos',
    method:"GET"
  }).done(function(response){
    if( response.code == 200) {
      for(let i = 0; i < response.data.length; i++){
  			var div = document.createElement('div');
        div.classList.add('todo');
        div.dataset.id = response.data[i].id;
        var t = document.createTextNode(response.data[i].description);
        div.appendChild(t);
        let deleteButton = document.createElement('span');
        deleteButton.className = "delete";
        deleteButton.innerHTML = "X";
        div.appendChild(deleteButton);
        // todoDiv.innerHTML += `<li class='todoName'>${todo}</p><span class='deleteTodo'>x</span>`;
        list.appendChild(div);
  		}
    }

//this part allows to show all the description from the database on the website.
//to do that, we need to get the length of response and create new div and span to hold the data.
//and created a deletebutton next to the description.


	})
};
updateTasks();
//---------work work ---------------------
//Add an Item, Called on Clicking Add Button, Takes Input Value & ID object

function sendTodo(data){
	$.ajax({
		type: "POST",
		url: url + '/todos',
		data: {description: data},
    success: function(response) {
        console.log(response);
        if(response.code == 200) {
          // Succesfully addition
          // the new task to DOM
          var todoDiv = document.createElement('div');
          todoDiv.classList.add('todo');
          todoDiv.dataset.id = response.data.id;
          var t = document.createTextNode(response.data.description);
          todoDiv.appendChild(t);
          // todoDiv.innerHTML += `<li class='todoName'>${todo}</p><span class='deleteTodo'>x</span>`;
          let deleteButton = document.createElement('span');
          deleteButton.className = "delete";
          deleteButton.innerHTML = "X";
          todoDiv.appendChild(deleteButton);

          document.getElementById("List").appendChild(todoDiv);
          // todoInput.appendChild(todoDiv);

          todoInput.value = "";
        }else {
          //alert the use that sth went wrong
          // or they need submit again
        }
    }
	});

/*	let config = {
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
        console.warn(`Couldnt fetch info list`);
        console.log("err");
    });*/
}

// saving inputs into description and add id to it

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

// delete button
// it's still not working but will figure out!!

// function deleteTodo(id) {
//  $.ajax({
//         type:"DELETE",
//         url: url + `/todos`,
//         data: {"id":id},
//         success: function(result){
//         	console.log("delete");
//         }
//     }).done(function(res){
//         console.log(id + " was sent to server");
//         var deleteButton = document.querySelectorAll("deleteTodo");
// 		console.log("deleteButton");
//         renewItem(res);

// });
// }
function sendDeleteRequest(id) {
  $.ajax({
    type: "GET",
    url: url + `/todos/delete/${id}`,
    success: function(response) {
      console.log(response);
    }
  });
}


// function deleteTodo(){
// 	var deleteButton = document.querySelectorAll("deleteTodo");
// 	console.log("deleteButton");
// }

var button = document.getElementById("newButton");

button.addEventListener('click', function(e){
		e.preventDefault();
		// runs save task function if clicked
    var value = todoInput.value;

  //adding new items into the list
    if(value){
      sendTodo(value);
    }

	});

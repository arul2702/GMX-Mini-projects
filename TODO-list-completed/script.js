const taskinput = document.querySelector(".task-input input"),
filters =  document.querySelectorAll(".filters span"),
clearall =  document.querySelector(".clear-btn"),
taskbox=document.querySelector(".task-box");

let editId;
let isedited=false;
//geting local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn =>{
    btn.addEventListener("click",() => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showtodo(btn.id);
    });
});

function showtodo(filter){
    let li="";
    if(todos){
    todos.forEach ((todo, id) => {
        //if todo status is completed,set the isCompleted value to checked
        let isCompleted = todo.status == "completed"?"checked":"";
        if(filter == todo.status || filter =="all"){
            li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updatestatus(this);" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <ion-icon onclick="showmenu(this)" name="ellipsis-horizontal-outline"></ion-icon>
                        <ul class="task-menu">
                            <li onclick="edittask(${id} , '${todo.name}')"><ion-icon name="brush-outline"></ion-icon>Edit</li>
                            <li onclick="deletetask(${id})" ><ion-icon name="trash-outline"></ion-icon>Delete</li>
                        </ul>
                    </div>
                </li>`;
        }
    });
    taskbox.innerHTML=li || `<span>You don't have any task here</span>`;
    }
}
showtodo("all");

function showmenu(selectedtask){
    //geitting task menu div
    let taskmenu=selectedtask.parentElement.lastElementChild;
    taskmenu.classList.add("show");
     document.addEventListener("click",e =>{
        //removing show class from task menu when document click or like clicking on some other place
        if(e.target.tagName != "ION-ICON" || e.target != selectedtask){
            taskmenu.classList.remove("show");
        }
    });
}

function deletetask(deleteId){
    //removing selected task from array
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showtodo("all");
}

clearall.addEventListener("click", () =>{
     //removing all task from array
     todos.splice(0, todos.length);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     showtodo("all");
})

function edittask(taskId,taskname){
    taskinput.value=taskname;
    editId=taskId;
    isedited=true;
}

function updatestatus(selectedtask){
    //getting para that contains task name
    let taskname=selectedtask.parentElement.lastElementChild;
    if(selectedtask.checked){
        taskname.classList.add("checked");
        //updating the status of selected task to completed
        todos[selectedtask.id].status="completed";
    }else{
        taskname.classList.remove("checked");
        //updating the status of selected task to completed
        todos[selectedtask.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}
taskinput.addEventListener("keyup",e => {
        let usertask = taskinput.value.trim();
        if (e.key == "Enter" && usertask) {
            if(!isedited){
                if (!todos) {
                    todos = [];
                }
                let taskinfo = { name: usertask, status: "pending" };
                todos.push(taskinfo); //adding new task to todos
            }else{
                isedited=false;
                todos[editId].name=usertask;
            }
            taskinput.value="";
            localStorage.setItem("todo-list", JSON.stringify(todos));
            showtodo("all");
        }

    });
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const form = document.querySelector('form');
let items;

//load items
loadItems();

eventListeners();
function eventListeners(){
    //add an item
    form.addEventListener('submit', newTask);

    //delete an item
    taskList.addEventListener('click',removeTask);

    //delete all item
    btnDeleteAll.addEventListener('click',allDelete);
}

function loadItems(){
    items = getItemsFromLS();

    items.forEach(function(item){
        createItems(item);
    })
}
//get items from local storage

function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items =[];
    }else{
        items = JSON.parse(localStorage.getItem
            ('items'));
    }
    return items;
}

//set item to local storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify
    (items));
}

// delete item to Local Storage 
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item , index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items' ,JSON.stringify
    (items));
}


function createItems(text){
    //create li
    const li = document.createElement('li');
    li.className='list-group-item  btn-primary rounded-pill my-1';
    li.setAttribute('type','button');
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a');
    a.classList = 'delete-item float-end';
    a.setAttribute('href' , '#');
    a.innerHTML='<i class="fas fa-times"></i>';

    //add a to li
    li.appendChild(a);
    
    //add li to ul
    taskList.appendChild(li);
}

//kullanicidan input alindi
function newTask(e){
    if(input.value === ''){
        alert('Oops! Please. enter name item')
    }else {
    
    //create item
    createItems(input.value);

    //save to LS
    setItemToLS(input.value);

    //clear input
    
    input.value = '';
    e.preventDefault();
    }
    
}

function removeTask(e){
    
    if(e.target.className==='fas fa-times'){
        e.target.parentElement.parentElement.remove();

        //delete item from LS
        deleteItemFromLS
        (e.target.parentElement.parentElement.textContent);

    }
    e.preventDefault();
}

function allDelete(e){
    if(e.target.className === 'btn btn-outline-danger delete-all'){
        if(confirm('Are you sure ?') == true){
            taskList.innerHTML = '';
        }
        localStorage.clear();
    }
    e.preventDefault();
}

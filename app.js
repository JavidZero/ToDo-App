const mode = document.querySelector(".container .header .wrapper .header-flex .header-nav .mode");
const container = document.querySelector(".container");

mode.addEventListener('click',()=>{
    container.classList.toggle('light');
});

const checkboxSpan = document.querySelector(".container .header .wrapper .header-flex .header-type .checkbox");

checkboxSpan.addEventListener('click', () => {

    if (checkboxSpan.classList.contains('checked')) {
        checkboxSpan.classList.remove('checked');
    }
    else {
        checkboxSpan.classList.add('checked');
    }

})


const mainList = document.querySelector(".container .wrapper .main .main-list");
const input = document.querySelector(".container .header .wrapper .header-flex .header-type .input");

input.addEventListener('keyup', (event) => {
    if (event.keyCode == 13 && input.value !=='') {
        let completeTask = '';
        if (checkboxSpan.classList.contains('checked')){
            completeTask = 'checked';
            checkboxSpan.classList.remove('checked');
        }

        let todo = document.createElement('div');
        todo.classList = `main-list-item ${completeTask}`;
        todo.innerHTML = 
           `<span class="checkbox">
              <img class="checkbox-img" src="images/icon-check.svg" alt="">
            </span>
            <p>${input.value}</p>
            <img class="cross" src="images/icon-cross.svg" alt="">`;

        mainList.appendChild(todo);
        input.value = '';
        count();

        const mainListItems = document.querySelectorAll(".container .wrapper .main .main-list .main-list-item");
    
        //mainListItemListen(mainListItems);
     }
     
})

mainList.addEventListener('click', (e)=>{
    let targetEl = e.target;

    if(targetEl.tagName === 'SPAN' && targetEl.classList.contains("checkbox")){
        if(targetEl.parentElement.classList.contains("checked")) {
            targetEl.parentElement.classList.remove('checked');

        }
        else {
            targetEl.parentElement.classList.add('checked');
        }

    }
    else if(targetEl.tagName=='IMG'){
        if(targetEl.classList.contains("cross")){
            targetEl.parentElement.remove();
        }
        else if(targetEl.classList.contains("checkbox-img")){

            let spanN = targetEl.parentElement;
            spanN.parentElement.classList.remove('checked');
        }
    }

    count();
})


/* Footer Buttons */
const mainfooter = document.querySelector(".container .wrapper .main .main-footer");
const mainfooterListLink = mainfooter.querySelectorAll("ul li a");
const clearComplete = mainfooter.querySelector('.clear-complete');
const itemLeft = mainfooter.querySelector('h4');


function count(){
    let itemCount = mainList.querySelectorAll('.main-list-item').length - mainList.querySelectorAll('.checked').length;

    itemLeft.innerHTML = `${itemCount} items left`;
}

clearComplete.addEventListener('click',()=>{
    let list = mainList.querySelectorAll(".checked");

    list.forEach((item) => {
        item.remove();
    })
})


mainfooterListLink.forEach((link)=>{
    link.addEventListener('click',()=>{
        mainfooterListLink.forEach((li)=>{
            li.classList.remove('clicked');
        })
        link.classList.add('clicked');

        if(link.classList.contains('active')){
            showActiveTodos();
        }
        else if(link.classList.contains('complete')){
            showCompleteTodos();
        }
        else {
            showAllTodos();
        }
    })
})


function showAllTodos(){
    let list = mainList.querySelectorAll(".main-list-item");

    list.forEach((item) => {
        item.style.display = 'flex';
    })
}

function showActiveTodos(){
    showAllTodos();

    let list = mainList.querySelectorAll(".main-list-item");
    list.forEach((item)=>{
        if(item.classList.contains('checked')){
            item.style.display = 'none';
        }
    })
}

function showCompleteTodos(){
    showAllTodos();
    
    let list = mainList.querySelectorAll(".main-list-item");

    list.forEach((item) => {
        if (!item.classList.contains('checked')){
            item.style.display = 'none';
        }
    })
}
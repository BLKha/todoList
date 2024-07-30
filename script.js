const $= document.querySelector.bind(document);

const inputBox= $('.inputFiled input');
const addBox= $('.inputFiled button');
const todoList= $('.todoList');
const deleteAllBtn= $('.footer button');

let listArr=[];
inputBox.onkeyup = ()=>{
    //lấy giá trị khi user nhập vào ô input
    let userEnterValue= inputBox.value;
    if(userEnterValue.trim() != 0){
        addBox.classList.add('active');
    }else{
        addBox.classList.remove('active');
    }
}

addBox.onclick=()=>{
    // lấy giá trị của ô input lưu vào userEnterValue
    let userEnterValue= inputBox.value;

    let getLocalStorageData = localStorage.getItem('New todo') ;
    if(getLocalStorageData == null){
        listArr=[];
    }else{
        listArr= JSON.parse(getLocalStorageData);
    }
    listArr.push(userEnterValue);
    localStorage.setItem('New todo',JSON.stringify(listArr));

    showTasks();

    addBox.classList.remove('active');
}  

    function showTasks(){
        let getLocalStorageData = localStorage.getItem("New todo") ;
        if(getLocalStorageData == null){
            listArr=[];
        }else{
            listArr= JSON.parse(getLocalStorageData);
        }
        const pendingTaskNumb= document.querySelector('.pendingTask');
        pendingTaskNumb.textContent = listArr.length;


        if(listArr.length > 0){
            deleteAllBtn.classList.add('active');
        }else{
            deleteAllBtn.classList.remove('active')
        }

        let newLiTag= "";
        listArr.forEach((element, index) => {
            newLiTag += `<div class="content"><li contenteditable="true" ">
            ${index+1}. 
            ${element}</li><span class="icon"  data-index="${index}"> <i class="fas fa-trash"></i>
            <span class="remove-text">xóa</span>
            </span></div>`;
        });
//onblur="editTask(${index},this.innerText)
        todoList.innerHTML = newLiTag;
        inputBox.value="";
        document.querySelectorAll('.content li').forEach((item, index)=>{
            item.addEventListener('blur',function(){
                editTask(index,item.innerText)
            });
        });

        document.querySelectorAll('.icon').forEach(item =>{
            item.addEventListener('click',function(){
                deleteTask(item.getAttribute('data-index'))
            });
        });
}

function editTask(index, newValue){
    listArr[index]= newValue;
    localStorage.setItem("New todo",JSON.stringify(listArr));
    showTasks();
}

function deleteTask(index){
    let getLocalStorageData=localStorage.getItem("New todo");
    if(getLocalStorageData){
        listArr =JSON.parse(getLocalStorageData);
        listArr.splice(index,1);
        localStorage.setItem("New todo",JSON.stringify(listArr));
        showTasks();
    }
}
deleteAllBtn.onclick=()=>{
    listArr=[];
    localStorage.setItem("New todo",JSON.stringify(listArr));
    showTasks();
}
inputBox.addEventListener('keydown', function(event){
    if(event.key==='Enter'){
        addBox.onclick();
    }
})

showTasks();




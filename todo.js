let tasks=[];
const tlist=document.getElementById("list");
const tadd=document.getElementById("add");
const tcount=document.getElementById("total-tasks");
const tucount=document.getElementById("unchecked-tasks");
const tccount=document.getElementById("checked-tasks");
const completeAll=document.getElementById("complete-all");
const clearComp=document.getElementById("clear-all-completed");

// click event listeners for two buttons-> clear all marksed tasks and mark all tasks complete mentioned below
completeAll.addEventListener('click',function(){
    for(i of tasks){
        i.completed=true;
    }
    renderList();
})
clearComp.addEventListener('click',function(){
    let ntasks=tasks.filter(function(task){
        return task.completed==false;
    })

    tasks=ntasks;
    renderList();
})
// function to display task counts is defined below
function eval_tasks(){
    let tc=tasks.length;
    
    let tuc=0,tch=tc;
    for(i of tasks){
        if(i.completed==false){
            tuc++;
        }
    }
    if(tuc!=0){
        tch=tc-tuc;
        tuc=tuc+" Incomplete";
        tch=tch+" Completed"
    }
    else {
        tuc=""
        tch="All Completed"
    }
    tucount.innerHTML=tuc;
    tccount.innerHTML=tch;
    tcount.innerHTML=tc+" tasks left";

}
//helper function to addtask() function
function addtodom(task){

    const li=document.createElement('li');
    li.innerHTML=`<input type="checkbox" id="${task.id}" ${task.completed?"checked":""} class="custom-checkbox" >
    <label for="${task.id}">"${task.title}"</label>
    <img src="img.jpg" class="delete" data-id="${task.id}" />`;

    tlist.append(li);
}
// function to display tasks list on screen is defined below
function renderList(){
    tlist.innerHTML='';

    for(let i =0;i<tasks.length;i++){
        addtodom(tasks[i]);
    }

    // tcount.innerHTML=tasks.length;
    eval_tasks();
}
// function to add tasks to task list is defined below
function addtask(task){
    tasks.push(task);
    renderList();
//     shownotification("task added successfully :)");
    return;
}
// function to mark task complete/incomplete is defined below
function markcompletetask(taskid){

    for(let i =0;i<tasks.length;i++){
        if(tasks[i].id===taskid){
            tasks[i].completed=!tasks[i].completed;
        }
    }
    renderList();
}
// function to delete task is defined below
function deletetask(taskid){
    console.log(taskid);
    let ntasks=tasks.filter(function(task){
        return task.id!==taskid;
    })

    tasks=ntasks;
    renderList();
//     shownotification("task deleted successfully :)");
    return;
}

// function shownotification(text){
//     alert(text);
// }

// function to capture textbox contents is defined below
function handlekeypress(e){
    if(e.key==="Enter"){
        const title=e.target.value;
        if(title.length>0){
            const task={
                title,
                id: Date.now().toString(),
                completed: false
            }
            
            addtask(task);

            e.target.value='';
            console.log(tasks);
        }
        else{
            shownotification("Please add valid task name");return;
        }
    }
}
function handleClick(e){
    var target=e.target;
    // console.log(e.target);

    if(target.className==='delete'){
        const idd=target.dataset.id;
        deletetask(idd);
        return;
    }
    else if(target.className==='custom-checkbox'){
        
        markcompletetask(target.id);
        return;
    }
    return;
}
// init method is used for initializing the functions which needs to be called on startup
function init(){
    document.addEventListener("click", handleClick);
    tadd.addEventListener('keyup',handlekeypress);
}
init();



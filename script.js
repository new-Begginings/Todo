const myForm = document.getElementById("myForm");
const display = document.getElementById("display");
const projectBtns = document.querySelectorAll("#projectBtns");

var currentProject = 'HOME';


if(!localStorage.getItem('HOME')) {
  const homeNotes = JSON.stringify([]);
  localStorage.setItem('HOME', homeNotes);
}

if(!localStorage.getItem('UCL')) {
  const uclNotes = JSON.stringify([]);
  localStorage.setItem('UCL', uclNotes);
}


projectBtns.forEach(function(node) {
  node.addEventListener('click', function(e) {
    currentProject = e.target.getAttribute('data');
    clearDisplay();
    displaycurrentProjectNotes();
  })
})

function clearDisplay() {
  const notes = display.querySelectorAll('.note');
  notes.forEach(note => {
    note.remove();
  });
}


function getCurrentProjectNotes() {
  let projectNotes = localStorage.getItem(currentProject);
  // console.log(projectNotes)
  let projectNotesArray = JSON.parse(projectNotes);
  return projectNotesArray;
}

function displaycurrentProjectNotes() {
  let projectNotesArray = getCurrentProjectNotes();
  // console.log(projectNotesArray);
  projectNotesArray.map((obj)=>{
    const childEle = createNote(obj);
    display.appendChild(childEle);
  })
}

function addNote(noteObj) {
  let projectNotesArray = getCurrentProjectNotes();
  // console.log(projectNotesArray);
  projectNotesArray.push(noteObj);
  localStorage.setItem(`${currentProject}`,  JSON.stringify(projectNotesArray));
  clearDisplay();
  displaycurrentProjectNotes();
}



myForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(myForm);
  const formValues = Object.fromEntries(formData.entries());
  // console.log(formValues);
  addNote(formValues);
  e.target.reset();
})

function deleteFromtodoNotesArray(ele) {
  // console.log(ele);
  let notes = getCurrentProjectNotes();
  notes.splice(ele.data, 1);
  localStorage.setItem(`${currentProject}`,  JSON.stringify(notes));
}


function createNote(obj) {
  const ele = document.createElement('div');
  ele.classList.add('note');
  ele.style = "display:flex;padding:16px;border:2px solid black;border-radius:10px;margin:4px;"
  const title = document.createElement('h2');
  title.innerText = obj["title"];
  title.style = "flex-grow:1;padding:16px";
  const date = document.createElement('h2');
  date.innerText = obj["date"];
  date.style = "padding:16px;margin:auto;shadow:none;";
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete";
  deleteBtn.style = "font-size:20px;color:red;background-color:black;margin:auto;padding:16px;border-radius:10px;border:2px solid black;";
  let currentProjectArray = JSON.parse(localStorage.getItem(`${currentProject}`));
  deleteBtn.setAttribute('data', currentProject.length);
  deleteBtn.addEventListener('click', function(e) {
    deleteFromtodoNotesArray(e.target)
    // console.log(e.target.parentElement);
    e.target.parentElement.remove();
  });
  ele.append(title, date, deleteBtn);
  return ele;
}



















// const myForm = document.getElementById("myForm");
// const display = document.getElementById("display");


// var todoNotesArray = [];


// if(!localStorage.getItem('todoNotes')) {
//   console.log("No saved notes in localstorage")
// } else {
//   populateSavedNotes();
// }


// function populateSavedNotes() {
//   todoNotesString = localStorage.getItem('todoNotes');
//   NotesArray = JSON.parse(todoNotesString);
//   NotesArray.map((obj)=> {
//     const childEle = createNote(obj);
//     display.appendChild(childEle);
//     todoNotesArray.push(obj);
//   })
// }

// function deleteFromtodoNotesArray(ele) {
//   let index = ele.getAttribute('data')
//   todoNotesArray.splice(index, 1);
//   updateTodoNotesArray();
// }




// function createNote(obj) {
//   const ele = document.createElement('div');
//   ele.style = "display:flex;padding:16px;border:2px solid black;border-radius:10px;margin:4px;"
//   const title = document.createElement('h2');
//   title.innerText = obj["title"];
//   title.style = "flex-grow:1;padding:16px";
//   const date = document.createElement('h2');
//   date.innerText = obj["date"];
//   date.style = "padding:16px;margin:auto;shadow:none;";
//   const deleteBtn = document.createElement('button');
//   deleteBtn.innerText = "Delete";
//   deleteBtn.style = "font-size:20px;color:red;background-color:black;margin:auto;padding:16px;border-radius:10px;border:2px solid black;";
//   deleteBtn.setAttribute('data', todoNotesArray.length);
//   deleteBtn.addEventListener('click', function(e) {
//     deleteFromtodoNotesArray(e.target)
//     console.log(e.target.parentElement);
//     e.target.parentElement.remove();
//   });
//   ele.append(title, date, deleteBtn);
//   return ele;
// }

// function updateTodoNotesArray() {
//   let todoNotes = JSON.stringify(todoNotesArray);
//   localStorage.setItem('todoNotes', todoNotes);
// }


// function addNoteObject(obj) {
//   todoNotesArray.push(obj);
//   updateTodoNotesArray();
// }

// function addNote(formValues) {
//   const childEle = createNote(formValues);
//   addNoteObject(formValues);
//   display.appendChild(childEle);
// }


// myForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   const formData = new FormData(myForm);
//   const formValues = Object.fromEntries(formData.entries());
//   console.log(formValues);
//   addNote(formValues);
//   e.target.reset();
// })



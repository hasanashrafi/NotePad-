//variables
const noteList = document.querySelector('#note-list')
const date = document.querySelector('#date')

//EventListeners
eventListeners()
//form submission
function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newNote)
    document.querySelector('#note-list').addEventListener('click', removeNote)
    document.querySelector('#note-list').addEventListener('click', editNote)
    document.querySelector('#note-list').addEventListener('click', completeNote)
    document.querySelector('#remove-all').addEventListener('click', removeAllNote)

    //get data from local storage
    document.addEventListener('DOMContentLoaded', localStorageOnLoad)
}

//functions
//get date of day & convert to -persian date-
function day() {
    let dayDate = new Date().toLocaleDateString('fa-IR-u-nu-latn')
    date.innerHTML = `تاریخ امروز : ${dayDate} `
}
day()

//adding new note to the list
function newNote(e) {
    e.preventDefault()
    //access to the value
    const note = document.querySelector('#note').value

    //create remove button 
    const removeBtn = document.createElement('a')
    removeBtn.classList = 'remove-btn'
    removeBtn.textContent = 'حذف'

    //create edit btn
    const editBtn = document.createElement('a')
    editBtn.classList = 'edit-btn'
    editBtn.textContent = 'ویرایش'

    //create complete btn
    const compBtn = document.createElement('a')
    compBtn.classList = 'comp-btn'
    compBtn.textContent = 'انجام شد'

    //Avoid sending empty text
    if (note == '') {
        alert('یادداشت خود را وارد کنید')
        return false
    }
    //create <li></li> tag
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    //add remove btn to the <li></li>
    li.appendChild(removeBtn)

    //add edit button to the li
    li.appendChild(editBtn)

    //add complete button to the li
    li.appendChild(compBtn)

    //add <li></li> to the list
    noteList.appendChild(li)

    addNoteToLocalStorage(note)

    //reset the textarea
    this.reset()

}
//remove note from list
function removeNote(e) {

    if (e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove()
    }
    removeNoteFromLs(e.target.parentElement.textContent)
}
function completeNote() {
    // const noteList = document.querySelector('#note-list')
    // if (e.target.classList.contains('comp-btn')) {
    //     let comp = e.target.parentElement
    //     console.log(comp);
    //     comp.classList = 'comp'
    // }

}
//add note to local storage
function addNoteToLocalStorage(note) {
    //get the notes from local storage
    const notes = getNotesFromLs()
    //add new note to the notes array
    notes.push(note);
    //add new notes array to the local storage
    localStorage.setItem('notes', JSON.stringify(notes));
}

//get notes from local storage
function getNotesFromLs() {
    let notes;
    //get previous note from local storage
    let getFromLs = localStorage.getItem('notes')
    if (getFromLs === null) {
        //if not exist  create empty array
        notes = []
    } else {
        //if exist convert to the array 
        notes = JSON.parse(getFromLs)
    } return notes
}

//get data from local storage onload
function localStorageOnLoad() {
    const notes = getNotesFromLs()
    notes.forEach(function (note) {
        //create remove button 
        const removeBtn = document.createElement('a')
        removeBtn.classList = 'remove-btn'
        removeBtn.textContent = 'حذف'

        //create edit btn
        const editBtn = document.createElement('a')
        editBtn.classList = 'edit-btn'
        editBtn.textContent = 'ویرایش'


        //create complete btn
        const compBtn = document.createElement('a')
        compBtn.classList = 'comp-btn'
        compBtn.textContent = 'انجام شد'


        //create <li></li> tag
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(note))

        //add remove btn to the <li></li>
        li.appendChild(removeBtn)

        //add edit button to the li
        li.appendChild(editBtn)

        //add complete button to the li
        li.appendChild(compBtn)

        //add <li></li> to the list
        noteList.appendChild(li)

    });
}


//also remove note from local storage
function removeNoteFromLs(noteContent) {
    //remove delete , edit , complete btn from content 
    const noteDelete = noteContent.substring(0, noteContent.length - 17)
    //get notes from local storage
    const notesFromLs = getNotesFromLs()
    notesFromLs.forEach(function (note, index) {
        if (note === noteDelete) {
            notesFromLs.splice(index, 1)
        }
    });
    localStorage.setItem('notes', JSON.stringify(notesFromLs))

}


function removeAllNote() {
    let deleteAll = document.querySelector('#note-list')
    deleteAll.style.display = 'none'
    // addNoteToLocalStorage(deleteAll)
}

function editNote(e) {
    // const remove = document.querySelector('.remove-btn')
    // const editbtn = document.querySelector(".edit-btn")
    // const comp = document.querySelector(".comp-btn")
    // const btn = document.querySelector("#btn")
    // const note = document.querySelector('#note')
    // const noteList = document.querySelector('#note-list')
    // const form = document.querySelector('#form')

    // if (e.target.classList.contains('edit-btn')) {
    //     let edit = noteList.children[0].firstChild
    //     let result = edit.textContent
    //     note.innerHTML = `${result}`
    //     note.contentEditable = true;
    //     // result = document.querySelector('#note').value
    //     btn.style.display = 'none'

    // }

    // let save = document.createElement('a')
    // save.textContent = 'ذخیره'
    // save.classList = 'btn'
    // save.id = 'save'
    // form.appendChild(save)

    // remove.style.display = 'none'
    // comp.style.display = 'none'
    // editbtn.style.display = 'none'


}
// const save = document.querySelector('.btn').addEventListener('click', function saveTask() {
//     const noteList = document.querySelector('#note-list')
//     let savetask = document.querySelector('#note').value
//     let saveto = noteList.children[0]
//     console.log(saveto);
//     saveto.innerHTML = `${savetask}`
    
//     // edit.innerHTML = `${saveIn}`

// })
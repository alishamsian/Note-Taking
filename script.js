const noteText = document.getElementById("note-text");
const addNoteBtn = document.getElementById("add-note");
const notesList = document.getElementById("notes-list");





const getNotesLocalStorage = () => {
    return JSON.parse(localStorage.getItem("notes")) || [];
};

const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

// show notes screen
const displayNotes = () => {
    notesList.innerHTML = "";
    const notes = getNotesLocalStorage();

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.classList.add("note");
        
        const input = document.createElement("input");
        input.type = "text";
        input.value = note;
        input.disabled = true;
        
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("note-buttons");

        const editBtn = document.createElement("button");
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>`;
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => enableEditing(input, index, editBtn));

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>`;
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteNote(index));

        buttonsDiv.append(editBtn, deleteBtn);
        li.append(input, buttonsDiv);
        notesList.appendChild(li);
    });
};

// edit button
const enableEditing = (input, index, editBtn) => {
    input.disabled = false;
    input.focus();
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path></svg>`;
    editBtn.classList.remove("edit-btn");
    editBtn.classList.add("save-btn");

    editBtn.removeEventListener("click", () => enableEditing(input, index, editBtn));
    editBtn.addEventListener("click", () => saveEditedNote(input, index, editBtn));
};


// save edited note
const saveEditedNote = (input, index, editBtn) => {
    const notes = getNotesLocalStorage();
    notes[index] = input.value.trim();

    saveNotesToLocalStorage(notes);
    displayNotes();
};


// Add new note
const addNote = () => {
    const note = noteText.value.trim();
    if (!note) return;

    const notes = getNotesLocalStorage();
    notes.push(note);
    saveNotesToLocalStorage(notes);
    noteText.value = "";
    displayNotes();
};


// delete note
const deleteNote = (index) => {
    const notes = getNotesLocalStorage();
    notes.splice(index, 1);
    saveNotesToLocalStorage(notes);
    displayNotes();
};

addNoteBtn.addEventListener("click", addNote);

displayNotes();
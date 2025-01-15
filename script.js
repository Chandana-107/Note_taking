const noteContainer = document.getElementById("note-container");
const addNoteButton = document.getElementById("add-note");

// Load notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(createNote);
}

// Save notes to localStorage
function saveNotes() {
  const notes = Array.from(noteContainer.children).map(note => note.querySelector("textarea").value);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Create a note
function createNote(content = "") {
  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `
    <textarea>${content}</textarea>
    <button>×</button>
  `;
  note.querySelector("textarea").addEventListener("input", saveNotes);
  note.querySelector("button").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });
  noteContainer.appendChild(note);
}

// Add new note
addNoteButton.addEventListener("click", () => createNote() && saveNotes());

// Initialize app
loadNotes();

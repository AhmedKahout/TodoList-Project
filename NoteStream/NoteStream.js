let addNote = document.getElementById('addButton');
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach(note => {
        return notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}
const AddNewNote = (text = "") => {


    const note = document.createElement('div');
    note.classList.add('Note');
    const HTMLData =
        `

<div class="operation">
    <button class="Operation-btn" id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="Operation-btn" id="Delete" ><i class="fa-solid fa-trash-can"></i></button>
</div>
<div class="main-Area ${text ? "" : "hidden"}"></div>
<textarea spellcheck="false" class="TextArea ${text ? "hidden" : ""}" cols="8" rows="20"></textarea>
`;
    note.insertAdjacentHTML('afterbegin', HTMLData);


    const EditNoteButton = note.querySelector('#edit');
    const DeleteNoteButton = note.querySelector('#Delete');
    const MainTextAreaDiv = note.querySelector('.main-Area');
    const TextArea = note.querySelector('.TextArea');



    DeleteNoteButton.addEventListener('click', () => {
        note.remove()
        updateLSData();
    });


    EditNoteButton.addEventListener('click', () => {

        MainTextAreaDiv.classList.toggle('hidden');
        TextArea.classList.toggle('hidden');
    })
    TextArea.value = text;
    MainTextAreaDiv.innerHTML = text;

    TextArea.addEventListener('change', (event) => {
        const Value = event.target.value;
        MainTextAreaDiv.innerHTML = Value;
        updateLSData();
    })

    const allNotesContainer = document.querySelector('.All-Notes');
    allNotesContainer.appendChild(note);

}
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach(note => {
        return AddNewNote(note);
    });
}
addNote.addEventListener('click', () => {
    AddNewNote();
})
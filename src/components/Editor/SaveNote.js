import { addNote, updateNote } from "../../services/noteServices";

export default function SaveNote(props, newNote, setLoadingNotes,showAlert) {
    if(newNote.id===undefined){
        setLoadingNotes("added new");
      }else{
          setLoadingNotes(newNote.id);
      }
    if (props.mode === 'create') {
        addNote(newNote).then((note) => {
            props.setData((data) => [note, ...data]);
            setLoadingNotes(0);
            showAlert("new note added","sucess");
        })
    } else if (newNote.description !== props.note.description || newNote.color !== props.note.color) {
        updateNote(props.note.id, newNote).then((isUpdated) => {
            setLoadingNotes(0);
            if (isUpdated) {
                props.setData((notes) => {
                    const indexOfNoteToUpdate = notes.findIndex((note) => note.id === props.note.id);
                    const updatedNote = { ...notes[indexOfNoteToUpdate], title: newNote.title, description: newNote.description, color: newNote.color }
                    const updatedNotes = [...notes];
                    updatedNotes[indexOfNoteToUpdate] = updatedNote;
                    return updatedNotes;
                })
            }
        })
    } else {
        setLoadingNotes(0);
    }
}

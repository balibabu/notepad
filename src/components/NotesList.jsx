import { useEffect, useState } from "react";
import Note from "./Note";
import { deleteNote, getAllNotes } from "../services/noteServices";
import CreateNote from "./CreateNote";
import Editor from "./Editor";

function NotesList() {
    const [data, setData] = useState([]);
    const [editorMode, setEditorMode] = useState(false);
    let mode='create';
    let saveNote=addNote;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notes = await getAllNotes();
                setData(notes);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const addNote = (note) => {
        setData((data) => [...data, note])
        setEditorMode(false);
    }

    const delete_note = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (!confirmDelete) { return; }
        try {
            const isDeleted = await deleteNote(id);
            if (isDeleted) {
                setData((prevData) => prevData.filter((note) => note.id !== id));
            } else {
                console.log('Failed to delete note.');
            }
        } catch (error) {
            console.error('An error occurred during the deletion process:', error);
        }
    };



    return (
        <>
            {editorMode ?
                // <CreateNote setEditorMode={setEditorMode} addNote={addNote}/>
                <Editor setEditorMode={setEditorMode} mode={mode}/>
                :
                <>
                    <div>
                        <button style={{ marginLeft: "10px" }} onClick={()=>setEditorMode(true)}>Create Note</button>
                    </div>
                    <div>
                        {data.map((note) => {
                            return <Note note={note} key={note.id} delete_note={delete_note} />
                        })}
                    </div>
                </>
            }
        </>
    );
}

export default NotesList;

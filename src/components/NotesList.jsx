import { useContext, useEffect, useState } from "react";
import Note from "./Note";
import { deleteNote, getAllNotes } from "../services/noteServices";
import Editor from "./Editor/Editor";
import GlobalVarContext from "../GlobalVariables";
import DummyLoadingNote from "./utility/DummyLoadingNote";
import currentDateToColor from "./utility/RandomColor";

const dummyData = [{ id: 0, title: "Example", description: "Example description", created_time: "" }, { id: 1, title: "Example", description: "Example description", created_time: "" }]
const newNote = { title: "Take Note", description: "", color: currentDateToColor() }
function NotesList() {
    const [data, setData] = useState(dummyData);
    const [editorMode, setEditorMode] = useState(false);
    const [mode, setMode] = useState('create');
    const [note, setNote] = useState(newNote);

    const { loadingNotes, alert, showAlert, AlertDialog } = useContext(GlobalVarContext);

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

    const delete_note = async (event, id) => {
        event.stopPropagation();
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (!confirmDelete) { return; }
        try {
            const isDeleted = await deleteNote(id);
            if (isDeleted) {
                setData((prevData) => prevData.filter((note) => note.id !== id));
                showAlert('note with id '+id+' deleted','danger');
            } else {
                console.log('Failed to delete note.');
            }
        } catch (error) {
            console.error('An error occurred during the deletion process:', error);
        }
    };


    const on_note_click = (note) => {
        setNote(note);
        setMode('update')
        setEditorMode(true);
    }

    const set_defaults = () => {
        setNote(newNote);
        setMode('create');
        setEditorMode(false);

    }


    return (
        <>
            {editorMode ?
                <Editor setEditorMode={setEditorMode} mode={mode} note={note} set_defaults={set_defaults} setData={setData} showAlert={showAlert}/>
                :
                <>
                    {alert && <AlertDialog msg={alert.msg} type={alert.type}/>}
                    <div>
                        <button style={floatingButtonStyle} onClick={() => setEditorMode(true)}>Create Note</button>
                    </div>
                    <div>
                        {loadingNotes === "added new" && <DummyLoadingNote />}
                        {data.map((note) => {
                            return <Note note={note} key={note.id} delete_note={delete_note} on_note_click={on_note_click} />
                        })}
                    </div>
                </>
            }
        </>
    );
}

export default NotesList;





const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px', // Adjust as needed
    right: '10px', // Adjust as needed
    padding: '10px',
    fontSize: "20px",
    fontWeight: "bolder",
    borderRadius: "50px",
    border: "5px groove #0077b6",
    backgroundColor: "#90e0ef",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"

}



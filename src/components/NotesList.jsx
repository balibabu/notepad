import { useEffect, useState } from "react";
import Note from "./Note";
import { deleteNote, getAllNotes } from "../services/noteServices";
import Editor from "./Editor";

function NotesList() {
    const [data, setData] = useState([]);
    const [editorMode, setEditorMode] = useState(false);
    const [mode, setMode] = useState('create');
    const [note, setNote] = useState({title:"",description:"",color:"#96ffff"});

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

    const delete_note = async (event,id) => {
        event.stopPropagation();
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


    const on_note_click=(note)=>{
        setNote(note);
        setMode('update')
        setEditorMode(true);
    }

    const set_defaults=()=>{
        setNote({title:"",description:"",color:"#96ffff"});
        setMode('create');
        setEditorMode(false);

    }


    return (
        <>
            {editorMode ?
                <Editor setEditorMode={setEditorMode} mode={mode} note={note} set_defaults={set_defaults} setData={setData}/>
                :
                <>
                    <div>
                        <button style={floatingButtonStyle} onClick={()=>setEditorMode(true)}>Create Note</button>
                    </div>
                    <div>
                        {data.map((note) => {
                            return <Note note={note} key={note.id} delete_note={delete_note} on_note_click={on_note_click}/>
                        })}
                    </div>
                </>
            }
        </>
    );
}

export default NotesList;





const floatingButtonStyle={
    position: 'fixed',
    bottom: '20px', // Adjust as needed
    right: '10px', // Adjust as needed
    padding: '10px',
    fontSize:"20px",
    fontWeight: "bolder",
    borderRadius: "50px",
    border: "5px groove #0077b6",
    backgroundColor:"#90e0ef",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"

  }
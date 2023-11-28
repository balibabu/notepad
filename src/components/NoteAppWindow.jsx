import React, { useState } from 'react'
import NotesList from './NotesList'
import EditNote from './Editor';
import CreateNote from './CreateNote';

export default function NoteAppWindow() {
    const [editorMode, setEditorMode] = useState(false);

    return (
        <>
            {
                editorMode ? <CreateNote setEditorMode={setEditorMode}/> :
                    <>
                        <button style={{ marginLeft: "10px" }} onClick={()=>setEditorMode(true)}>Create Note</button>
                        <NotesList />
                    </>
            }
        </>
    )
}

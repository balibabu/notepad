import React, { useState } from 'react'
import { updateNote } from '../services/noteServices';

export default function Editor(props) {
    const noteStyle = {
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    if(props.mode==='update'){
        setTitle(props.note.title);
        setDescription(props.note.description);
    }
    

    const onSubmit =async (event) => {
        event.preventDefault();
        const noteData = {
            title: title,
            description: description,
        };

        setTitle('');
        setDescription('');
        props.setEditorMode(false);
    };

    return (
        <div style={noteStyle}>
            <form onSubmit={onSubmit}>
                <label htmlFor='title'>Title </label><br />
                <input style={{width:'80vw'}} id='title' value={title} onChange={(e) => setTitle(e.target.value)}
                /><br />
                <label htmlFor='description'>Description </label><br />
                <textarea style={{width:'80vw'}} rows={10} id='description' value={description} onChange={(e) => setDescription(e.target.value)}
                ></textarea><br />
                <button type="submit">save</button>
                <button onClick={()=>props.setEditorMode(false)}>cancel</button>
            </form>
        </div>
    );
}

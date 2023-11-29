import React, { useState } from 'react'
import { addNote, updateNote } from '../services/noteServices';

export default function Editor(props) {
    const noteStyle = {
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const labelStyle = {
        fontSize: "20px",
        fontWeight: "bolder",
    }
    const inputFieldStyle={
        fontWeight: "bolder",
        borderRadius: "10px",
        padding: '5px',
        marginBottom:"15px",
        border: "4px inset #588157",

    }
    const buttonStyle={
        padding: '10px',
        margin:"20px 10px 0 0 ",
        fontWeight: "bolder",
        borderRadius: "15px",
        backgroundColor: "#90e0ef",
        border: "3px outset #023e8a",
    }

    const [title, setTitle] = useState(props.note.title);
    const [description, setDescription] = useState(props.note.description);
    const [color, setColor] = useState(props.note.color);



    const onSubmit = async (event) => {
        event.preventDefault();
        let _title = title.trim()
        let _description = description.trim()
        if (!_title && !_description) {
            console.log('please enter something!!!!');
            return;
        }
        if (!_title) {
            let temp = _description.split(' ');
            _title = temp[0];
        }

        const newNote = {
            ...props.note,
            title: _title,
            description: _description,
            color: color
        };
        if (props.mode === 'create') {
            const note = await addNote(newNote);
            props.setData((data) => [...data, note])
            console.log('created');
        } else if (props.note.title !== _title || props.note.description !== _description || props.note.color !== color) {
            const isUpdated = await updateNote(props.note.id, newNote);
            if (isUpdated) {
                props.setData((notes) => {
                    const indexOfNoteToUpdate = notes.findIndex((note) => note.id === props.note.id);
                    const updatedNote = { ...notes[indexOfNoteToUpdate], title: _title, description: _description, color: color }
                    const updatedNotes = [...notes];
                    updatedNotes[indexOfNoteToUpdate] = updatedNote;
                    return updatedNotes;
                })
                console.log('updated');
            }
        }

        setTitle('');
        setDescription('');
        props.set_defaults();
    };


    const onColorChange = (e) => {
        setColor(e.target.value)
        const rgbValues = hexToRgb(e.target.value);
        let limit = 180;

        if ((rgbValues.r + rgbValues.g + rgbValues.b) < 500) {
            if (rgbValues.r <= limit) { rgbValues.r = limit }
        }
        if ((rgbValues.r + rgbValues.g + rgbValues.b) < 500) {
            if (rgbValues.g <= limit) { rgbValues.g = limit }
        }
        if ((rgbValues.r + rgbValues.g + rgbValues.b) < 500) {
            // if(rgbValues.b<=limit){rgbValues.b=limit}
            rgbValues.b = limit
        }
        setColor(rgbToHex(rgbValues));
    }

    return (
        <div style={noteStyle}>
            <form onSubmit={onSubmit}>
                <label style={labelStyle} htmlFor='title'>Title </label><br />
                <input style={{...inputFieldStyle, width: '50vw',fontSize: "30px" }} id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <small> {255 - title.length} characters remaining</small><br />
                <label style={labelStyle} htmlFor='description'>Description </label><br />
                <textarea style={{...inputFieldStyle, width: '80vw' }} rows={10} id='description' value={description} onChange={(e) => setDescription(e.target.value)}
                ></textarea><br />
                <label style={labelStyle}>Pick a color : </label>
                <input style={{borderRadius: "10px",border: "4px inset #588157",}} type="color" id="colorPicker" value={color} onChange={onColorChange} /><br />
                <button style={buttonStyle} type="submit">save</button>
                <button style={buttonStyle} onClick={() => props.set_defaults()}>cancel</button>
            </form>

        </div>
    );
}










const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
};

const rgbToHex = (rgbValues) => {
    // Ensure that the values are in the valid range [0, 255]
    const clamp = (value) => Math.max(0, Math.min(255, value));

    // Convert each RGB value to a two-digit hexadecimal representation
    const hexR = clamp(rgbValues.r).toString(16).padStart(2, '0');
    const hexG = clamp(rgbValues.g).toString(16).padStart(2, '0');
    const hexB = clamp(rgbValues.b).toString(16).padStart(2, '0');

    // Combine the individual hex values to form the final hex color string
    return `#${hexR}${hexG}${hexB}`;
};

import React, { useContext, useState } from 'react';
import saveImg from '../../image/save.png';
import Header from './Header';
import SaveNote from './SaveNote';
import GlobalVarContext from '../../GlobalVariables';

export default function Editor(props) {
    const [title, setTitle] = useState(props.note.title);
    const [description, setDescription] = useState(props.note.description);
    const [color, setColor] = useState(props.note.color);
    const { setLoadingNotes } = useContext(GlobalVarContext);


    const onDescriptionChange = (e) => {
        let string=e.target.value;
        setDescription(string);
        setTitle(titleExtractor(string));
    }

    const onSave=()=>{
        if(description.trim().length){
            const newNote = {
                ...props.note,
                title: title,
                description: description,
                color: color
            };
            SaveNote(props,newNote,setLoadingNotes,props.showAlert);
        }
        setTitle('');
        setDescription('');
        props.set_defaults();
    }

    return (
        <div style={boardStyle}>
            <Header title={title} color={color} setColor={setColor} />
            <textarea style={textareaStyle} value={description} onChange={onDescriptionChange} />
            <button style={floatingButtonStyle} onClick={onSave}>
                <img src={saveImg} alt="Delete" style={saveImageStyle} />
            </button>
        </div>
    );
}


function titleExtractor(description, size = 15) {
    if(description.length===0){return "Take Note"}
    let firstLine = description.split('\n')[0];
    if (firstLine.length <= size) {
        return firstLine;
    }
    let words = firstLine.split(" ");
    let result = words[0].substr(0,size);

    for (let i = 1; i < words.length; i++) {
        let segment=words[i];
        if((result+segment).length>size){
            return result;
        }
        result+=" "+segment;
    }
    return result;

}

const boardStyle = {
    background: '#219ebc',
    margin: '0px',
    padding: '0px',
    height: '100vh',
};

const textareaStyle = {
    width: '90vw',
    height: '90vh',
    resize: 'none',
    border: 'none',
    outline: 'none',
    fontSize: '18px',
    marginTop: '1rem',
    padding: '10px',
    backgroundColor: '#8ecae6',
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '10px',
};

const saveImageStyle = {
    width: '1in',
    height: '1in',
    // opacity: '80%',
};

const floatingButtonStyle = {
    position: 'fixed',
    bottom: '1vw', // Adjust as needed
    right: '1vw', // Adjust as needed
    backgroundColor: 'transparent',
    border: 'none',
};


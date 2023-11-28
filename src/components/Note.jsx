import deleteImg from '../image/delete.png'
export default function Note(props) {
    const noteStyle = {
        width: "300px",
        height:"150px",
        display: "inline-block", // Set display to inline-block
        margin: "10px", // Add margin for spacing
        padding: "10px", // Add padding for better appearance
        border: "1px solid #ccc", // Add border for separation
    };
    const deleteImageStyle = {
        width: '20px', // Adjust the width as needed
        height: '20px', // Adjust the height as needed
    };

    const deleteButtonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <div style={noteStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h2 style={{padding:'0px'}}>{props.note.title}</h2>
                <button style={deleteButtonStyle} onClick={()=>props.delete_note(props.note.id)}>
                    <img src={deleteImg} alt="Delete" style={deleteImageStyle} />
                </button>
            </div>
            <p>{props.note.description}</p>
            <small style={{ color: 'grey' }}>{props.note.created_time}</small>
        </div>
    )
}
import deleteImg from '../image/delete.png'
export default function Note(props) {
    const noteStyle = {
        width: "300px",
        // height: "150px",
        display: "inline-block", // Set display to inline-block
        margin: "10px", // Add margin for spacing
        padding: "10px", // Add padding for better appearance
        border: "1px solid rgb(100, 100, 100)", // Add border for separation
        borderRadius: "10px",
        backgroundColor: props.note.color,
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
        <div style={noteStyle} onClick={() => props.on_note_click(props.note)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ padding: '0px', margin: '0' }}>{props.note.title.substr(0, 15)}</h2>
                <button style={deleteButtonStyle} onClick={(event) => props.delete_note(event, props.note.id)}>
                    <img src={deleteImg} alt="Delete" style={deleteImageStyle} />
                </button>
            </div>
            <p style={{ margin: '5px 0px', height: '20px' }}>{props.note.description.substr(0, 40)}</p>
            <small style={{ color: 'grey' }}>{props.note.created_time}</small>
        </div>

    )
}
import deleteImg from '../image/delete.png';
import { useEffect, useState } from 'react';

export default function Note(props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 600px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const noteStyle = {
    display: "inline-block",
    margin: "5px",
    padding: "20px",
    border: "1px solid rgb(100, 100, 100)",
    borderRadius: "10px",
    backgroundColor: props.note.color,
    width: isSmallScreen ? "360px" : "315px",
  };

  const deleteImageStyle = {
    width: '20px',
    height: '20px',
  };

  const deleteButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={noteStyle} onClick={() => props.on_note_click(props.note)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ padding: '0px', margin: '0' }}>{shortenTexts(props.note.title,15)}</h2>
        <button style={deleteButtonStyle} onClick={(event) => props.delete_note(event, props.note.id)}>
          <img src={deleteImg} alt="Delete" style={deleteImageStyle} />
        </button>
      </div>
      <p style={{ margin: '5px 0px', height: '20px' }}>{shortenTexts(props.note.description, 30)}</p>
      <small style={{ color: 'grey' }}>{props.note.created_time}</small>
    </div>
  );
}

function shortenTexts(text, size = 30) {
  if (text.length <= size) {
    return text;
  }
  return text.substr(0, size) + "...";
}

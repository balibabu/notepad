import deleteImg from '../image/delete.png';
import { useContext, useEffect, useState } from 'react';
import loadingImg from '../image/loadingBars.png';
import GlobalVarContext from '../GlobalVariables';
import convertUtcToLocal from './utility/AutoLocalTime';

export default function Note(props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loadingNotes } = useContext(GlobalVarContext);

  useEffect(() => {
    if (loadingNotes === props.note.id) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingNotes])

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
    margin: "5px 0px",
    marginLeft: "15px",
    padding: "20px",
    border: "1px solid rgb(100, 100, 100)",
    borderRadius: "10px",
    backgroundColor: props.note.color,
    width: isSmallScreen ? "80%" : "20%",
    opacity: isLoading && "50%"
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

  const onDeleteHandler = (event, noteid) => {
    setIsLoading(true);
    props.delete_note(event, noteid).then(() => {
      setIsLoading(false);
    })
  }

  return (
    <div style={noteStyle} onClick={() => props.on_note_click(props.note)}>
      {isLoading && <><img src={loadingImg} style={loadingImgStyle} /><style>{keyFrames}</style></>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ padding: '0px', margin: '0' }}>{props.note.title}</h3>
        <button style={deleteButtonStyle} onClick={(event) => onDeleteHandler(event, props.note.id)}>
          <img src={deleteImg} alt="Delete" style={deleteImageStyle} />
        </button>
      </div>
      <p style={{ margin: '5px 0px', height: '0px', visibility: "hidden" }}>{shortenTexts(props.note.description, 30)}</p>
      <small style={{ color: 'grey' }}>{convertUtcToLocal(props.note.created_time).toString()}</small>
    </div>
  );
}

function shortenTexts(text, size = 30) {

  if (text.length <= size) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return text.substr(0, size).charAt(0).toUpperCase() + text.substr(0, size).slice(1) + "...";
}


const loadingImgStyle = {
  width: "50px",
  height: "50px",
  position: 'absolute',
  marginLeft: "130px",
  animation: 'loadingImg-spin infinite 2.5s linear',

}

const keyFrames = `@keyframes loadingImg-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`
import React from 'react'
import loadingImg from '../../image/loadingBars.png';

export default function DummyLoadingNote() {
    const noteStyle = {
        display: "inline-block",
        margin: "5px 0px",
        marginLeft: "15px",
        padding: "20px",
        border: "1px solid rgb(100, 100, 100)",
        borderRadius: "10px",
        backgroundColor: "aqua",
        width: "80%",
        opacity:"50%"
    };
    
    return (
        <div style={noteStyle}>
            <img src={loadingImg} style={loadingImgStyle} />
            <style>{keyFrames}</style>
            <h3 style={{ padding: '0px', margin: '0' }}>Title</h3>
            <small style={{ color: 'grey' }}>time will be here</small>
        </div>
    )
}


const loadingImgStyle={
    width:"50px",
    height:"50px",
    position: 'absolute',
    marginLeft:"40%",
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
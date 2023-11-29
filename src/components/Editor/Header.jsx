import React, { useState } from 'react'

const colorOptions = ['#8eff61', '#ffc8dd', '#ff6161', '#d2fc6f', '#b061ff','#fa61ff','#fc6fb8','#6ff8fc']; // Add more colors as needed

export default function Header({title,color,setColor}) {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const handleColorClick = () => {
        setColorPickerVisible(!colorPickerVisible);
    };

    const handleColorSelect = (color) => {
        setColor(color);
        setColorPickerVisible(false);
    };
    return (
        <div style={headerStyle}>
            <div style={headerTextStyle}>{title}</div>
            <div style={{ ...colorPickerStyle, backgroundColor: color, }} onClick={handleColorClick}></div>
            {colorPickerVisible && (
                <div style={colorDropdownStyle}>
                    {colorOptions.map((color) => (
                        <div
                            key={color}
                            style={{ ...colorOptionStyle, backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    )
}


const headerStyle = {
    padding: '0 2vw',
    display: 'flex',
    alignItems: 'center', // Center items vertically
};

const headerTextStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginRight: 'auto', // Push the color picker to the right
};

const colorPickerStyle = {
    width: '50px',
    height: '50px',
    marginTop: '1vh',
    borderRadius: '100%',
    cursor: 'pointer', // Add pointer cursor for better user experience
};

const colorDropdownStyle = {
    position: 'absolute',
    top: '70px',
    right: '10px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '1'
};

const colorOptionStyle = {
    width: '30px',
    height: '30px',
    margin: '2px',
    borderRadius: '100%',
    cursor: 'pointer',
};
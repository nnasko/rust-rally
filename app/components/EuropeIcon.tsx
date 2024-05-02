import React from 'react'

const EuropeIcon = ({ h, w }: { h: number; w: number }) => {
    const logoStyles = {
        height: `${h}px`, 
        width: `${w}px`,
    };

    return (
        <div>
            <img src="/europe.png" alt="Logo" style={logoStyles} />
        </div>
    );
}

export default EuropeIcon
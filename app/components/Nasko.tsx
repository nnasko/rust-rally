import React from 'react'

const Nasko = ({ h, w }: { h: number; w: number }) => {
    const logoStyles = {
        height: `${h}px`, 
        width: `${w}px`,
    };

    return (
        <div>
            <img src="/nasko.jpg" alt="Logo" style={logoStyles} />
        </div>
    );
}

export default Nasko
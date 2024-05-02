import React from 'react'

const AmericasIcon = ({ h, w }: { h: number; w: number }) => {
    const logoStyles = {
        height: `${h}px`, 
        width: `${w}px`,
    };

    return (
        <div>
            <img src="/america.png" alt="Logo" style={logoStyles} />
        </div>
    );
}

export default AmericasIcon
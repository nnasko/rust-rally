import React from 'react'

const AsiaIcon = ({ h, w }: { h: number; w: number }) => {
    const logoStyles = {
        height: `${h}px`, 
        width: `${w}px`,
    };

    return (
        <div>
            <img src="/asia.png" alt="Logo" style={logoStyles} />
        </div>
    );
}

export default AsiaIcon
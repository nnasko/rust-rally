import React from 'react';

const Logo = ({ h, w }: { h: number; w: number }) => {
    const logoStyles = {
        height: `${h}px`, 
        width: `${w}px`,
    };

    return (
        <div>
            <img src="/logo.png" alt="Logo" style={logoStyles} />
        </div>
    );
}

export default Logo;

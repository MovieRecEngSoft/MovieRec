import React from 'react';


function Main(props){
    const bgImage = {
        backgroundImage: `url(${props.background})`,
        backgroundColor: '#cccccc',
        minHeight: '100%',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative'
    }

    return(
        <div style={bgImage}>
            {props.children}
        </div>
    );
}

export default Main;
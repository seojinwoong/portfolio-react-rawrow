import React from 'react'
import './LoadingIcon.css';

function LoadingIcon() {
    return (
        <div className="lds-wrapper">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingIcon


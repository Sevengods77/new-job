import React from 'react';
import './ContextHeader.css';

const ContextHeader = ({ title, description }) => {
    return (
        <div className="context-header">
            <h1 className="header-title">{title}</h1>
            <p className="header-description">{description}</p>
        </div>
    );
};

export default ContextHeader;

import React from 'react';
import './TopBar.css';
import { Circle, PlayCircle } from 'lucide-react';

const TopBar = ({ projectName = "KodNest Premium", currentStep = 1, totalSteps = 5, status = "In Progress" }) => {
    return (
        <div className="top-bar">
            <div className="project-identity">
                <div className="project-icon">
                    <PlayCircle size={20} color="var(--color-accent)" strokeWidth={2.5} />
                </div>
                <span className="project-name">{projectName}</span>
            </div>

            <div className="process-indicator">
                <span className="step-text">Step {currentStep} <span style={{ color: '#999' }}>/ {totalSteps}</span></span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                </div>
            </div>

            <div className={`status-badge status-${status.toLowerCase().replace(' ', '-')}`}>
                <Circle size={8} fill="currentColor" stroke="none" />
                <span className="status-text">{status}</span>
            </div>
        </div>
    );
};

export default TopBar;

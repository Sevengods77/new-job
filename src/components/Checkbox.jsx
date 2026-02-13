import React from 'react';
import { Check } from 'lucide-react';
import './Checkbox.css';

const Checkbox = ({ label, checked, onChange, id }) => {
    return (
        <div className={`checkbox-container ${checked ? 'checked' : ''}`} onClick={() => onChange(!checked)}>
            <div className="checkbox-box">
                {checked && <Check size={14} color="white" strokeWidth={3} />}
            </div>
            <span className="checkbox-label">{label}</span>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default Checkbox;

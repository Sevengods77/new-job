import React from 'react';
import { X, MapPin, Briefcase, DollarSign, Globe } from 'lucide-react';
import Button from './Button';

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '32px',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '24px',
                        right: '24px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-subtext)'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '8px', paddingRight: '40px' }}>{job.title}</h2>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '24px' }}>{job.company}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-subtext)' }}>
                        <MapPin size={20} />
                        <span>{job.location} ({job.mode})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-subtext)' }}>
                        <Briefcase size={20} />
                        <span>{job.experience}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-subtext)' }}>
                        <DollarSign size={20} />
                        <span>{job.salaryRange}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-subtext)' }}>
                        <Globe size={20} />
                        <span>{job.source}</span>
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>Description</h4>
                    <p style={{ lineHeight: '1.6', color: 'var(--color-subtext)' }}>{job.description}</p>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>Skills</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {job.skills.map((skill, index) => (
                            <span key={index} style={{
                                backgroundColor: '#f0f0f0',
                                padding: '6px 12px',
                                borderRadius: '100px',
                                fontSize: '0.9rem',
                                color: '#333'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <Button variant="primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                        Apply Now
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default JobModal;

import React from 'react';
import Card from './Card';
import Button from './Button';
import { MapPin, Briefcase, Clock, Bookmark, Eye, ExternalLink, CheckCircle, XCircle, Circle } from 'lucide-react';
import { getScoreColor } from '../utils/scoring';
import useJobStatus from '../hooks/useJobStatus';

const JobCard = ({ job, isSaved, onSave, onView }) => {
    const scoreColor = getScoreColor(job.matchScore || 0);
    const { getStatus, updateStatus } = useJobStatus();
    const currentStatus = getStatus(job.id);

    const handleStatusChange = (newStatus) => {
        updateStatus(job.id, newStatus);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return '#007bff'; // Explicit Blue
            case 'Selected': return 'var(--color-success, #28a745)';
            case 'Rejected': return 'var(--color-error, #dc3545)';
            default: return 'var(--color-subtext, #6c757d)';
        }
    };

    const isStatusActive = (status) => currentStatus === status;

    return (
        <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', gap: '16px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ paddingRight: '40px' }}> {/* Space for score badge */}
                    <h3 style={{ margin: '0 0 4px 0', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>{job.title}</h3>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>{job.company}</p>
                </div>
                <button
                    onClick={() => onSave(job.id)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: isSaved ? 'var(--color-accent)' : 'var(--color-border)'
                    }}
                >
                    <Bookmark fill={isSaved ? 'currentColor' : 'none'} size={24} />
                </button>
            </div>

            {/* Match Score Badge */}
            {job.matchScore !== undefined && (
                <div style={{
                    position: 'absolute',
                    top: '24px',
                    right: '60px', /* Left of Bookmark */
                    backgroundColor: scoreColor,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {job.matchScore}
                </div>
            )}

            {/* Status Tracking */}
            <div style={{ display: 'flex', gap: '8px', padding: '8px 0', overflowX: 'auto' }}>
                {['Not Applied', 'Applied', 'Rejected', 'Selected'].map((status) => (
                    <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            borderRadius: '16px',
                            border: `1px solid ${isStatusActive(status) ? getStatusColor(status) : '#e0e0e0'}`,
                            backgroundColor: isStatusActive(status) ? getStatusColor(status) : 'transparent',
                            color: isStatusActive(status) ? 'white' : '#666',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {status === 'Selected' && <CheckCircle size={12} />}
                        {status === 'Rejected' && <XCircle size={12} />}
                        {(status === 'Applied' || status === 'Not Applied') && <Circle size={12} fill={isStatusActive(status) ? 'currentColor' : 'none'} />}
                        {status}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.9rem', color: 'var(--color-subtext)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={16} />
                    <span>{job.location} ({job.mode})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Briefcase size={16} />
                    <span>{job.experience}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={16} />
                    <span>{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ExternalLink size={16} />
                    <span>{job.source}</span>
                </div>
            </div>

            <div style={{
                backgroundColor: '#F5F5F5',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: 600,
                width: 'fit-content'
            }}>
                {job.salaryRange}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                <Button variant="secondary" onClick={() => onView(job)} style={{ flex: 1, justifyContent: 'center' }}>
                    <Eye size={16} style={{ marginRight: '8px' }} /> View
                </Button>
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, textDecoration: 'none' }}
                >
                    <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Apply <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                    </Button>
                </a>
            </div>
        </Card>
    );
};

export default JobCard;

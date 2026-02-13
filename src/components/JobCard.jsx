import React from 'react';
import Card from './Card';
import Button from './Button';
import { MapPin, Briefcase, Clock, Bookmark, Eye, ExternalLink } from 'lucide-react';

const JobCard = ({ job, isSaved, onSave, onView }) => {
    return (
        <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
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

            <div style={{ position: 'absolute', bottom: '24px', right: '24px', opacity: 0 }}>
                {/* Hidden source for accessible reading or future use if needed, displaying source as badge instead */}
            </div>
            <span style={{
                position: 'absolute',
                top: '24px',
                right: '60px',
                fontSize: '0.75rem',
                color: '#999',
                border: '1px solid #eee',
                padding: '2px 6px',
                borderRadius: '4px'
            }}>
                {job.source}
            </span>
        </Card>
    );
};

export default JobCard;

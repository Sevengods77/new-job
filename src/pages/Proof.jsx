import React, { useState, useEffect } from 'react';
import { Copy, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { TEST_ITEMS } from '../utils/testItems';

const STEPS = [
    { id: 'step1', label: 'Project Setup & Design System', status: 'Completed' },
    { id: 'step2', label: 'Job Card Component', status: 'Completed' },
    { id: 'step3', label: 'Job Feed & Mock Data', status: 'Completed' },
    { id: 'step4', label: 'Saved Jobs Feature', status: 'Completed' },
    { id: 'step5', label: 'Daily Digest Logic', status: 'Completed' },
    { id: 'step6', label: 'Settings & Preferences', status: 'Completed' },
    { id: 'step7', label: 'Test Checklist System', status: 'Pending' }, // Dynamic
    { id: 'step8', label: 'Final Proof & Deploy', status: 'Pending' },   // Dynamic
];

const Proof = () => {
    const [links, setLinks] = useState({
        project: '',
        github: '',
        deploy: ''
    });
    const [testStatus, setTestStatus] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const savedLinks = localStorage.getItem('job_tracker_proof_data');
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        }

        const savedTests = localStorage.getItem('job_tracker_test_status');
        if (savedTests) {
            const parsed = JSON.parse(savedTests);
            const passedCount = Object.values(parsed).filter(Boolean).length;
            setTestStatus(passedCount === TEST_ITEMS.length);
        }
    }, []);

    const handleLinkChange = (field, value) => {
        const newLinks = { ...links, [field]: value };
        setLinks(newLinks);
        localStorage.setItem('job_tracker_proof_data', JSON.stringify(newLinks));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const getStatus = () => {
        const allLinksValid = Object.values(links).every(l => isValidUrl(l));
        if (allLinksValid && testStatus) return 'Shipped';
        if (Object.values(links).some(l => l.length > 0)) return 'In Progress';
        return 'Not Started';
    };

    const status = getStatus();

    const generateSubmission = () => {
        return `Job Notification Tracker — Final Submission

Antigravity Project:
${links.project || '[Pending]'}

GitHub Repository:
${links.github || '[Pending]'}

Live Deployment:
${links.deploy || '[Pending]'}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateSubmission());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'Not Started': 'var(--color-subtext)',
            'In Progress': 'var(--color-warning)',
            'Shipped': 'var(--color-success)'
        };
        return (
            <span style={{
                backgroundColor: `${colors[status]}20`,
                color: colors[status],
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                border: `1px solid ${colors[status]}40`
            }}>
                {status}
            </span>
        );
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-md) var(--space-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Project 1 — Job Notification Tracker</h2>
                    <p style={{ color: 'var(--color-subtext)' }}>Finalize your submission artifacts.</p>
                </div>
                <StatusBadge status={status} />
            </div>

            {status === 'Shipped' && (
                <div style={{
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    color: 'var(--color-success)',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: 'var(--space-md)',
                    textAlign: 'center',
                    border: '1px solid rgba(46, 125, 50, 0.2)'
                }}>
                    Project 1 Shipped Successfully.
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                {/* Section A: Steps */}
                <div style={{ background: 'var(--color-card-bg)', padding: 'var(--space-md)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-sm)' }}>Step Completion</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {STEPS.map(step => {
                            let stepStatus = step.status;
                            if (step.id === 'step7') stepStatus = testStatus ? 'Completed' : 'Pending';
                            if (step.id === 'step8') stepStatus = status === 'Shipped' ? 'Completed' : 'Pending';

                            return (
                                <div key={step.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: stepStatus === 'Completed' ? 'var(--color-text)' : 'var(--color-subtext)' }}>{step.label}</span>
                                    {stepStatus === 'Completed' ? <Check size={16} color="var(--color-success)" /> : <span style={{ color: 'var(--color-subtext)' }}>○</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Section B: Inputs */}
                <div style={{ background: 'var(--color-card-bg)', padding: 'var(--space-md)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-sm)' }}>Artifact Collection</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { id: 'project', label: 'Antigravity Project Link' },
                            { id: 'github', label: 'GitHub Repository Link' },
                            { id: 'deploy', label: 'Deployed URL' }
                        ].map(field => (
                            <div key={field.id}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: '500' }}>{field.label}</label>
                                <input
                                    type="text"
                                    value={links[field.id]}
                                    onChange={(e) => handleLinkChange(field.id, e.target.value)}
                                    placeholder="https://..."
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: `1px solid ${links[field.id] && !isValidUrl(links[field.id]) ? 'var(--color-error)' : 'var(--color-border)'}`,
                                        fontSize: '0.9rem'
                                    }}
                                />
                                {links[field.id] && !isValidUrl(links[field.id]) && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>Invalid URL</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section C: Submission */}
            <div style={{ background: 'var(--color-card-bg)', padding: 'var(--space-md)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                    <h3 style={{ fontSize: '1.2rem' }}>Final Submission Export</h3>
                    <button
                        onClick={handleCopy}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'var(--color-text)', color: 'var(--color-bg)',
                            border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.9rem'
                        }}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Final Submission'}
                    </button>
                </div>
                <pre style={{
                    background: 'var(--color-bg)',
                    padding: 'var(--space-sm)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    color: 'var(--color-subtext)',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                }}>
                    {generateSubmission()}
                </pre>
            </div>
        </div>
    );
};

export default Proof;

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Settings = () => {
    const [formData, setFormData] = useState({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: {
            Remote: false,
            Hybrid: false,
            Onsite: false
        },
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            const parsed = JSON.parse(savedPrefs);
            // Convert arrays back to strings/object state if needed for form
            setFormData({
                roleKeywords: parsed.roleKeywords ? parsed.roleKeywords.join(', ') : '',
                preferredLocations: parsed.preferredLocations || [],
                preferredMode: {
                    Remote: parsed.preferredMode?.includes('Remote') || false,
                    Hybrid: parsed.preferredMode?.includes('Hybrid') || false,
                    Onsite: parsed.preferredMode?.includes('Onsite') || false
                },
                experienceLevel: parsed.experienceLevel || '',
                skills: parsed.skills ? parsed.skills.join(', ') : '',
                minMatchScore: parsed.minMatchScore || 40
            });
        }
    }, []);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleModeChange = (mode) => {
        setFormData(prev => ({
            ...prev,
            preferredMode: {
                ...prev.preferredMode,
                [mode]: !prev.preferredMode[mode]
            }
        }));
    };

    // handleLocationChange removed as we now use direct add/remove logic


    const handleSave = () => {
        // Transform for storage
        const preferences = {
            roleKeywords: formData.roleKeywords.split(',').map(s => s.trim()).filter(Boolean),
            preferredLocations: formData.preferredLocations,
            preferredMode: Object.keys(formData.preferredMode).filter(k => formData.preferredMode[k]),
            experienceLevel: formData.experienceLevel,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            minMatchScore: Number(formData.minMatchScore)
        };

        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
        setMessage('Preferences saved! Dashboard will now reflect your matches.');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleClear = () => {
        localStorage.removeItem('jobTrackerPreferences');
        setFormData({
            roleKeywords: '',
            preferredLocations: [],
            preferredMode: {
                Remote: false,
                Hybrid: false,
                Onsite: false
            },
            experienceLevel: '',
            skills: '',
            minMatchScore: 40
        });
        setMessage('Preferences cleared. Intelligent matching disabled.');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '24px' }}>Configuration</h1>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0 }}>Job Preferences</h3>
                    {message && <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>{message}</span>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Input
                        label="Role Keywords (Comma separated)"
                        id="role-keywords"
                        placeholder="e.g. React Developer, Product Manager"
                        value={formData.roleKeywords}
                        onChange={(e) => handleChange('roleKeywords', e.target.value)}
                    />

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Preferred Locations</label>

                        {/* Location Selection Area */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <select
                                id="location-select"
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--color-border)',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="">Select a location...</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Gurgaon">Gurgaon</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Noida">Noida</option>
                                <option value="Remote">Remote</option>
                                <option value="Delhi">Delhi</option>
                            </select>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    const select = document.getElementById('location-select');
                                    const val = select.value;
                                    if (val && !formData.preferredLocations.includes(val)) {
                                        handleChange('preferredLocations', [...formData.preferredLocations, val]);
                                    }
                                    select.value = '';
                                }}
                            >
                                Add
                            </Button>
                        </div>

                        {/* Selected Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '4px 0' }}>
                            {formData.preferredLocations.map(loc => (
                                <div key={loc} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    backgroundColor: '#EEE',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}>
                                    {loc}
                                    <button
                                        onClick={() => {
                                            handleChange('preferredLocations', formData.preferredLocations.filter(l => l !== loc));
                                        }}
                                        style={{
                                            border: 'none',
                                            background: 'none',
                                            cursor: 'pointer',
                                            padding: '0 2px',
                                            fontSize: '1.2rem',
                                            lineHeight: '1',
                                            color: '#666'
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            {formData.preferredLocations.length === 0 && (
                                <span style={{ color: 'var(--color-subtext)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                    No locations selected.
                                </span>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Work Mode</label>
                            <div style={{ display: 'flex', gap: '16px', padding: '10px 0' }}>
                                {Object.keys(formData.preferredMode).map(mode => (
                                    <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.preferredMode[mode]}
                                            onChange={() => handleModeChange(mode)}
                                        />
                                        {mode}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Experience Level</label>
                            <select
                                value={formData.experienceLevel}
                                onChange={(e) => handleChange('experienceLevel', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--color-border)',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="" disabled>Select Level...</option>
                                <option value="Fresher">Fresher</option>
                                <option value="0-1 Years">0-1 Years</option>
                                <option value="1-3 Years">1-3 Years</option>
                                <option value="3-5 Years">3-5 Years</option>
                                <option value="5+ Years">5+ Years</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Skills (Comma separated)"
                        id="skills"
                        placeholder="e.g. React, Java, AWS"
                        value={formData.skills}
                        onChange={(e) => handleChange('skills', e.target.value)}
                    />

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Minimum Match Score</label>
                            <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{formData.minMatchScore}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.minMatchScore}
                            onChange={(e) => handleChange('minMatchScore', e.target.value)}
                            style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                        />
                    </div>

                </div>

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <Button variant="secondary" onClick={handleClear} style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>Clear Preferences</Button>
                    <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
                </div>
            </Card>
        </div>
    );
};

export default Settings;

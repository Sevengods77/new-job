import React from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Settings = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '24px' }}>Configuration</h1>

            <Card>
                <h3 style={{ marginBottom: '24px' }}>Job Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Input
                        label="Role Keywords"
                        id="role-keywords"
                        placeholder="e.g. React Developer, Product Manager"
                    />

                    <Input
                        label="Preferred Locations"
                        id="locations"
                        placeholder="e.g. Remote, New York, London"
                    />

                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Work Mode</label>
                            <select style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid var(--color-border)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            }}>
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>Onsite</option>
                            </select>
                        </div>

                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Experience Level</label>
                            <select style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid var(--color-border)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            }}>
                                <option>Junior (0-2 years)</option>
                                <option>Mid-Level (3-5 years)</option>
                                <option>Senior (5+ years)</option>
                                <option>Lead / Staff</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary">Save Preferences</Button>
                </div>
            </Card>
        </div>
    );
};

export default Settings;

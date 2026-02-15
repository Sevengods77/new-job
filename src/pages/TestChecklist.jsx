import React, { useState, useEffect } from 'react';
import Checkbox from '../components/Checkbox';
import { Info, RefreshCw } from 'lucide-react';

import { TEST_ITEMS } from '../utils/testItems';

const TestChecklist = () => {
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const savedStatus = localStorage.getItem('job_tracker_test_status');
        if (savedStatus) {
            try {
                setCheckedItems(JSON.parse(savedStatus));
            } catch (e) {
                console.error("Failed to parse test status", e);
            }
        }
    }, []);

    const handleCheck = (id, isChecked) => {
        const newStatus = { ...checkedItems, [id]: isChecked };
        setCheckedItems(newStatus);
        localStorage.setItem('job_tracker_test_status', JSON.stringify(newStatus));
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all test progress?")) {
            setCheckedItems({});
            localStorage.removeItem('job_tracker_test_status');
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalCount = TEST_ITEMS.length;
    const isReadyToShip = passedCount === totalCount;

    return (
        <div style={{ padding: 'var(--space-md)', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-md)',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: 'var(--space-sm)'
            }}>
                <div>
                    <h2 style={{ marginBottom: 'var(--space-xs)' }}>Pre-Ship Checklist</h2>
                    <p style={{
                        color: isReadyToShip ? 'var(--color-success)' : 'var(--color-subtext)',
                        fontWeight: '500'
                    }}>
                        Tests Passed: {passedCount} / {totalCount}
                    </p>
                </div>
                <button
                    onClick={handleReset}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border)',
                        background: 'transparent',
                        color: 'var(--color-text)',
                        fontSize: '14px'
                    }}
                >
                    <RefreshCw size={14} /> Reset Test Status
                </button>
            </div>

            {!isReadyToShip && (
                <div style={{
                    backgroundColor: 'rgba(245, 124, 0, 0.1)',
                    color: 'var(--color-warning)',
                    padding: '12px',
                    borderRadius: '4px',
                    marginBottom: 'var(--space-md)',
                    border: '1px solid rgba(245, 124, 0, 0.2)'
                }}>
                    ⚠️ Resolve all issues before shipping. Route <strong>/jt/08-ship</strong> is currently locked.
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {TEST_ITEMS.map((item) => (
                    <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: 'var(--color-card-bg)',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Checkbox
                                id={item.id}
                                checked={!!checkedItems[item.id]}
                                onChange={(val) => handleCheck(item.id, val)}
                            />
                            <label htmlFor={item.id} style={{ cursor: 'pointer', fontWeight: '500' }}>
                                {item.label}
                            </label>
                        </div>
                        <div title={item.tip} style={{ color: 'var(--color-subtext)', cursor: 'help' }}>
                            <Info size={16} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestChecklist;

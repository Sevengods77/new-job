import React from 'react';
import Input from './Input';

const FilterBar = ({ filters, onFilterChange }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            marginBottom: '32px',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <Input
                id="search"
                placeholder="Search by title or company..."
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
                style={{ marginBottom: 0 }}
            />

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <select
                    value={filters.location}
                    onChange={(e) => onFilterChange('location', e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', flex: 1, minWidth: '120px' }}
                >
                    <option value="">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Noida">Noida</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    value={filters.mode}
                    onChange={(e) => onFilterChange('mode', e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', flex: 1, minWidth: '120px' }}
                >
                    <option value="">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                </select>

                <select
                    value={filters.experience}
                    onChange={(e) => onFilterChange('experience', e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', flex: 1, minWidth: '120px' }}
                >
                    <option value="">All Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                </select>

                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', flex: 1, minWidth: '120px' }}
                >
                    <option value="">All Statuses</option>
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                </select>

                <select
                    value={filters.sort}
                    onChange={(e) => onFilterChange('sort', e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', flex: 1, minWidth: '120px' }}
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="score">Match Score</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;

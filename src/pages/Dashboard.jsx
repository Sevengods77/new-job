import React, { useState, useEffect } from 'react';
import jobsData from '../data/jobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobModal from '../components/JobModal';
import { calculateMatchScore } from '../utils/scoring';
import { Link } from 'react-router-dom';
import useJobStatus from '../hooks/useJobStatus';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        mode: '',
        experience: '',
        status: '', // Added status filter
        source: '',
        sort: 'latest' // 'latest', 'score', 'salary'
    });
    const [preferences, setPreferences] = useState(null);
    const [showMatchesOnly, setShowMatchesOnly] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const { statuses } = useJobStatus();

    // Initial Load: Preferences and Saved Jobs
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        setSavedJobIds(saved);

        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        } else {
            // No preferences set
        }
    }, []);

    // Calculate Scores when Preferences or Jobs Change
    useEffect(() => {
        let scoredJobs = jobsData.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));
        setJobs(scoredJobs);
    }, [preferences]);

    // Filtering Logic
    useEffect(() => {
        if (jobs.length === 0) return;

        let result = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.search.toLowerCase());
            const matchesLocation = filters.location ? job.location === filters.location : true;
            const matchesMode = filters.mode ? job.mode === filters.mode : true;
            const matchesExperience = filters.experience ? job.experience === filters.experience : true;
            const matchesThreshold = showMatchesOnly && preferences ? job.matchScore >= preferences.minMatchScore : true;

            // Status Filtering
            const jobStatus = statuses[job.id]?.status || 'Not Applied';
            const matchesStatus = filters.status ? jobStatus === filters.status : true;

            // Added Source Filter if needed later, currently not in FilterBar state fully but logical
            // const matchesSource = filters.source ? job.source === filters.source : true;

            return matchesSearch && matchesLocation && matchesMode && matchesExperience && matchesThreshold && matchesStatus;
        });

        // Sort Logic
        if (filters.sort === 'latest') {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else if (filters.sort === 'oldest') {
            result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        } else if (filters.sort === 'score') {
            result.sort((a, b) => b.matchScore - a.matchScore);
        }
        // Salary sort could be complex string parsing, leaving for now as requested simple

        setFilteredJobs(result);
    }, [filters, jobs, showMatchesOnly, preferences, statuses]);


    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = (id) => {
        let newSavedIds;
        if (savedJobIds.includes(id)) {
            newSavedIds = savedJobIds.filter(savedId => savedId !== id);
        } else {
            newSavedIds = [...savedJobIds, id];
        }
        setSavedJobIds(newSavedIds);
        localStorage.setItem('savedJobIds', JSON.stringify(newSavedIds));
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', margin: 0 }}>Job Discovery</h1>

                {preferences && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Show only matches ({preferences.minMatchScore}+)</span>
                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                            <input
                                type="checkbox"
                                checked={showMatchesOnly}
                                onChange={() => setShowMatchesOnly(!showMatchesOnly)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: showMatchesOnly ? 'var(--color-accent)' : '#ccc',
                                transition: '.4s', borderRadius: '34px'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '2px', bottom: '2px',
                                    backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                                    transform: showMatchesOnly ? 'translateX(20px)' : 'translateX(0)'
                                }}></span>
                            </span>
                        </label>
                    </div>
                )}
            </div>

            {!preferences && (
                <div style={{
                    backgroundColor: 'var(--color-text)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>Set your preferences to activate intelligent matching.</span>
                    <Link to="/settings" style={{ color: 'white', textDecoration: 'underline' }}>Configure</Link>
                </div>
            )}

            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {/* Extended FilterBar Logic for Sort by Score - I should update FilterBar component to include 'Match Score' option */}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} style={{ position: 'relative' }}>
                            <JobCard
                                job={job}
                                isSaved={savedJobIds.includes(job.id)}
                                onSave={handleSave}
                                onView={setSelectedJob}
                            />
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--color-subtext)' }}>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '16px' }}>No matches found</h3>
                        <p>Adjust your filters or {showMatchesOnly ? 'lower your match threshold' : 'check back later'}.</p>
                    </div>
                )}
            </div>

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;

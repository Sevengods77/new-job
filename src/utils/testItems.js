
export const TEST_ITEMS = [
    { id: 'prefs_persist', label: 'Preferences persist after refresh', tip: 'Change settings, refresh page, verify they are still there.' },
    { id: 'match_score', label: 'Match score calculates correctly', tip: 'Check a job card, verify score matches keyword overlap.' },
    { id: 'show_matches_toggle', label: '"Show only matches" toggle works', tip: 'Toggle on, ensure only high match jobs are visible.' },
    { id: 'save_job', label: 'Save job persists after refresh', tip: 'Save a job, refresh, check Saved tab.' },
    { id: 'apply_new_tab', label: 'Apply opens in new tab', tip: 'Click Apply, ensure new browser tab opens.' },
    { id: 'status_update', label: 'Status update persists after refresh', tip: 'Change status to Applied, refresh, verify persistence.' },
    { id: 'status_filter', label: 'Status filter works correctly', tip: 'Filter by "Saved", ensure only saved jobs show.' },
    { id: 'digest_top_10', label: 'Digest generates top 10 by score', tip: 'Go to Digest, count items and check sorting.' },
    { id: 'digest_persist', label: 'Digest persists for the day', tip: 'Refresh Digest page, ensure same jobs are shown.' },
    { id: 'no_console_errors', label: 'No console errors on main pages', tip: 'Open DevTools (F12), browse pages, check Console.' },
];

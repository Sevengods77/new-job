export const calculateMatchScore = (job, preferences) => {
    if (!preferences) return 0;

    let score = 0;
    const {
        roleKeywords = [],
        preferredLocations = [],
        preferredMode = [],
        experienceLevel = '',
        skills = []
    } = preferences;

    // Helper for case-insensitive check
    const containsKeyword = (text, keywords) => {
        if (!text || !keywords || keywords.length === 0) return false;
        const lowerText = text.toLowerCase();
        return keywords.some(k => lowerText.includes(k.toLowerCase().trim()));
    };

    // 1. Role Keywords in Title (+25)
    if (containsKeyword(job.title, roleKeywords)) {
        score += 25;
    }

    // 2. Role Keywords in Description (+15)
    if (containsKeyword(job.description, roleKeywords)) {
        score += 15;
    }

    // 3. Location Match (+15)
    // loose match: if job.location is in preferredLocations array (case insensitive)
    if (preferredLocations.some(loc => job.location.toLowerCase() === loc.toLowerCase().trim())) {
        score += 15;
    }

    // 4. Mode Match (+10)
    if (preferredMode.some(mode => job.mode.toLowerCase() === mode.toLowerCase())) {
        score += 10;
    }

    // 5. Experience Match (+10)
    // Exact match on string for now, or simplified inclusion
    if (experienceLevel && job.experience === experienceLevel) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    // If any job skill matches any user skill
    if (job.skills && skills.length > 0) {
        const hasSkillOverlap = job.skills.some(jobSkill =>
            skills.some(userSkill => jobSkill.toLowerCase() === userSkill.toLowerCase().trim())
        );
        if (hasSkillOverlap) {
            score += 15;
        }
    }

    // 7. Posted Days Ago <= 2 (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source is LinkedIn (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap at 100
    return Math.min(score, 100);
};

export const getScoreColor = (score) => {
    if (score >= 80) return 'var(--color-success)'; // Green
    if (score >= 60) return 'var(--color-warning)'; // Amber
    if (score >= 40) return '#9E9E9E'; // Neutral Grey (using hex as var might not exist, checking index.css later)
    return '#E0E0E0'; // Subtle Grey
};

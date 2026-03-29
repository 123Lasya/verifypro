/* Mock Database Service */

const DB_KEY = 'verifyPro_db';
const CURRENT_USER_KEY = 'verifyPro_currentUser';

const INITIAL_DB = {
    candidates: [
        {
            id: 'USR7X9K2M',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'candidate',
            status: 'verified',
            riskScore: 8,
            uploadDate: '2024-01-15',
            documents: {
                resume: 'resume_johndoe.pdf',
                digiLocker: true
            },
            details: {
                education: { status: 'verified', source: 'DigiLocker', match: true },
                experience: { status: 'verified', source: 'WorkHistory', match: true }
            }
        },
        {
            id: 'USR3M8N1K',
            name: 'Sarah Smith',
            email: 'sarah.smith@example.com',
            role: 'candidate',
            status: 'pending',
            riskScore: 45,
            uploadDate: '2024-01-20',
            documents: {
                resume: 'resume_sarah.pdf',
                digiLocker: false
            },
            details: null // Not processed yet
        }
    ]
};

// Initialize DB if empty
if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DB));
}

export const MockDB = {
    getAllCandidates: () => {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        return db.candidates;
    },

    getCandidateById: (id) => {
        const candidates = MockDB.getAllCandidates();
        return candidates.find(c => c.id === id);
    },

    getCandidateByEmail: (email) => {
        const candidates = MockDB.getAllCandidates();
        return candidates.find(c => c.email === email);
    },

    createCandidate: (data) => {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        const newCandidate = {
            id: 'USR' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            role: 'candidate',
            status: 'pending',
            riskScore: 0, // Initial score 0 until analysis
            uploadDate: new Date().toISOString().split('T')[0],
            details: null,
            ...data
        };
        db.candidates.unshift(newCandidate); // Add to top
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        return newCandidate;
    },

    updateCandidateStatus: (id, status, details = {}) => {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        const index = db.candidates.findIndex(c => c.id === id);
        if (index !== -1) {
            db.candidates[index].status = status;
            db.candidates[index].details = { ...db.candidates[index].details, ...details };

            // Recalculate risk based on status for demo
            if (status === 'verified') db.candidates[index].riskScore = 5;
            if (status === 'rejected') db.candidates[index].riskScore = 95;

            localStorage.setItem(DB_KEY, JSON.stringify(db));
            return db.candidates[index];
        }
        return null;
    },

    // Debug method
    resetDB: () => {
        localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DB));
    },

    // Session Management
    login: (email, role) => {
        const user = { email, role };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return user;
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
};

/* Verification Logic Simulation */
export const VerificationEngine = {
    runAnalysis: (candidateId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Deterministic logic based on ID string
                let hash = 0;
                for (let i = 0; i < candidateId.length; i++) {
                    hash = candidateId.charCodeAt(i) + ((hash << 5) - hash);
                }

                // Use last digit of hash to determine outcome
                // 0-2 (30%): Low Score / High Risk (Fail)
                // 3-9 (70%): High Score / Low Risk (Success)
                const isSuccess = Math.abs(hash % 10) >= 3;

                resolve({
                    riskScore: isSuccess ? Math.abs(hash % 20) : 60 + Math.abs(hash % 40),
                    discrepancies: isSuccess ? [] : ['Education dates do not match DigiLocker records'],
                    educationMatch: isSuccess,
                    authenticityScore: isSuccess ? 90 + Math.abs(hash % 10) : 40 + Math.abs(hash % 20)
                });
            }, 1500);
        });
    }
};

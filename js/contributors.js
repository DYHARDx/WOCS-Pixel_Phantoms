// GitHub Repository Configuration
const REPO_OWNER = 'sayeeg-11';
const REPO_NAME = 'Pixel_Phantoms';
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

document.addEventListener('DOMContentLoaded', () => {
    fetchRepoStats();
    fetchContributors();
    fetchRecentActivity();
});

// 1. Fetch Basic Repo Stats
async function fetchRepoStats() {
    try {
        const response = await fetch(API_BASE);
        const data = await response.json();

        document.getElementById('total-stars').textContent = data.stargazers_count;
        document.getElementById('total-forks').textContent = data.forks_count;
        // Note: Total commits requires a header to get count or iterating, 
        // simplified here to basic stats available in summary.
    } catch (error) {
        console.error('Error fetching repo stats:', error);
    }
}

// 2. Fetch Contributors & Identify Lead
async function fetchContributors() {
    try {
        const response = await fetch(`${API_BASE}/contributors?per_page=100`);
        const contributors = await response.json();
        
        const grid = document.getElementById('contributors-grid');
        const leadAvatar = document.getElementById('lead-avatar');
        
        // Update Total Contributors Count
        document.getElementById('total-contributors').textContent = contributors.length;

        // Populate Grid
        grid.innerHTML = '';
        let totalCommits = 0;

        contributors.forEach((contributor, index) => {
            totalCommits += contributor.contributions;

            // Logic to update Lead card based on User ID or Owner
            // Assuming 'sayeeg-11' is the lead based on repo owner
            if(contributor.login.toLowerCase() === REPO_OWNER.toLowerCase()) {
                leadAvatar.src = contributor.avatar_url;
            }

            // Create Contributor Card
            const card = document.createElement('div');
            card.className = 'contributor-card';
            card.innerHTML = `
                <img src="${contributor.avatar_url}" alt="${contributor.login}">
                <a href="${contributor.html_url}" target="_blank" class="cont-name">${contributor.login}</a>
                <span class="cont-commits">${contributor.contributions} Commits</span>
            `;
            grid.appendChild(card);
        });

        document.getElementById('total-commits').textContent = totalCommits;

    } catch (error) {
        console.error('Error fetching contributors:', error);
        document.getElementById('contributors-grid').innerHTML = '<p>Failed to load contributors.</p>';
    }
}

// 3. Fetch Recent Commit Activity
async function fetchRecentActivity() {
    try {
        const response = await fetch(`${API_BASE}/commits?per_page=10`);
        const commits = await response.json();
        
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = '';

        commits.forEach(item => {
            const date = new Date(item.commit.author.date).toLocaleDateString();
            const message = item.commit.message;
            const author = item.commit.author.name;

            const row = document.createElement('div');
            row.className = 'activity-item';
            row.innerHTML = `
                <div class="activity-marker"></div>
                <div class="commit-msg">
                    <span style="color: var(--accent-color)">${author}</span>: ${message}
                </div>
                <div class="commit-date">${date}</div>
            `;
            activityList.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching activity:', error);
    }
}
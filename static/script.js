// ─── History Data ───────────────────────────
const maxPoints = 20;
const labels = [];
const cpuData = [];
const memData = [];
const diskData = [];

// ─── Chart Setup ────────────────────────────
const ctx = document.getElementById('historyChart').getContext('2d');
const historyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'CPU %',
                data: cpuData,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0,212,255,0.08)',
                tension: 0.4, fill: true, pointRadius: 2
            },
            {
                label: 'Memory %',
                data: memData,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0,255,136,0.08)',
                tension: 0.4, fill: true, pointRadius: 2
            },
            {
                label: 'Disk %',
                data: diskData,
                borderColor: '#ffcc00',
                backgroundColor: 'rgba(255,204,0,0.08)',
                tension: 0.4, fill: true, pointRadius: 2
            }
        ]
    },
    options: {
        responsive: true,
        animation: { duration: 300 },
        scales: {
            x: {
                ticks: { color: '#4a6080', font: { size: 10 } },
                grid: { color: 'rgba(255,255,255,0.05)' }
            },
            y: {
                min: 0, max: 100,
                ticks: { color: '#4a6080', font: { size: 10 } },
                grid: { color: 'rgba(255,255,255,0.05)' }
            }
        },
        plugins: {
            legend: { labels: { color: '#c8d8f0', font: { size: 11 } } }
        }
    }
});

// ─── Circle Progress ─────────────────────────
function setCircle(circleId, textId, value) {
    const circle = document.getElementById(circleId);
    const text = document.getElementById(textId);
    const circumference = 220;
    const offset = circumference - (value / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    text.innerText = value + '%';
}

// ─── Status Badge ─────────────────────────────
function setStatus(statusId, circleId, value, defaultColor) {
    const el = document.getElementById(statusId);
    const circle = document.getElementById(circleId);
    el.className = 'metric-status';
    circle.style.stroke = defaultColor;

    if (value < 60) {
        el.classList.add('status-ok');
        el.innerText = 'NORMAL';
    } else if (value < 80) {
        el.classList.add('status-warn');
        el.innerText = 'WARNING';
        circle.style.stroke = '#ffcc00';
    } else {
        el.classList.add('status-crit');
        el.innerText = 'CRITICAL';
        circle.style.stroke = '#ff4466';
    }
}

// ─── Uptime Format ────────────────────────────
function formatUptime(seconds) {
    seconds = Math.floor(seconds);
    const days  = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins  = Math.floor((seconds % 3600) / 60);
    const secs  = seconds % 60;

    document.getElementById('uptime-days').innerText  = String(days).padStart(2,'0');
    document.getElementById('uptime-hours').innerText = String(hours).padStart(2,'0');
    document.getElementById('uptime-mins').innerText  = String(mins).padStart(2,'0');
    document.getElementById('uptime-secs').innerText  = String(secs).padStart(2,'0');
    document.getElementById('uptime-raw').innerText   = `${days}d ${hours}h ${mins}m ${secs}s`;
}

// ─── Fetch Stats ──────────────────────────────
async function fetchStats() {
    try {
        const res  = await fetch('/stats');
        const data = await res.json();

        // CPU
        document.getElementById('cpu').innerText = data.cpu;
        setCircle('cpu-circle', 'cpu-circle-text', data.cpu);
        setStatus('cpu-status', 'cpu-circle', data.cpu, '#00d4ff');

        // Memory
        document.getElementById('memory').innerText = data.memory;
        setCircle('mem-circle', 'mem-circle-text', data.memory);
        setStatus('mem-status', 'mem-circle', data.memory, '#00ff88');

        // Disk
        document.getElementById('disk').innerText = data.disk;
        setCircle('disk-circle', 'disk-circle-text', data.disk);
        setStatus('disk-status', 'disk-circle', data.disk, '#ffcc00');

        // Uptime
        formatUptime(data.uptime);

        // Graph
        const now = new Date().toLocaleTimeString('en-IN', { hour12: false });
        labels.push(now);
        cpuData.push(data.cpu);
        memData.push(data.memory);
        diskData.push(data.disk);
        if (labels.length > maxPoints) {
            labels.shift(); cpuData.shift(); memData.shift(); diskData.shift();
        }
        historyChart.update();

        // Last updated
        document.getElementById('last-updated').innerText = now;

    } catch (err) {
        console.error('Fetch error:', err);
    }
}

// ─── Start / Stop ─────────────────────────────
let intervalId = setInterval(fetchStats, 2000);
let isRunning  = true;

function toggleMonitoring() {
    const btn        = document.getElementById('toggle-btn');
    const dot        = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');

    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        btn.textContent = '▶ START';
        btn.classList.remove('running');
        dot.style.animationPlayState = 'paused';
        dot.style.background = 'var(--red)';
        statusText.textContent = 'MONITORING PAUSED';
    } else {
        fetchStats();
        intervalId = setInterval(fetchStats, 2000);
        isRunning = true;
        btn.textContent = '⏹ STOP';
        btn.classList.add('running');
        dot.style.animationPlayState = 'running';
        dot.style.background = 'var(--green)';
        statusText.textContent = 'SYSTEM ONLINE';
    }
}

// ─── Init ─────────────────────────────────────
fetchStats();
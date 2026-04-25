# 🖥️ Server Monitoring Dashboard

A real-time server monitoring dashboard built with **Python Flask** and **psutil**, featuring a professional dark UI, live graphs, and Docker containerization.

## 🌐 Live Demo
👉 [Click here to view live](https://server-monitoring-dashboard-h6o7.onrender.com)

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.0-black?style=for-the-badge&logo=flask)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![Chart.js](https://img.shields.io/badge/Chart.js-Live%20Graphs-FF6384?style=for-the-badge&logo=chartdotjs)

---

## 📸 Preview

> Real-time CPU, Memory, and Disk monitoring with live history graph

---

## ✨ Features

- 🔵 **Real-time CPU, Memory, Disk usage** — updates every 2 seconds
- 📊 **Live history graph** — shows last 20 readings using Chart.js
- 🟢🟡🔴 **Smart status indicators** — Normal / Warning / Critical
- ⏱️ **System uptime** — displayed in Days, Hours, Minutes, Seconds
- ⏹️ **Start/Stop button** — pause and resume monitoring
- 🐳 **Dockerized** — runs in a container, works on any machine
- 🌑 **Dark cyberpunk UI** — professional dashboard design

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask |
| System Metrics | psutil |
| Frontend | HTML, CSS, JavaScript |
| Charts | Chart.js |
| Container | Docker, Docker Compose |

---

## 📁 Project Structure

```
server-monitoring-dashboard/
│
├── app.py                  # Flask backend + API
├── Dockerfile              # Docker image config
├── docker-compose.yml      # Docker Compose config
├── requirements.txt        # Python dependencies
│
├── templates/
│   └── index.html          # Frontend UI
│
└── static/
    └── script.js           # JavaScript logic + Chart
```

---

## 🚀 How to Run

### Option 1 — Run with Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/server-monitoring-dashboard.git
cd server-monitoring-dashboard

# Build and run
docker-compose up
```

Open browser: **http://localhost:5000**

---

### Option 2 — Run without Docker

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

Open browser: **http://127.0.0.1:5000**

---

## 📊 API Endpoint

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Dashboard UI |
| `/stats` | GET | Returns JSON with CPU, Memory, Disk, Uptime |

**Sample `/stats` response:**
```json
{
  "cpu": 12.5,
  "memory": 68.3,
  "disk": 33.6,
  "uptime": 5463
}
```

---

## 🐳 Docker Commands

```bash
# Start
docker-compose up

# Stop
docker-compose down

# Rebuild after changes
docker build --no-cache -t server-monitor .
```

---

## 🎯 What I Learned

- Building REST APIs with Flask
- System monitoring using psutil
- Real-time frontend updates with JavaScript fetch()
- Data visualization with Chart.js
- Containerizing apps with Docker and Docker Compose
- DevOps concepts: portable deployment, container networking

---

## 👨‍💻 Author

**Mahesh Kumar**  
Aspiring Cloud/DevOps Engineer  
📍 Chennai, Tamil Nadu, India

[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/YOUR_LINKEDIN)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

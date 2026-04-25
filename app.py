from flask import Flask, render_template, jsonify
import psutil
import time

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/stats")
def stats():
    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent
    disk = psutil.disk_usage("/").percent
    uptime = int(time.time() - psutil.boot_time())
    return jsonify({"cpu": cpu, "memory": memory, "disk": disk, "uptime": uptime})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
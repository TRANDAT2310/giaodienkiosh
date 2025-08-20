from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Cho phép frontend gọi API từ domain khác

# Lấy đường dẫn tuyệt đối của file JSON
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "benh_ly.json")

# Load dữ liệu từ JSON
with open(DATA_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    symptoms = [item["triệu_chứng"] for item in data]
    return jsonify(symptoms)

@app.route("/recommend", methods=["POST"])
def recommend():
    req = request.json
    selected = req.get("symptoms", [])
    results = []

    for symptom in selected:
        for item in data:
            if item["triệu_chứng"] == symptom:
                results.append(item)
                break

    return jsonify(results)

@app.route("/")
def home():
    return "✅ Backend Flask is running!"

if __name__ == "__main__":
    # Khi chạy local thì debug=True, nhưng khi deploy thì Render sẽ override port
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

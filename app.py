from flask import Flask, request, jsonify
import sqlite3
from create_user import add_user

app = Flask(__name__)

@app.route("/api/add_user", methods=["POST"])
def api_add_user():
    data = request.get_json()
    try:
        conn = sqlite3.connect("Holiday_Buddy.db")
        cursor = conn.cursor()

        result = add_user(
            cursor,
            username=data["username"],
            password=data["password"],
            name=data["name"],
            age=data["age"],
            gender=data["gender"],
            country=data.get("country", "France"),  # Hardcoded fallback
            city=data.get("city", "Paris")
        )

        conn.commit()
        conn.close()
        return jsonify({"status": "success", "message": result})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

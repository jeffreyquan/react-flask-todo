
from .. import app
from flask import jsonify, request

from ..db.queries import list_tasks, insert_task

@app.get("/api/tasks")
def fetch_tasks():
  return jsonify({
    "tasks": list_tasks()
  })

@app.post("/api/tasks")
def add_task():
  data = request.get_json()
  description = data.get("description","")
  insert_task(description)
  return "", 200

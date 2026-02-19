from flask import Flask, request
from flask_cors import CORS, cross_origin

from functions.courses import get_courses
from functions.assignments import get_assignments, get_assignments_summary, update_assignment_status
from functions.studysets import get_studysets, get_studyset, create_studyset, delete_studyset

app = Flask(__name__)
CORS(app)

@app.route("/courses", methods=["GET"])
@cross_origin()
def api_get_courses():
  return get_courses()

@app.route("/assignments", methods=["GET"])
@cross_origin()
def api_get_assignments():
  user_id = request.args.get('user_id')
  return get_assignments(user_id)

@app.route("/assignments/summary", methods=["GET"])
@cross_origin()
def api_get_assignments_summary():
  user_id = request.args.get('user_id')
  return get_assignments_summary(user_id)

@app.route("/assignments/<assignment_id>/status", methods=["PATCH"])
@cross_origin()
def api_get_assignment_status(assignment_id):
  payload = request.get_json()
  return update_assignment_status(assignment_id, payload)

# ---- Study Set Subsystem (JSON API, matches assignments pattern) ----

@app.route("/studysets", methods=["GET"])
@cross_origin()
def api_get_studysets():
  user_id = request.args.get("user_id")
  return get_studysets(user_id)

@app.route("/studysets/<study_set_id>", methods=["GET"])
@cross_origin()
def api_get_studyset(study_set_id):
  user_id = request.args.get("user_id")
  return get_studyset(study_set_id, user_id)

@app.route("/studysets", methods=["POST"])
@cross_origin()
def api_create_studyset():
  payload = request.get_json()
  return create_studyset(payload)

@app.route("/studysets/<study_set_id>", methods=["DELETE"])
@cross_origin()
def api_delete_studyset(study_set_id):
  user_id = request.args.get("user_id")
  return delete_studyset(study_set_id, user_id)

@app.route("/health", methods=["GET"])
@cross_origin()
def api_health():
  return { "ok": True }

if __name__ == "__main__":
  app.run(debug=True)

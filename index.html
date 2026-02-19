from database import get_db_connection

def get_assignments(user_id):
  cnx = get_db_connection()
  cursor = cnx.cursor()

  sql = """
  SELECT
    a.assignment_id,
    a.title,
    a.description,
    a.due_at,
    a.course_id,
    s.status,
    s.updated_at AS status_updated_at
  FROM assignment_status s
  JOIN assignment a ON a.assignment_id = s.assignment_id
  WHERE s.user_id = %s
  ORDER BY a.due_at ASC;
  """

  cursor.execute(sql, (user_id,))
  rows = cursor.fetchall()
  headers = [desc[0] for desc in cursor.description]
  assignments = []

  for row in rows:
    assignment = dict(zip(headers, row))
    assignments.append(assignment)

  cursor.close()
  cnx.close()

  return assignments

def get_assignments_summary(user_id):
  cnx = get_db_connection()
  cursor = cnx.cursor()

  sql = """
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN a.due_at < NOW() AND s.status <> 'done' THEN 1 ELSE 0 END) AS overdue,
    SUM(CASE WHEN s.status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress,
    SUM(CASE WHEN s.status = 'done' THEN 1 ELSE 0 END) AS done_count
  FROM assignment_status s
  JOIN assignment a ON a.assignment_id = s.assignment_id
  WHERE s.user_id = %s;
  """

  cursor.execute(sql, (user_id,))
  row = cursor.fetchone()

  cursor.close()
  cnx.close()

  return {
    "total": row[0],
    "overdue": row[1],
    "in_progress": row[2],
    "done_count": row[3]
  }

def update_assignment_status(assignment_id, payload):
  cnx = get_db_connection()
  cursor = cnx.cursor()

  sql = """
  UPDATE assignment_status
  SET status = %s, updated_at = NOW()
  WHERE assignment_id = %s AND user_id = %s;
  """
  cursor.execute(sql, (payload.status, assignment_id, payload.user_id))

  updated = cursor.rowcount

  cursor.close()
  cnx.close()

  return { "updated": updated }


from database import get_db_connection

def get_studysets(user_id):
  cnx = get_db_connection()
  cursor = cnx.cursor()

  sql = """
  SELECT
    s.study_set_id AS id,
    s.title,
    s.description,
    s.visibility,
    s.created_at,
    s.updated_at,
    (SELECT COUNT(*)
     FROM study_set_item i
     WHERE i.study_set_id = s.study_set_id) AS card_count
  FROM study_set s
  WHERE s.created_by = %s
  ORDER BY s.created_at DESC;
  """

  cursor.execute(sql, (user_id,))
  rows = cursor.fetchall()
  headers = [desc[0] for desc in cursor.description]

  out = []
  for row in rows:
    out.append(dict(zip(headers, row)))

  cursor.close()
  cnx.close()
  return out


def get_studyset(study_set_id, user_id):
  cnx = get_db_connection()
  cursor = cnx.cursor()

  sql_set = """
  SELECT
    s.study_set_id AS id,
    s.title,
    s.description,
    s.visibility,
    s.created_at,
    s.updated_at
  FROM study_set s
  WHERE s.study_set_id = %s AND s.created_by = %s
  LIMIT 1;
  """
  cursor.execute(sql_set, (study_set_id, user_id))
  row = cursor.fetchone()

  if not row:
    cursor.close()
    cnx.close()
    return { "error": "not_found" }, 404

  headers = [desc[0] for desc in cursor.description]
  studyset = dict(zip(headers, row))

  sql_items = """
  SELECT
    i.item_id AS id,
    i.order_index,
    i.front_text AS term,
    i.back_text AS definition,
    i.created_at
  FROM study_set_item i
  WHERE i.study_set_id = %s
  ORDER BY i.order_index ASC, i.item_id ASC;
  """
  cursor.execute(sql_items, (study_set_id,))
  rows2 = cursor.fetchall()
  headers2 = [desc[0] for desc in cursor.description]

  cards = []
  for r in rows2:
    cards.append(dict(zip(headers2, r)))

  studyset["cards"] = cards

  cursor.close()
  cnx.close()
  return studyset


def create_studyset(payload):
  user_id = payload.get("user_id")
  title = (payload.get("title") or "").strip()
  description = payload.get("description")
  visibility = (payload.get("visibility") or "private").strip()
  cards = payload.get("cards") or []

  if not user_id or not title:
    return { "error": "missing_required_fields" }, 400

  cnx = get_db_connection()
  cursor = cnx.cursor()

  cursor.execute("""
    INSERT INTO study_set (course_id, title, description, visibility, created_by)
    VALUES (NULL, %s, %s, %s, %s);
  """, (title, description, visibility, user_id))

  study_set_id = cursor.lastrowid

  order_index = 1
  for c in cards:
    term = (c.get("term") or "").strip()
    definition = (c.get("definition") or "").strip()
    if not term and not definition:
      continue

    cursor.execute("""
      INSERT INTO study_set_item (study_set_id, front_text, back_text, order_index)
      VALUES (%s, %s, %s, %s);
    """, (study_set_id, term, definition, order_index))
    order_index += 1

  cnx.commit()
  cursor.close()
  cnx.close()

  return { "id": study_set_id }


def delete_studyset(study_set_id, user_id):
  cnx = get_db_connection()
  cursor = cnx.cursor()

  cursor.execute("DELETE FROM study_set_item WHERE study_set_id = %s;", (study_set_id,))
  cursor.execute(
    "DELETE FROM study_set WHERE study_set_id = %s AND created_by = %s;",
    (study_set_id, user_id)
  )

  deleted = cursor.rowcount
  cnx.commit()

  cursor.close()
  cnx.close()
  return { "deleted": deleted }

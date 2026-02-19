from database import get_db_connection

# REMOVE ME AFTER BASIC BACKEND IMPLEMENTATION 
sample_courses = [
  {
    "id": 0,
    "crn": "CSI 4999",
    "name": "Senior Capstone Project",
    "thumbnail": "https://cdn.hunterparcells.com/temp/laptop.png"
  },
  {
    "id": 1,
    "crn": "CSI 4350",
    "name": "Programming Languages",
    "thumbnail": "https://cdn.hunterparcells.com/temp/programming.jpg"
  },
  {
    "id": 2,
    "crn": "CSI 3450",
    "name": "Database Design and Implementation",
    "thumbnail": "https://cdn.hunterparcells.com/temp/database.jpg"
  },
  {
    "id": 3,
    "crn": "CSI 3640",
    "name": "Computer Organization",
    "thumbnail": "https://cdn.hunterparcells.com/temp/computer.png"
  }
]

def get_courses():
  cnx = get_db_connection()
  cursor = cnx.cursor()

  cursor.execute("SELECT * FROM course")
  courses = cursor.fetchall()

  cursor.close()
  cnx.close()

  print(courses)

  return sample_courses

from  ..main import database_connection

def list_tasks():
  return database_connection().execute_query(
    f"""
      SELECT * FROM todo.tasks
    """
  )

def insert_task(description):
  return database_connection().execute_write_operation(
    f"""
      INSERT INTO todo.tasks (description)
      VALUES (:description)
    """,
    {"description": description}
  )
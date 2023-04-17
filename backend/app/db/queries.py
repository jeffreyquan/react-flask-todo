from  ..main import database_connection
from sqlalchemy.sql import text

def list_tasks():
  return database_connection().execute_query(text("SELECT * FROM todo.tasks"))

def insert_task(description):
  values =  {"description": description}
  statement = text("INSERT INTO todo.tasks (description) VALUES (:description)")
  return database_connection().execute_write_operation(statement, values)
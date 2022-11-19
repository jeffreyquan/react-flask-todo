from flask_cors import CORS

from . import app
from .db.db_connection import DatabaseConnection

CORS(app)

default_database = "postgres"

def database_connection():
  return DatabaseConnection(default_database)


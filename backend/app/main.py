import os
from flask_cors import CORS

from . import app
from .db.db_connection import DatabaseConnection

CORS(app)

database = os.getenv("DATABASE_NAME")

def database_connection():
  return DatabaseConnection(database)


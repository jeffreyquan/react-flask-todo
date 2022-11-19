import os
import sqlalchemy
from sqlalchemy.orm import scoped_session, sessionmaker

class DatabaseConnection:
  engines = {}

  def __init__(self, db_name):
    url = os.getenv("DATABASE_URL") + "/" + db_name

    if db_name not in DatabaseConnection.engines:
      DatabaseConnection.engines[db_name] = sqlalchemy.create_engine(url, pool_size=5, max_overflow=10)
    
    engine = DatabaseConnection.engines[db_name]
    self.Session = scoped_session(sessionmaker(bind=engine))

  def execute_query(self, query, data={}):
    session = self.Session()
    res = session.execute(query, data)
    dict_data = self.row_to_dict(res)
    session.close()
    return dict_data

  def execute_write_operation(self, query, data=None):
    session = self.Session()
    session.execute(query, data)
    session.commit()
    session.close()

  def row_to_dict(self, result):
      return [dict(row) for row in result]
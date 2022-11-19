CREATE SCHEMA todo;

CREATE TABLE todo.tasks (
  id SERIAL PRIMARY KEY,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE
)
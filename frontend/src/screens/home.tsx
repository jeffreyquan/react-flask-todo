import * as React from "react";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

export function Home() {
  return (
    <div>
      <NewTask />
      <List />
    </div>
  );
}

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

function List() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  React.useEffect(() => {
    fetch(`${apiUrl}/api/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }, []);
  return (
    <div>
      {tasks?.map((task) => (
        <div key={task.id}>{task.description}</div>
      ))}
    </div>
  );
}

const addTask = (description: string) =>
  fetch(`${apiUrl}/api/tasks`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

function NewTask() {
  const [description, setDescription] = React.useState("");
  return (
    <div>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button onClick={() => addTask(description)}>Add</button>
    </div>
  );
}

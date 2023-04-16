import * as React from "react";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

export function Home() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  React.useEffect(() => {
    fetch(`${apiUrl}/api/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }, []);

  const addTask = async (description: string) => {
    await createTask(description);

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length,
        description,
        isCompleted: false,
      },
    ]);
  };

  return (
    <div>
      <NewTask addTask={addTask} />
      <List tasks={tasks} />
    </div>
  );
}

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

interface ListProps {
  tasks: Task[];
}

function List({ tasks }: ListProps) {
  return (
    <div>
      {tasks?.map((task) => (
        <div key={task.id}>{task.description}</div>
      ))}
    </div>
  );
}

const createTask = (description: string) =>
  fetch(`${apiUrl}/api/tasks`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

interface NewTaskProps {
  addTask: (description: string) => Promise<void>;
}

function NewTask({ addTask }: NewTaskProps) {
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

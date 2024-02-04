import { useContext, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([
    { id: 1, title: "complete DnD" },
    { id: 2, title: "store order" },
    { id: 3, title: "map tasks" },
    { id: 4, title: "edit button" },
  ]);
  const [editMode, setEditMode] = useState(false);

  const dragTask = useRef(0);
  const draggedOverTask = useRef(0);

  function handleSort() {
    const tasksClone = [...tasks];
    const temp = tasksClone[dragTask.current];
    tasksClone.splice(dragTask.current, 1);
    tasksClone.splice(draggedOverTask.current, 0, temp);
    setTasks(tasksClone);
  }

  return (
    <div className="dashboardpage">
      <h1>Welcome back {user}</h1>
      <h2>This is a Dashboard</h2>
      <button onClick={() => setEditMode(!editMode)}>{editMode ? "save" : "edit"}</button>
      <div
        style={{
          width: "50vw",
          height: "50vh",
          border: "1px solid black",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {tasks &&
          tasks.map((task, index) => (
            <div
              key={task.id}
              className="box"
              style={{
                background: `hsl(1${task.id + 3}5, 50%, 50%)`,
                cursor: editMode ? "grab" : "default",
                boxShadow: editMode ? "0 0 0.5rem rgba(0,0,0,0.5)" : "none",
              }}
              draggable={editMode}
              onDragStart={() => (dragTask.current = index)}
              onDragEnter={() => (draggedOverTask.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              {task.title}
            </div>
          ))}
      </div>
    </div>
  );
};

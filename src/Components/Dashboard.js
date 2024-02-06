import { useContext, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Power" },
    { id: 2, title: "Duration" },
    { id: 3, title: "Vibration" },
    { id: 4, title: "Efficiency" },
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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold">Welcome back {user}</h1>
      <h2>This is a Dashboard</h2>
      <div className="w-1/2 h-96 border-2 border-gray-300 rounded flex p-2 relative">
        <button
          className="absolute top-1 right-1 m-1 p-2 pl-4 pr-4 bg-gray-200 hover:shadow-md rounded-full uppercase text-2xs"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "save" : "edit"}
        </button>
        {tasks &&
          tasks.map((task, index) => (
            <div
              key={task.id}
              className={`box uppercase bg-lime-300 ${
                editMode ? "cursor-grab shadow-md" : "cursor-default"
              }`}
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

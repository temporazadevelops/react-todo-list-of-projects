import { useState } from "react";

export default function NewTask({ onAddTasks }) {
  const [enteredTask, setEnteredTask] = useState("");

  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  };

  const onAdd = () => {
    if (enteredTask.trim() === "") {
      return;
    }
    onAddTasks(enteredTask);
    setEnteredTask("");
  };
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        value={enteredTask}
        onChange={handleChange}
      />
      <button
        onClick={() => onAdd()}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}

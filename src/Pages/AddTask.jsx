import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { taskEntry, updateTask } from "../api/Api";

function AddTask() {

  const navigate = useNavigate();
  const location = useLocation();

  const editTask = location.state?.task;

const [taskData, setTaskData] = useState({
  task: "",
  startDate: "",
  dueDate: "",
  priority: "Medium",
  createdBy: "",
});

useEffect(() => {
  if (editTask) {
    setTaskData({
      task: editTask.task,
      startDate: editTask.startDate,
      dueDate: editTask.dueDate,
      priority: editTask.priority,
      createdBy: editTask.createdBy,
    });
  }
}, [editTask]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskData);
    const data = {
      ...taskData,
      createdBy: localStorage.getItem("id"),
    };

    if (new Date(taskData.dueDate) < new Date(taskData.startDate)) {
      toast.error("Due date cannot be earlier than the start date.");
      return;
    }

  try {
  let response;

  if (editTask) {
    response = await updateTask(editTask._id, data);

    if (response.status === 200) {
      toast.success("Task Updated Successfully");
      navigate("/home/listtask");
    }
  } else {
    response = await taskEntry(data);

    if (response.status === 201) {
      toast.success("Task Added Successfully");
      navigate("/home/listtask");
    } else {
      toast.error("Failed to Add Task");
    }
  }

} catch (error) {
  toast.error("An error occurred while submitting the Task.");
  console.error(error);
}
  };
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-950 py-3">
          {editTask ? "Update Task" : "Add New Task"}
        </h1>
        <p className="text-gray-600 mt-1">
          {editTask
            ? "Update your task details."
            : "Fill in the details below to create a new task."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">Task</label>

          <input
            type="text"
            name="task"
            value={taskData.task}
            onChange={handleChange}
            placeholder="Enter task name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Start Date</label>

          <input
            type="date"
            name="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Priority</label>

          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 outline-none"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Urgent</option>
          </select>
        </div>

        <div></div>

        <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              setTaskData({
                task: "",
                startDate: "",
                dueDate: "",
                priority: "Medium",
              })
            }
            className="px-8 py-3 rounded-lg border-2 border-blue-950 text-blue-950 hover:bg-blue-950 font-bold hover:text-white transition"
          >
            Clear
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-blue-950 text-white hover:text-blue-950 border-2 border-blue-950 hover:bg-white font-bold transition"
          >
             {editTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;

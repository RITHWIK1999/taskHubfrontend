import React, { useEffect, useState } from "react";
import { deleteTask, viewAll, updateStatus } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ListTask() {
  const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const navigate = useNavigate();

  const handleEdit = (task) => {
    navigate("/home/addtask", {
      state: { task },
    });
  };

  const getTasks = async () => {
    const id = localStorage.getItem("id");

    try {
      const response = await viewAll(id);

      if (response.status === 200) {
        setTaskList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteTask(id);

      if (response.status === 200) {
        toast.success("Task deleted successfully");

        setTaskList((prev) => prev.filter((task) => task._id !== id));
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await updateStatus(id);

      if (response.status === 200) {
        toast.success("Task Completed");

        setTaskList((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, status: "Completed" } : task,
          ),
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const filteredTasks = taskList.filter((task) => {
    const matchesSearch =
      task.task.toLowerCase().includes(search.toLowerCase()) ||
      task.priority.toLowerCase().includes(search.toLowerCase()) ||
      task.status.toLowerCase().includes(search.toLowerCase()) ||
      task.startDate.includes(search) ||
      task.dueDate.includes(search);

    const matchesFilter = filter === "All" ? true : task.status === filter;

    return matchesSearch && matchesFilter;
  });
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-5">
        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-950 outline-none"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-950 outline-none"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="InComplete">InComplete</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Task</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentTasks.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{indexOfFirstTask + index + 1}</td>

                <td className="p-4">{item.task}</td>

                <td className="p-4">{item.startDate}</td>

                <td className="p-4">{item.dueDate}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm
                ${
                  item.priority === "High"
                    ? "bg-red-500"
                    : item.priority === "Medium"
                      ? "bg-yellow-500"
                      : item.priority === "Low"
                        ? "bg-green-500"
                        : "bg-purple-500"
                }`}
                  >
                    {item.priority}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`font-semibold
              ${
                item.status === "Pending"
                  ? "text-orange-500"
                  : item.status === "Completed"
                    ? "text-green-600"
                    : "text-red-600"
              }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2 justify-center">
                  <button
                    disabled={item.status === "Completed"}
                    onClick={() => handleComplete(item._id)}
                    className={`px-3 py-1 rounded text-white ${
                      item.status === "Completed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {item.status === "Completed" ? "Completed" : "Complete"}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-950 text-white px-3 py-1 rounded hover:bg-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600  text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-950 text-white hover:bg-blue-800"
          }`}
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-950 text-white hover:bg-blue-800"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListTask;

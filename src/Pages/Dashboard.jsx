import React, { useEffect, useState } from "react";
import { viewAll } from "../api/Api";
import { PieChart, pieClasses } from "@mui/x-charts/PieChart";

function Dashboard() {
  const [priorityData, setPriorityData] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    incomplete: 0,
  });

  const getTaskCount = async () => {
    const id = localStorage.getItem("id");

    try {
      const response = await viewAll(id);

      if (response.status === 200) {
        const tasks = response.data.data;

        const high = tasks.filter((task) => task.priority === "High").length;
        const medium = tasks.filter(
          (task) => task.priority === "Medium",
        ).length;
        const low = tasks.filter((task) => task.priority === "Low").length;
        const urgent = tasks.filter(
          (task) => task.priority === "Urgent",
        ).length;

        setPriorityData([
          { id: 0, label: "High", value: high },
          { id: 1, label: "Medium", value: medium },
          { id: 2, label: "Low", value: low },
          { id: 3, label: "Urgent", value: urgent },
        ]);

        setCounts({
          total: tasks.length,
          pending: tasks.filter((task) => task.status === "Pending").length,
          completed: tasks.filter((task) => task.status === "Completed").length,
          incomplete: tasks.filter((task) => task.status === "InComplete")
            .length,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskCount();
  }, []);

  return (
    <div>
    <div className="p-4 sm:p-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        <div
          className="bg-white shadow-lg rounded-xl p-4 sm:p-6  text-center 
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer"
        >
          <h1 className="text-blue-950 text-md sm:text-lg font-semibold">
            Total Task
          </h1>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4">
            {counts.total}
          </h1>
        </div>

        <div
          className="bg-white shadow-lg rounded-xl p-4 sm:p-6  text-center 
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer"
        >
          <h1 className="text-blue-950 text-md sm:text-lg font-semibold">
            Pending
          </h1>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4">
            {counts.pending}
          </h1>
        </div>

        <div
          className="bg-white shadow-lg rounded-xl p-4 sm:p-6  text-center 
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer"
        >
          <h1 className="text-blue-950 text-md sm:text-lg font-semibold">
            Completed
          </h1>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4">
            {counts.completed}
          </h1>
        </div>

        <div
          className="bg-white shadow-lg rounded-xl p-4 sm:p-6  text-center 
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer"
        >
          <h1 className="text-blue-950 text-md sm:text-lg font-semibold">
            Incompleted
          </h1>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4">
            {counts.incomplete}
          </h1>
        </div>
      </div>
    </div>
          <div className=" bg-white rounded-xl  p-6 w-full max-w-7xl lg:mt-20 mt-0">
        <h2 className="text-2xl font-bold text-blue-950 text-center mb-6">
          Task Priority Distribution
        </h2>

        <div className="flex justify-center">
          <PieChart
            series={[
              {
                data: priorityData,
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 20,
                arcLabelRadius: "60%",
              },
            ]}
            width={100}
            height={100}
            sx={{
              [`& .${pieClasses.arcLabel}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
      </div>
  );
}

export default Dashboard;

import React from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

const TaskDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Task Management Dashboard
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default TaskDashboard;

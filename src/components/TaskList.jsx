import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleComplete } from '../redux/taskSlice';
import EditTaskModal from './EditTaskModal';
import ConfirmationModal from './ConfirmationModal';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    switch (filterType) {
      case 'Completed':
        return task.completed && matchesSearch;
      case 'Pending':
        return !task.completed && matchesSearch;
      case 'Overdue':
        return (
          new Date(task.dueDate) < new Date() &&
          !task.completed &&
          matchesSearch
        );
      case 'All':
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
        Task List
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <ul className="flex flex-col gap-4">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-50 p-4 md:p-6 shadow rounded-lg border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            <p className="text-sm text-gray-500">
              Status:{' '}
              <span
                className={
                  task.completed
                    ? 'text-green-600 font-medium'
                    : 'text-red-600 font-medium'
                }
              >
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => dispatch(toggleComplete(task.id))}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button
                onClick={() => setDeletingTask(task)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => setEditingTask(task)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No tasks found.</p>
      )}

      {editingTask && (
        <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}

      {deletingTask && (
        <ConfirmationModal
          task={deletingTask}
          onConfirm={() => {
            dispatch(deleteTask(deletingTask.id));
            setDeletingTask(null);
          }}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;

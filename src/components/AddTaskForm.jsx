import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return alert('Title and due date are required!');
    dispatch(
      addTask({
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false,
      })
    );
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-lg shadow-lg w-full h-full"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
        Add New Task
      </h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
      />
      <textarea
        placeholder="Task Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;

'use client'
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, updateTask }) {
  if (tasks.length === 0) {
    return <div className="text-center text-gray-500">No tasks found</div>;
  }

  return (
    <div className="bg-white rounded shadow">
      <table className="w-full divide-y">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Value</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <TaskItem
              key={task.id}
              task={task}
              index={idx}
              updateTask={updateTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";

const TodaysTask = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-2">Today’s Task</h1>
      <div className="flex justify-between items-center p-4 rounded-2xl bg-white shadow-md">
        {/* Task Info */}
        <div>
          <p className="font-medium text-gray-700">Exam</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>Chemistry</span>
            <span className="ml-2 text-green-600 font-semibold">100%</span>
          </div>
        </div>
        {/* Due Time */}
        <p className="text-sm font-medium text-gray-600">Today 10:50 PM</p>
      </div>
    </div>
  );
};

export default TodaysTask;

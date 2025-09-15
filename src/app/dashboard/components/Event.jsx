import React from "react";

const Event = () => {
  const options = ["Subject", "Today", "Tomorrow", "Custom Date", "Time"];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      {/* Input with button */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter event..."
          className="border border-gray-300 rounded-xl px-3 py-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button className="p-3 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 transition">
          +
        </button>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4 text-gray-600 font-medium">
        {options.map((item, idx) => (
          <p
            key={idx}
            className="cursor-pointer hover:text-blue-500 transition"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Event;

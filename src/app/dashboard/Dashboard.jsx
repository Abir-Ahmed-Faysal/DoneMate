"use client";
import React from "react";
import Event from "./components/Event";
import TodaysTask from "./components/TodaysTask";
import UpcomingTask from "./components/UpcomingTask";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-8">
              <h2 className="text-3xl md:text-4xl font-bold">Good Evening</h2>
              <p className="mt-2 text-lg">You have 1 task due today!</p>
            </div>
          </div>

          <Event />
          <TodaysTask />
          <UpcomingTask />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-4 space-y-6">
          {/* Today’s Event */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Today <span className="text-gray-500">31/08/24</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-gray-600 text-sm">
                <h3>2:30 PM</h3>
                <h3>3:00 PM</h3>
              </div>
              <div className="border-l-2 border-gray-300 h-full"></div>
              <div className="bg-blue-100 flex-1 rounded-lg p-3">
                <p className="font-medium">English</p>
                <p className="font-semibold text-gray-700">Science</p>
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3
              onClick={() => navigate("/assignment")}
              className="text-lg font-semibold mb-2"
            >
              Upcoming Assignment{" "}
            </h3>
            <p className="text-gray-500">No Assignment today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

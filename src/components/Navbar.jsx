"use client";
import React, { useEffect, useState } from "react";

const Navbar = ({ logo }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex p-4  items-center justify-between">
      <div>
        <p
          aria-label={`Current time is ${currentTime}`}
          className="text-gray-900 text-5xl font-bold "
        >
          {currentTime}
        </p>
        <p
          aria-label={`Today's date is ${currentDate}`}
          className="text-gray-700"
        >
          {currentDate}
        </p>
      </div>
    </div>
  );
};

export default Navbar;

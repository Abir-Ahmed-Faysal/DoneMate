"use client";

export const addToLocal = (key) => {
  const newObject = {
    id: 1,
    name: "Item 1",
    value: 100,
    date: "2025-09-12",
    status: "paid",
    read: false,
  };

  try {
    const oldData = localStorage.getItem(key);
    let updatedData = [];

    if (oldData) {
      const parsedOldData = JSON.parse(oldData);
      updatedData = Array.isArray(parsedOldData)
        ? [...parsedOldData, newObject]
        : [parsedOldData, newObject];
    } else {
      updatedData = [newObject];
    }

    localStorage.setItem(key, JSON.stringify(updatedData));
    console.log(updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error saving to localStorage", error);
    return null;
  }
};





export const getFromLocal = async (key) => {
  try {
    const data = await localStorage.getItem("todos");
    if(data){

        console.log(JSON.parse(data));
    }
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from localStorage", error);
    return null;
  }
};

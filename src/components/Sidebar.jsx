"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="space-y-5">
      <h3 className="font-bold text-center my-8 text-3xl gap-5">DoneMate</h3>
       <div className="h-screen w-60 p-4 border-r border-gray-200">
      {navLinks.map((link) => (
        <div
          key={link.path}
          onClick={() => router.push(link.path)}
          className={`cursor-pointer p-2 rounded-lg ${
            pathname === link.path ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
        >
          {link.name}
        </div>
      ))}
    </div>
    </div>
   
  );
};

export default Sidebar;

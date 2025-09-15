import React from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Background pet image */}
      <img
        src="https://i.ibb.co.com/MDtGJktX/yerlin-matu-Gtwi-Bmt-Jva-U-unsplash.jpg"
        alt="Pet"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 p-8 bg-white rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-6xl font-bold text-[rgb(214,28,98)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Looks like the page you’re looking for has wandered off like a curious pup.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[rgb(214,28,98)]  text-white rounded-full shadow hover:[rgb(214,28,98)] transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function SegmentedControl() {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (option:any) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex space-x-4">
      <button
        className={`py-2 px-4 rounded-md focus:outline-none ${
          selectedOption === "option1"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => handleOptionChange("option1")}
      >
        Option 1
      </button>
      <button
        className={`py-2 px-4 rounded-md focus:outline-none ${
          selectedOption === "option2"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => handleOptionChange("option2")}
      >
        Option 2
      </button>
      <button
        className={`py-2 px-4 rounded-md focus:outline-none ${
          selectedOption === "option3"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => handleOptionChange("option3")}
      >
        Option 3
      </button>
    </div>
  );
}

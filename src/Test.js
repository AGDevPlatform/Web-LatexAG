import React, { useState, useRef } from "react";
import "./customFont.css"; // Create this CSS file to import your custom font
const App = () => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f3f3f3" }}>
      <div className="grid grid-cols-2 gap-4 h-screen border border-gray-300  divide-x divide-solid divide-black divide-w-2">
        <div className="h-full">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter LaTeX formula"
            className="w-full h-full p-4  text-base mb-4 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default App;

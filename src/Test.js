import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "N") {
        executeFunction();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const executeFunction = () => {
    console.log("Ctrl+Shift+N was pressed!");
    // Add your function logic here
  };

  return (
    <div>
      <h1>Press Ctrl+Shift+N to execute the function</h1>
    </div>
  );
}

export default App;

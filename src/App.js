import React, { useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import "./App.css"; // Tạo file CSS để customize màu sắc

const App = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const insertAtCursor = (textToInsert) => {
    const textarea = document.getElementById("inputArea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    setInputText(before + textToInsert + after);
  };

  const renderTextWithLatex = (text) => {
    const parts = text.split(/(\$[^\$]*\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <InlineMath
            key={index}
            math={part.slice(1, -1)}
            className="latex-text"
          />
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => insertAtCursor("$x^2$")}>x^2</button>
        <button onClick={() => insertAtCursor("$\\sqrt{x}$")}>√x</button>
        <button onClick={() => insertAtCursor("$\\frac{a}{b}$")}>a/b</button>
        <button onClick={() => insertAtCursor("$\\int_0^\\infty$")}>∫</button>
        <button onClick={() => insertAtCursor("$\\sum_{i=1}^n$")}>Σ</button>
      </div>
      <textarea
        id="inputArea"
        rows="4"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Nhập văn bản với công thức LaTeX giữa dấu $"
      />
      <div className="output-area">{renderTextWithLatex(inputText)}</div>
    </div>
  );
};

export default App;

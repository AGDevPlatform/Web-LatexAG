import React, { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow"; // Import theme tomorrow
import "ace-builds/src-noconflict/theme-dracula"; // Import theme tomorrow

import "./customFont.css"; // Create this CSS file to import your custom font

const App = () => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const [basicFormulas1, setBasicFormulas] = useState([]);

  const handleInputChange = (value) => {
    setInputText(value);
  };

  const scrollToSection = (index) => {
    // Implement scrolling logic as needed
  };

  useEffect(() => {
    // Fetch data from JSON file
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setBasicFormulas(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Do you want to exit the website or not?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const insertFormula = (formula, pos) => {
    const editor = inputRef.current.editor;
    const position = editor.getCursorPosition();
    const textBeforeCursor = inputText.substring(
      0,
      editor.session.doc.positionToIndex(position)
    );
    const textAfterCursor = inputText.substring(
      editor.session.doc.positionToIndex(position)
    );
    let newFormula = formula;
    let newCursorPos = position.column + formula.length;

    // Check if cursor is inside a $$ pair
    const beforeDollarCount = (textBeforeCursor.match(/\$/g) || []).length;
    const afterDollarCount = (textAfterCursor.match(/\$/g) || []).length;

    if (beforeDollarCount % 2 === 1 && afterDollarCount % 2 === 1) {
      // Cursor is inside $$, don't add extra $$
      newFormula = formula;
      newCursorPos = newCursorPos - pos;
    } else {
      // Cursor is outside $$, add $$ around the formula
      newFormula = `$${formula}$`;
      newCursorPos += 2; // Adjust for added $ signs
      newCursorPos = newCursorPos - pos - 1;
    }

    const newText = textBeforeCursor + newFormula + textAfterCursor;
    setInputText(newText);

    // Set cursor position after update
    setTimeout(() => {
      editor.focus();
      editor.moveCursorTo(position.row, newCursorPos);
    }, 0);
  };

  return (
    <div>
      <div>
        <h1>Latex AG</h1>
      </div>

      <div className="p-5 bg-gray-200" style={{ height: "100vh" }}>
        <div className="grid grid-cols-[250px,1fr,1fr] gap-4 border border-gray-300 divide-x divide-solid divide-black h-full">
          <div
            className="overflow-y-auto pr-1"
            style={{ maxHeight: "calc(100vh - 40px)" }}
          >
            <div className="grid grid-rows-5 gap-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-rows-4 grid-flow-col gap-1 p-2"
                  style={{
                    borderWidth: "1px",
                    margin: "5px",
                    borderColor: "red",
                    borderRadius: "10px",
                  }}
                >
                  {basicFormulas1.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex justify-center items-center"
                    >
                      <button
                        onClick={() => insertFormula(item.formula, item.pos)}
                        className="w-9 h-9 bg-gray-300 border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-0.5 rounded"
                      >
                        <img
                          src={item?.linkimage}
                          alt="dummy-image"
                          className="w-full h-full object-contain"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 40px)" }}
          >
            <AceEditor
              ref={inputRef}
              mode="latex"
              theme="dracula"
              // theme="textmate"
              onChange={handleInputChange} // Updated to handleInputChange directly
              value={inputText} // Bind value directly to inputText state
              name="latex-editor"
              editorProps={{ $blockScrolling: Infinity }}
              width="100%"
              height="100%"
              fontSize="14px"
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}
              wrapEnabled={true} // Prevent automatic wrapping
              softWrap={true} // Disable soft wrapping
            />
          </div>
          <div
            className="overflow-y-auto p-4 text-lg font-medium custom-font-output bg-white"
            style={{ maxHeight: "calc(100vh - 40px)" }}
          >
            <div className="break-words whitespace-pre-wrap text-justify">
              <Latex>{inputText}</Latex>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

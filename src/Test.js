import React, { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import "./customFont.css"; // Create this CSS file to import your custom font
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/snippets/latex";
import "ace-builds/src-noconflict/ext-language_tools";

const App = () => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const [basicFormulas1, setBasicFormulas] = useState([]);
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const sectionRefs = useRef([]);

  const scrollToSection = (index) => {
    sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // Lấy dữ liệu từ file JSON
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
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const textBeforeCursor = inputText.substring(0, start);
    const textAfterCursor = inputText.substring(end);
    let newFormula = formula;
    let newCursorPos = start + formula.length;

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
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div>
      <div>
        <h1>Latex AG</h1>

        <AceEditor
          mode="latex"
          // value={content}
          // theme={theme.name}
          theme="tomorrow"
          className="editable editor"
          // onChange={handleEditorChange}
          // onValidate={setAnnotations}
          name="editor"
          height="96%"
          width="100%"
          fontSize="15px"
          // ref={editorRef}
          // annotations={annotations}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          editorProps={{ $blockScrolling: true }}
        />
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
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter LaTeX formula"
              className="w-full h-full p-4 text-base outline-none"
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

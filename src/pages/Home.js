import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-dracula";
// import "./customFont.css";
function Home() {
  const [inputText, setInputText] = useState(`Ví dụ:
        Cho ba số thực $a, b, c$  không âm thỏa mãn: $a^2 + b^2+c^2+3=2 \\left(ab+bc+ca\\right)$. Chứng minh:  
        
        $3\\leq a+b+c\\leq \\dfrac{2\\left(ab+bc+ca\\right)+3}{3}$`);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);
  const [basicFormulas, setBasicFormulas] = useState([]);

  const handleInputChange = (value) => {
    setInputText(value);
    updateIframeContent(value);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setBasicFormulas(data))
      .catch((error) => console.error("Error fetching data:", error));

    updateIframeContent(inputText);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Do you want to exit the website or not?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const processInputText = (text) => {
    return text.replace(/\\\\/g, "\n").trim();
  };

  const updateIframeContent = (text) => {
    if (iframeRef.current) {
      const processedText = processInputText(text);
      const iframeContent = `
                <!DOCTYPE html>
                <html>
                <head>
                  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css">
                  <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"></script>
                  <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"></script>
                  <style>
                    body { font-family: Times New Roman, sans-serif; }
                    .katex { font-size: 1.1em; }
                  </style>
                </head>
                <body>
                  <div id="latex-content">${processedText}</div>
                  <script>
                    document.addEventListener("DOMContentLoaded", function() {
                      renderMathInElement(document.body, {
                        delimiters: [
                          {left: "$$", right: "$$", display: true},
                          {left: "$", right: "$", display: false}
                        ]
                      });
                    });
                  </script>
                </body>
                </html>
              `;
      iframeRef.current.srcdoc = iframeContent;
    }
  };

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

    const beforeDollarCount = (textBeforeCursor.match(/\$/g) || []).length;
    const afterDollarCount = (textAfterCursor.match(/\$/g) || []).length;

    if (formula !== "$$") {
      if (beforeDollarCount % 2 === 1 && afterDollarCount % 2 === 1) {
        newFormula = formula;
        newCursorPos = newCursorPos - pos;
      } else {
        newFormula = `$${formula}$`;
        newCursorPos += 2;
        newCursorPos = newCursorPos - pos - 1;
      }
    } else {
      newCursorPos = newCursorPos - pos;
    }

    const newText = textBeforeCursor + newFormula + textAfterCursor;
    setInputText(newText);
    updateIframeContent(newText);

    setTimeout(() => {
      editor.focus();
      editor.moveCursorTo(position.row, newCursorPos);
    }, 0);
  };

  return (
    <div>
      <div
        className="p-5 bg-white"
        style={{ height: "100vh", marginTop: "70px" }}
      >
        <div className="grid grid-cols-[190px,1.4fr,1fr] gap-0 border border-gray-300 divide-x divide-solid divide-black h-full">
          <div
            className="overflow-y-auto pr-1"
            style={{ maxHeight: "calc(100vh - 20px)" }}
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
                  {basicFormulas.map((item, itemIndex) => (
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
                          alt="formula"
                          className="w-full h-full object-contain"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "calc(100vh - 20px)", overflow: "auto" }}>
            <AceEditor
              ref={inputRef}
              mode="latex"
              theme="dracula"
              onChange={handleInputChange}
              value={inputText}
              name="latex-editor"
              editorProps={{ $blockScrolling: Infinity }}
              width="100%"
              height="100%"
              fontSize="14px"
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}
              wrapEnabled={true}
              softWrap={true}
            />
          </div>
          <div style={{ height: "calc(100vh - 20px)", overflow: "hidden" }}>
            <iframe
              ref={iframeRef}
              title="LaTeX Output"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      </div>
      <div>jhhh</div>
    </div>
  );
}
export default Home;

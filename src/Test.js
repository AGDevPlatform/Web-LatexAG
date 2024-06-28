import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import { Tooltip } from "react-tooltip";
import "ace-builds/src-noconflict/theme-tomorrow";

import "ace-builds/src-noconflict/theme-dracula";

import "ace-builds/src-noconflict/theme-dracula";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [stringInit, setStrinhInit] = useState("");
  const [inputText, setInputText] = useState(stringInit);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);
  const handleInputChange = (value) => {
    setInputText(value);
    updateIframeContent(value);
  };

  const updateIframeContent = (text) => {
    if (iframeRef.current) {
      // const processedText = text;
      const processedText = text
        .replace(/\\\\(\s*)/g, "<br>")
        .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
        .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
        .replace(/\\underline\{([^}]+)\}/g, "<u>$1</u>")
        .replace(
          /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
          '<div style="text-align: center;">$1</div>'
        )
        .replace(
          /\\begin\{flushleft\}([\s\S]*?)\\end\{flushleft\}/g,
          '<div style="text-align: left;">$1</div>'
        )
        .replace(
          /\\begin\{flushright\}([\s\S]*?)\\end\{flushright\}/g,
          '<div style="text-align: right;">$1</div>'
        ); // Replace \\ followed by any whitespace with <br>

      const iframeContent = `
                <!DOCTYPE html>
                <html>
                <head>
                  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css">
                  <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"></script>
                  <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"></script>
                  <style>
                    body { font-family: Times New Roman, sans-serif;
                     white-space: normal;
              word-wrap: break-word;
              padding: 10px; }
                    .katex { font-size: 1.1em; }
                    strong { font-weight: bold; }
                    em { font-style: italic; }
u { text-decoration: underline; }
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

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F3F3F3",
        }}
      >
        <div className="grid grid-cols-[155px,1fr,1fr] gap-0 divide-x divide-solid divide-gray">
          <div class="grid grid-cols-1 gap-0">
            <div
              style={{
                height: "calc(100vh - 0px)",
                overflow: "auto",
                zIndex: 0,
                position: "relative",
              }}
            >
              <AceEditor
                ref={inputRef}
                mode="latex"
                theme="tomorrow"
                onChange={handleInputChange}
                value={inputText}
                name="latex-editor"
                editorProps={{ $blockScrolling: Infinity }}
                width="100%"
                height="85vh"
                fontSize="14px"
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
                wrapEnabled={true}
                setOptions={{
                  useWorker: false,
                }}
                style={{
                  zIndex: 0,
                  position: "relative",
                  borderBottomWidth: "1px",
                  borderColor: "#DCDCDC",
                }}
              />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-0">
            <div
              style={{
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
                borderColor: "#E5E5E5",

                borderBottomWidth: "1px",
              }}
            >
              <button
                style={{
                  margin: "8px",
                  padding: "4px",
                  color: "#808080",

                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1f1f1f")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#616161")}
              >
                <i class="fa-solid fa-circle-down fa-xl"></i>{" "}
              </button>
            </div>

            <div
              style={{
                height: "calc(100vh - 0px)",
                overflow: "auto",
                zIndex: 0,
                position: "relative",
              }}
            >
              <iframe
                ref={iframeRef}
                title="LaTeX Output"
                style={{
                  width: "100%",
                  height: "85vh",
                  backgroundColor: "white",
                  zIndex: 0,
                  position: "relative",
                  borderBottomWidth: "1px",
                  borderColor: "#DCDCDC",
                }}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default Home;

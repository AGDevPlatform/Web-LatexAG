import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormulaGrid from "../components/FormulaGrid";
import MenuInput from "../components/menuInput";
import MenuOutput from "../components/menuOutput";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
function Home() {
  const [stringInit, setStringInit] = useState("");
  const [inputText, setInputText] = useState(stringInit);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);

  const handleInputChange = (value) => {
    setInputText(value);
    updateIframeContent(value);
  };
  const updateIframeContent = (text) => {
    if (iframeRef.current) {
      const processedText = text
        .replace(/\\\\(\s*)/g, "<br>")
        .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
        .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
        // .replace(/\\underline\{([^}]+)\}/g, "<u>$1</u>")
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
                      <link rel="stylesheet" href="https://unpkg.com/latex.css/style.min.css" />
                      <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"></script>
                      <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"></script>
                      <style>
                        body { 
                         white-space: normal;
                  word-wrap: break-word;
                  padding: 10px;
                  font-size: 17.5px; /* Increased base font size */
            line-height: 1.6; /* Adjusted line height for better readability */ }
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
          borderRadius: "10px",
        }}
      >
        <div
          className="grid grid-cols-[155px,1fr,1fr] gap-0 divide-x divide-solid divide-gray"
          style={{ borderRadius: "10px" }}
        >
          <div class="grid grid-cols-1 gap-0">
            <Editor
              inputRef={inputRef}
              handleInputChange={handleInputChange}
              inputText={inputText}
            />
          </div>
          <div class="grid grid-cols-1 gap-0">
            <MenuOutput inputTextLength={inputText.length} />
            <Preview ref={iframeRef} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default Home;



import React, { useRef, useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({
  inputRef,
  inputText,
}) => {

  return (
    <div
      style={{
        height: "calc(100vh - 0px)",
        overflow: "auto",
        zIndex: 0,
        position: "relative",
      }}
    >
      <AceEditor
        ref={(el) => {
          editorRef.current = el;
          if (inputRef) inputRef.current = el;
        }}
        mode="latex"
        theme={theme}
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
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
    </div>
  );
};

export default Editor;

import React, { forwardRef } from "react";

const Preview = forwardRef((ref) => {
  return (
    <div
      style={{
        height: "calc(100vh - 0px)",
        overflow: "auto",
        zIndex: 0,
        position: "relative",
      }}
    >
      <iframe
        ref={ref}
        title="LaTeX Output"
        style={{
          width: "100%",
          height: "100%",
          paddingBottom: "100px",
          backgroundColor: "white",
          zIndex: 0,
          position: "relative",
          borderBottomWidth: "1px",
          borderColor: "#DCDCDC",
      
        }}
      />
    </div>
  );
});

export default Preview;

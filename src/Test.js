import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-keybinding_menu";
import "ace-builds/src-noconflict/keybinding-vscode";
import html2pdf from "html2pdf.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormulaGrid from "../components/FormulaGrid";
import IconButton from "../components/IconButton";

function Home() {
  const [stringInit, setStrinhInit] = useState("");
  const [inputText, setInputText] = useState(stringInit);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);

  const handleInputChange = (value) => {
    setInputText(value);
  };

  //Copy

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
              className="flex items-center justify-between"
              style={{
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
                borderColor: "#E5E5E5",

                borderBottomWidth: "1px",
              }}
            ></div>

            <div
              style={{
                height: "calc(100vh - 0px)",
                overflow: "auto",
                zIndex: 0,
                position: "relative",
              }}
            >
              <AceEditor
                // ref={inputRef}
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
                // onKeyDown={handleKeyDown}
                wrapEnabled={true}
                setOptions={{
                  useWorker: false,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
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
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default Home;

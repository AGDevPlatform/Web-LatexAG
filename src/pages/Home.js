import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormulaGrid from "../components/FormulaGrid";
import MenuInput from "../components/menuInput";
import MenuOutput from "../components/menuOutput";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
const MathShortcuts = {
  insertMathMode: {
    name: "insertMathMode",
    bindKey: { win: "Ctrl-Shift-M", mac: "Command-Shift-M" },
    formula: "$$",
    pos: 1,
    x: 1,
    y: 0,
    check: false,
    icon: false,
  },
  insertFraction: {
    name: "insertFraction",
    bindKey: { win: "Ctrl-Shift-F", mac: "Command-Shift-F" },
    formula: "\\dfrac{}{}",
    pos: 3,
    x: 8,
    y: 2,
  },
  insertSquareRoot: {
    name: "insertSquareRoot",
    bindKey: { win: "Ctrl-Shift-Q", mac: "Command-Shift-Q" },
    formula: "\\sqrt{}",
    pos: 1,
    x: 7,
    y: 0,
  },
  insertNewShortcut1: {
    name: "insertNewShortcut1",
    bindKey: { win: "Ctrl-Shift-D", mac: "Command-Shift-D" },
    formula: "_{}",
    pos: 1,
    x: 3,
    y: 0,
  },
  insertNewShortcut2: {
    name: "fđfh",
    bindKey: { win: "Ctrl-Shift-U", mac: "Command-Shift-U" },
    formula: "^{}",
    pos: 1,
    x: 3,
    y: 0,
  },
};
function Home() {
  const [stringInit, setStringInit] = useState("");
  const [inputText, setInputText] = useState(stringInit);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);
  const [basicFormulas, setBasicFormulas] = useState([]);
  const [basicFormulas2, setBasicFormulas2] = useState([]);
  const [basicFormulas3, setBasicFormulas3] = useState([]);
  const [basicFormulas4, setBasicFormulas4] = useState([]);
  const [basicFormulas5, setBasicFormulas5] = useState([]);
  const [basicFormulas6, setBasicFormulas6] = useState([]);
  const [basicFormulas7, setBasicFormulas7] = useState([]);
  const [basicFormulas8, setBasicFormulas8] = useState([]);
  const [basicFormulas9, setBasicFormulas9] = useState([]);
  const [basicFormulas10, setBasicFormulas10] = useState([]);
  const [scale, setScale] = useState(1);
  const [isChecked, setIsChecked] = useState(true);
  const [theme, setTheme] = useState("tomorrow");
  useEffect(() => {
    const savedTheme = localStorage.getItem("editorTheme");
    if (savedTheme && (savedTheme === "tomorrow" || savedTheme === "dracula")) {
      setTheme(savedTheme);
    }
  }, []);
  useEffect(() => {
    const savedValue = localStorage.getItem("checkboxState");
    if (savedValue !== null) {
      setIsChecked(JSON.parse(savedValue));
    }
  }, []);
  useEffect(() => {
    const dataUrls = [
      { url: "/data.json", setter: setBasicFormulas },
      { url: "/data2.json", setter: setBasicFormulas2 },
      { url: "/data3.json", setter: setBasicFormulas3 },
      { url: "/data4.json", setter: setBasicFormulas4 },
      { url: "/data5.json", setter: setBasicFormulas5 },
      { url: "/data6.json", setter: setBasicFormulas6 },
      { url: "/data7.json", setter: setBasicFormulas7 },
      { url: "/data8.json", setter: setBasicFormulas8 },
      { url: "/data9.json", setter: setBasicFormulas9 },
      { url: "/data10.json", setter: setBasicFormulas10 },
    ];

    dataUrls.forEach(({ url, setter }) => fetchData(url, setter));

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

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("editorTheme", newTheme);
  };

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    localStorage.setItem("checkboxState", JSON.stringify(newValue));

    if (newValue) {
      toast.success("Bật tự động copy thành công !");
    } else {
      toast.warning("Đã tắt tự động copy !");
    }
  };

  useEffect(() => {
    if (isChecked) {
      handleCopy2();
    }
  }, [inputText, isChecked]);

  const handleInputChange = (value) => {
    setInputText(value);
    updateIframeContent(value);
  };

  const fetchData = async (url, setterFunction) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setterFunction(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setterFunction([]);
    }
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
                      <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"></script>
                      <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"></script>
                      <style>
                        body { font-family: Times New Roman, sans-serif;
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
  //pos:Vị trí con trỏ sau khi chèn (Không tô đen)
  //x: Vị trí chèn phần tử tô đen (So với công thức)
  //y: Vị trí con trỏ sau khi chèn phần tô đen (So với vị trí kết thúc phần tô đen vừa chèn)
  //check: kiểm tra có phải là các công thức khác không (Căn lề, in đậm, in nghiên,....)
  //icon: kiểm tra phải chèn một kí tự dạng icon

  const insertFormula = (formula, pos, x, y, check, icon) => {
    const editor = inputRef?.current?.editor;
    if (!editor) {
      console.error("Editor instance not found");
      return;
    }

    const position = editor.getCursorPosition();
    const selection = editor.getSelection();
    const range = selection.getRange();
    const selectionRange = editor.getSelection().getRange();
    const isTextSelected = !selectionRange.isEmpty();
    if (icon === 99) {
      // toast.success("99");
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
      if (check === true) {
        newFormula = formula;
        newCursorPos = newCursorPos - pos;
      } else {
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
      }

      const newText = textBeforeCursor + newFormula + textAfterCursor;
      setInputText(newText);
      updateIframeContent(newText);
      setTimeout(() => {
        editor.focus();
        editor.moveCursorTo(range.start.row, newCursorPos);
      }, 0);
    } else {
      if (isTextSelected) {
        const selectedText = editor.getSelectedText();
        const startPos = editor.session.doc.positionToIndex(
          selectionRange.start
        );
        const endPos = editor.session.doc.positionToIndex(selectionRange.end);

        const textBeforeSelection = inputText.substring(0, startPos);
        const textAfterSelection = inputText.substring(endPos);

        const beforeDollarCount = (textBeforeSelection.match(/\$/g) || [])
          .length;
        const afterDollarCount = (textAfterSelection.match(/\$/g) || []).length;

        let newFormula = formula;
        if (check === true) {
          newFormula = `${formula}`;
          x = x - 1;
        } else {
          if (formula !== "$$") {
            if (beforeDollarCount % 2 === 1 && afterDollarCount % 2 === 1) {
              newFormula = `${formula}`;
              x = x - 1;
            } else {
              newFormula = `$${formula}$`;
            }
          } else {
            newFormula = `${formula}`;
          }
        }

        const insertionPoint = startPos + x;
        const newFormulaWithSelectedText =
          newFormula.slice(0, insertionPoint - startPos) +
          selectedText +
          newFormula.slice(insertionPoint - startPos);

        const newText =
          textBeforeSelection + newFormulaWithSelectedText + textAfterSelection;

        const newCursorPos = startPos + x + selectedText.length + y;
        setInputText(newText);
        updateIframeContent(newText);
        setTimeout(() => {
          editor.focus();
          editor.moveCursorToPosition(
            editor.session.doc.indexToPosition(newCursorPos)
          );
          editor.clearSelection();
        }, 0);
      } else {
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
        if (check === true) {
          newFormula = formula;
          newCursorPos = newCursorPos - pos;
        } else {
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
        }

        const newText = textBeforeCursor + newFormula + textAfterCursor;
        setInputText(newText);
        updateIframeContent(newText);

        setTimeout(() => {
          editor.focus();
          editor.moveCursorTo(range.start.row, newCursorPos);
        }, 0);
      }
    }
  };

  //Copy
  const insertFormulaShortcut = (formula, pos, x, y, check, icon) => {
    const editor = inputRef?.current?.editor;
    if (!editor) {
      console.error("Editor instance not found");
      return;
    }

    const position = editor.getCursorPosition();
    const currentContent = editor.getValue();
    const cursorIndex = editor.session.doc.positionToIndex(position);

    let newFormula = formula;
    let newCursorPos = cursorIndex + formula.length - pos;

    const textBeforeCursor = currentContent.substring(0, cursorIndex);
    const textAfterCursor = currentContent.substring(cursorIndex);

    const beforeDollarCount = (textBeforeCursor.match(/\$/g) || []).length;
    const afterDollarCount = (textAfterCursor.match(/\$/g) || []).length;

    if (!check && formula !== "$$") {
      if (beforeDollarCount % 2 === 1 && afterDollarCount % 2 === 1) {
        newFormula = formula;
      } else {
        newFormula = `$${formula}$`;
        newCursorPos += 1;
      }
    }

    const newContent = textBeforeCursor + newFormula + textAfterCursor;

    editor.setValue(newContent, 1);

    editor.moveCursorToPosition(
      editor.session.doc.indexToPosition(newCursorPos)
    );
    editor.focus();
    setInputText(newContent);
    updateIframeContent(newContent);
  };

  const copyTextToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };
  const handleCopy = () => {
    copyTextToClipboard(inputText)
      .then(() => {
        toast.success("Đã copy tất cả nội dung thành công !");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const handleCopy2 = () => {
    copyTextToClipboard(inputText)
      .then(() => {})
      .catch((err) => {});
  };

  const zoomIn = () => setScale((prev) => prev + 0.1);
  const zoomOut = () => setScale((prev) => (prev > 0.1 ? prev - 0.1 : prev));
  const reset = () => setScale(1);

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
          <div
            className="overflow-y-auto p-1 flex flex-col gap-0 flex-shrink-0"
            style={{
              maxHeight: "calc(85vh + 48px)",
              backgroundColor: "#F8F8F8",
              borderRadius: "10px",
            }}
          >
            <FormulaGrid
              formulas={basicFormulas}
              rows={4}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas2}
              rows={3}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas5}
              rows={3}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas10}
              rows={3}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas3}
              rows={6}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas4}
              rows={6}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas6}
              rows={4}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas7}
              rows={6}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas9}
              rows={6}
              insertFormula={insertFormula}
            />
            <FormulaGrid
              formulas={basicFormulas8}
              rows={10}
              insertFormula={insertFormula}
            />
          </div>

          <div class="grid grid-cols-1 gap-0">
            <MenuInput
              isChecked={isChecked}
              handleChange={handleChange}
              theme={theme}
              handleThemeChange={handleThemeChange}
              setInputText={setInputText}
              updateIframeContent={updateIframeContent}
              copyTextToClipboard={copyTextToClipboard}
              handleCopy={handleCopy}
              insertFormula={insertFormula}
            />
            <Editor
              inputRef={inputRef}
              MathShortcuts={MathShortcuts}
              insertFormulaShortcut={insertFormulaShortcut}
              theme={theme}
              handleInputChange={handleInputChange}
              inputText={inputText}
            />
          </div>
          <div class="grid grid-cols-1 gap-0">
            <MenuOutput
              inputTextLength={inputText.length}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              reset={reset}
            />
            <Preview ref={iframeRef} scale={scale} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default Home;

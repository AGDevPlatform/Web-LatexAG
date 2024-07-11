import React, { useState, useRef, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormulaGrid from "../components/FormulaGrid";
import MenuInput from "../components/menuInput";
import MenuOutput from "../components/menuOutput";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import renderMathInElement from "katex/contrib/auto-render";
import DraggableBox from "./DraggableBox";
import { parse, HtmlGenerator } from "latex.js";
// import { createHTMLWindow } from "svgdom";
import debounce from "lodash/debounce";
import katex from "katex";
import "katex/dist/katex.min.css";
import Header from "../components/Header";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MathShortcuts = {
  insertNewShortcut0: {
    name: "XuongDUng46",
    bindKey: { win: "Ctrl-L", mac: "Command-L" },
    formula: "\\\\",
    pos: 0,
    x: 9,
    y: 0,
    check: true,
    icon: 99,
  },
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
  insertNewShortcut4: {
    name: "fđfhF765",
    bindKey: { win: "Ctrl-B", mac: "Command-Shift-P" },
    formula: "\\textbf{}",
    pos: 1,
    x: 9,
    y: 0,
    check: true,
    icon: false,
  },
  insertNewShortcut5: {
    name: "fđfh676",
    bindKey: { win: "Ctrl-I", mac: "Command-Shift-I" },
    formula: "\\textit{}",
    pos: 1,
    x: 9,
    y: 0,
    check: true,
    icon: false,
  },
};
const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",

  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};
function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [stringInit, setStringInit] = useState("");

  const [inputText, setInputText] = useState(stringInit);
  const inputRef = useRef(null);
  const previewRef = useRef(null);
  const [snippets, setSnippets] = useState(() => {
    // Khởi tạo state từ localStorage
    const savedSnippets = localStorage.getItem("snippets");
    return savedSnippets ? JSON.parse(savedSnippets) : [];
  });
  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

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
  // const updatePreviewContent = useCallback(
  //   (text) => {
  //     if (previewRef.current) {
  //       const processedText = processText(text);
  //       previewRef.current.innerHTML = processedText;

  //       renderMathInElement(previewRef.current, {
  //         delimiters: [
  //           { left: "$$", right: "$$", display: true },
  //           { left: "$", right: "$", display: false },
  //         ],
  //       });
  //     }
  //   },
  //   [inputText]
  // );

  // const processText = useCallback((text) => {
  //   return text
  //     .split("\n")
  //     .map((line) => {
  //       const commentIndex = line.indexOf("%");
  //       return commentIndex !== -1 ? line.slice(0, commentIndex) : line;
  //     })
  //     .join("\n")
  //     .replace(/\\\\(\s*)/g, "<br>")
  //     .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
  //     .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
  //     .replace(
  //       /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
  //       '<div style="text-align: center;">$1</div>'
  //     )
  //     .replace(
  //       /\\begin\{flushleft\}([\s\S]*?)\\end\{flushleft\}/g,
  //       '<div style="text-align: left;">$1</div>'
  //     )
  //     .replace(
  //       /\\begin\{flushright\}([\s\S]*?)\\end\{flushright\}/g,
  //       '<div style="text-align: right;">$1</div>'
  //     )
  //     .replace(/\s+/g, " ")

  //     .trim(); // Xóa khoảng trắng ở đầu và cuối chuỗi;
  // }, []);
  const renderMath = useCallback((tex, displayMode) => {
    try {
      return katex.renderToString(tex, {
        displayMode: displayMode,
        throwOnError: false,
        errorColor: "#cc0000",
        strict: "warn",
      });
    } catch (error) {
      console.error("KaTeX rendering error:", error);
      return `<span style="color: #cc0000;">${tex}</span>`;
    }
  }, []);

  const processText = useCallback(
    (text) => {
      let processedText = text
        .split("\n")
        .map((line) => {
          const commentIndex = line.indexOf("%");
          return commentIndex !== -1 ? line.slice(0, commentIndex) : line;
        })
        .join("\n")
        .replace(/\\\\(\s*)/g, "<br>")
        .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
        .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
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
        )
        .replace(/\s+/g, " ")
        .trim();

      const parts = processedText.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
      return parts
        .map((part, index) => {
          if (part.startsWith("$$") && part.endsWith("$$")) {
            return renderMath(part.slice(2, -2), true);
          } else if (part.startsWith("$") && part.endsWith("$")) {
            return renderMath(part.slice(1, -1), false);
          } else {
            return part;
          }
        })
        .join("");
    },
    [renderMath]
  );
  const updatePreviewContent = useCallback(
    (text) => {
      if (previewRef.current) {
        const processedText = processText(text);
        previewRef.current.innerHTML = processedText;
      }
    },
    [processText]
  );
  const handleInputChange = useCallback((value) => {
    setInputText(value);
    // value = value + "\n".repeat(100);
    updatePreviewContent(value);
  });

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

    // updateIframeContent(inputText);
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
      toast.success("Automatic copy enabled successfully!");
    } else {
      toast.warning("Automatic copy disabled!");
    }
  };

  useEffect(() => {
    if (isChecked && inputText !== "") {
      handleCopy2();
    }
  }, [inputText, isChecked]);

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
      updatePreviewContent(newText);
      // updateIframeContent(newText);
      // debouncedUpdateIframe(newText);

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
        updatePreviewContent(newText);
        // updateIframeContent(newText);
        // debouncedUpdateIframe(newText);

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
        updatePreviewContent(newText);

        // updateIframeContent(newText);
        // debouncedUpdateIframe(newText);

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
    updatePreviewContent(newContent);

    // debouncedUpdateIframe(newContent);
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
        toast.success("All content has been copied successfully !");
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
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);
  const handleOpen3 = () => setOpen3(true);
  useEffect(() => {
    // Lưu snippets vào localStorage mỗi khi nó thay đổi
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);
  useEffect(() => {
    // Load snippets from localStorage when component mounts
    const storedSnippets = JSON.parse(localStorage.getItem("snippets") || "[]");
    setSnippets(storedSnippets);
  }, []);
  useEffect(() => {
    // Save snippets to localStorage whenever they change
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);
  const addSnippet = useCallback((keyword, content) => {
    setSnippets((prevSnippets) => [...prevSnippets, { keyword, content }]);
  }, []);

  const removeSnippet = useCallback((keyword) => {
    setSnippets((prevSnippets) =>
      prevSnippets.filter((snippet) => snippet.keyword !== keyword)
    );
  }, []);

  const editSnippet = useCallback((oldKeyword, newKeyword, newContent) => {
    setSnippets((prevSnippets) =>
      prevSnippets.map((snippet) =>
        snippet.keyword === oldKeyword
          ? { keyword: newKeyword, content: newContent }
          : snippet
      )
    );
  }, []);

  return (
    <>
      <Header handleOpen3={handleOpen3} />
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F3F3F3",
          borderRadius: "10px",
        }}
      >
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style3,
              width: "600px",
              maxWidth: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div className=" bg-white rounded-lg ">
              <div className="relative h-8 flex items-center justify-between ">
                <div className="ml-4 flex space-x-2 items-center">
                  <span className="h-3 w-3 rounded-full bg-red-400"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                  <span className="h-3 w-3 rounded-full bg-green-400"></span>
                </div>
                <div className="mr-4 text-gray-600 flex space-x-2 items-center">
                  <button title="Close" onClick={handleClose3}>
                    <i class="fa-solid fa-x"></i>
                  </button>
                </div>
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-base font-light block text-sm font-medium truncate">
                  Snippet
                </div>
              </div>
              <div className="mb-1  rounded-xl p-5 ">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Keyword"
                    className="w-full border-2 border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
                    id="newSnippetKeyword"
                  />
                  <textarea
                    placeholder="Content"
                    className="w-full h-32 border-2 border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 resize-none "
                    id="newSnippetContent"
                    style={{ color: "#1EC939" }}
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        const keyword = document
                          .getElementById("newSnippetKeyword")
                          .value.trim();
                        const content = document
                          .getElementById("newSnippetContent")
                          .value.trim();

                        if (!keyword || !content) {
                          // Thông báo khi thiếu thông tin
                          toast.error("Please fill in all required fields.");
                        } else {
                          // Thêm snippet và thông báo thành công
                          addSnippet(keyword, content);
                          document.getElementById("newSnippetKeyword").value =
                            "";
                          document.getElementById("newSnippetContent").value =
                            "";

                          toast.success("Snippet added successfully!");
                        }
                      }}
                      className="w-auto bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-1 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-md"
                    >
                      <i className="fas fa-plus mr-2"></i> Add Snippet
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-1">
                <ul>
                  {[...snippets].reverse().map((snippet, index) => (
                    <li
                      key={snippet.keyword}
                      className={`p-1 px-4 rounded-md flex items-center justify-between transition duration-300 ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-blue-100`}
                    >
                      <div className="flex-grow mr-4 overflow-hidden flex flex-col">
                        <span
                          className="font-semibold  mb-1"
                          style={{ color: "#0D83FF" }}
                        >
                          <i class="fa-solid fa-key"></i> {snippet.keyword}
                        </span>
                        <span
                          className=" break-words text-sm"
                          style={{ color: "#1EC939" }}
                        >
                          {snippet.content.length > 100
                            ? snippet.content.substring(0, 100) + "..."
                            : snippet.content}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSnippet(snippet.keyword)}
                        className="shadow-md m-1 text-white px-2 py-1 rounded-lg transition duration-300 transform hover:scale-105 flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(to right, #FC5753, #FD7E14)",
                          boxShadow: "0 4px 6px rgba(252, 87, 83, 0.25)",
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Box>
        </Modal>
        {/* <input type="file" accept=".tex" onChange={handleFileChange} /> */}
        <div
          className="grid grid-cols-[155px,1fr,1fr] gap-0 divide-x divide-solid divide-gray"
          style={{ borderRadius: "10px" }}
        >
          <div
            className="overflow-y-auto p-1 flex flex-col gap-0 flex-shrink-0"
            style={{
              maxHeight: "calc(85vh + 48px)",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <FormulaGrid
              formulas={basicFormulas}
              rows={6}
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
              rows={7}
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
              updateIframeContent={updatePreviewContent}
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
              snippets={snippets}
            />
          </div>
          <div
            class="grid grid-cols-1 gap-0"
            style={{ backgroundColor: "white" }}
          >
            <MenuOutput
              inputTextLength={inputText?.length}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              reset={reset}
            />
            <Preview ref={previewRef} scale={scale} />
          </div>
        </div>
        <ToastContainer />
        {/* <DraggableBox /> */}
      </div>
    </>
  );
}
export default Home;

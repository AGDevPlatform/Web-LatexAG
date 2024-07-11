import React, { useState, useRef, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import renderMathInElement from "katex/contrib/auto-render";
import katex from "katex";
import "katex/dist/katex.min.css";
function Home() {
  const [stringInit, setStringInit] = useState("");

  const [inputText, setInputText] = useState(stringInit);
  const inputRef = useRef(null);
  const previewRef = useRef(null);

  const updatePreviewContent = useCallback(
    (text) => {
      if (previewRef.current) {
        const processedText = processText(text);
        previewRef.current.innerHTML = processedText;

        renderMathInElement(previewRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
        });
      }
    },
    [inputText]
  );

  const processText = useCallback((text) => {
    return text
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

      .trim(); // Xóa khoảng trắng ở đầu và cuối chuỗi;
  }, []);

  const handleInputChange = useCallback((value) => {
    setInputText(value);
    // value = value + "\n".repeat(100);
    updatePreviewContent(value);
  });

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
          <div
            class="grid grid-cols-1 gap-0"
            style={{ backgroundColor: "white" }}
          >
            <Preview ref={previewRef} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;

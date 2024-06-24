import React, { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import "./customFont.css"; // Create this CSS file to import your custom font
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
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
  //   {
  //     name: "Square",
  //     formula: "\\sqrt{}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Square",
  //     formula: "\\sqrt{x}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Fraction",
  //     formula: "\\frac{x}{y}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Integral",
  //     formula: "\\int_{a}^{b} x dx",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Sum",
  //     formula: "\\sum_{i=1}^{n} x_i",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   { name: "Product", formula: "\\prod_{i=1}^{n} x_i" },
  //   {
  //     name: "Square",
  //     formula: "x^2",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Square Root",
  //     formula: "\\sqrt{x}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Fraction",
  //     formula: "\\frac{x}{y}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Square Root",
  //     formula: "\\sqrt{x}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Fraction",
  //     formula: "\\frac{x}{y}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Square Root",
  //     formula: "\\sqrt{x}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Fraction",
  //     formula: "\\frac{x}{y}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Square Root",
  //     formula: "\\sqrt{x}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Fraction",
  //     formula: "\\frac{x}{y}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  //   {
  //     name: "Square Root",
  //     formula: "\\sqrt{x}",
  //     linkimage:
  //       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719206089/img095misc-math_p73yij.svg",
  //     pos: 1,
  //   },
  // ];
  const basicFormulas2 = [
    { name: "Square", formula: "x^2" },
    { name: "Square Root", formula: "\\sqrt{x}" },
    { name: "Fraction", formula: "\\frac{x}{y}" },
    { name: "Integral", formula: "\\int_{a}^{b} x dx" },
    { name: "Sum", formula: "\\sum_{i=1}^{n} x_i" },
    { name: "Product", formula: "\\prod_{i=1}^{n} x_i" },
    { name: "Square", formula: "x^2" },
    { name: "Square Root", formula: "\\sqrt{x}" },
    { name: "Fraction", formula: "\\frac{x}{y}" },
    { name: "Square Root", formula: "\\sqrt{x}" },
    { name: "Fraction", formula: "\\frac{x}{y}" },
    { name: "Square Root", formula: "\\sqrt{x}" },
    { name: "Fraction", formula: "\\frac{x}{y}" },
    { name: "Square Root", formula: "\\sqrt{x}" },
    { name: "Fraction", formula: "\\frac{x}{y}" },
  ];
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
    // <div style={{ padding: "20px", backgroundColor: "#f3f3f3" }}>
    //   <nav className="fixed shadow-md top-0 left-0 w-full z-10 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/30">
    //     <div style={{ marginBottom: "20px" }}>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexWrap: "wrap",
    //           gap: "10px",
    //           marginBottom: "10px",
    //         }}
    //       >
    //         <div className="grid grid-rows-1 grid-flow-col gap-2">
    //           <div
    //             className="grid grid-cols-3 gap-0 p-1"
    //             style={{ borderWidth: "2px" }}
    //           >
    //             {basicFormulas1.map((item, index) => (
    //               <div key={index} className="relative inline-block mr-1">
    //                 <button
    //                   onClick={() => insertFormula(item.formula)}
    //                   style={{ borderRadius: "5px" }}
    //                   className="w-9 h-9 bg-gray border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-0.5"
    //                 >
    //                   <img
    //                     src={
    //                       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719205399/img024arrows_zyowgf.svg"
    //                     }
    //                     alt="dummy-image"
    //                     style={{
    //                       width: "100%",
    //                       height: "100%",
    //                       objectFit: "contain", // Đảm bảo toàn bộ hình ảnh nằm gọn trong kích thước của nút
    //                     }}
    //                   />
    //                 </button>
    //               </div>
    //             ))}
    //           </div>
    //           <div
    //             className="grid grid-cols-3 gap-0 p-1"
    //             style={{ borderWidth: "2px" }}
    //           >
    //             {basicFormulas1.map((item, index) => (
    //               <div key={index} className="relative inline-block mr-1">
    //                 <button
    //                   onClick={() => insertFormula(item.formula)}
    //                   style={{ borderRadius: "5px" }}
    //                   className="w-9 h-9 bg-gray border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-0.5"
    //                 >
    //                   <img
    //                     src={
    //                       "https://res.cloudinary.com/decwrwfpa/image/upload/v1719205399/img024arrows_zyowgf.svg"
    //                     }
    //                     alt="dummy-image"
    //                     style={{
    //                       width: "100%",
    //                       height: "100%",
    //                       objectFit: "contain", // Đảm bảo toàn bộ hình ảnh nằm gọn trong kích thước của nút
    //                     }}
    //                   />
    //                 </button>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>

    //   <div className="grid grid-cols-2 gap-4 h-screen border border-gray-300  divide-x divide-solid divide-black divide-w-2">
    //     <div className="h-full">
    //       <textarea
    //         ref={inputRef}
    //         value={inputText}
    //         onChange={handleInputChange}
    //         placeholder="Enter LaTeX formula"
    //         className="w-full h-full p-4  text-base mb-4 outline-none"
    //       />
    //     </div>
    //     <div
    //       className="h-full p-4 mb-4 text-lg font-medium custom-font-output overflow-auto"
    //       style={{ backgroundColor: "white" }}
    //     >
    //       <div
    //         style={{
    //           overflowWrap: "break-word",
    //           wordWrap: "break-word",
    //           whiteSpace: "pre-wrap",
    //           textAlign: "justify",
    //         }}
    //       >
    //         <Latex>{inputText}</Latex>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div>
        <h1>Latex AG</h1>
      </div>
      {/* <div className="p-5 bg-gray-200" style={{ height: "100%" }}>
        <div className="grid grid-cols-[auto,1fr,1fr] gap-4  border border-gray-300 divide-x divide-solid divide-black">
          <div className=" grid grid-rows-5 gap-1 h-full">
            <div
              className="grid grid-rows-4 grid-flow-col gap-1 p-2"
              style={{
                borderWidth: "1px",
                margin: "5px",
                borderColor: "red",
                borderRadius: "10px",
              }}
            >
              {basicFormulas1.map((item, index) => (
                <div key={index} className="flex justify-center items-center">
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
            <div
              className="grid grid-rows-4 grid-flow-col gap-1 p-2"
              style={{
                borderWidth: "1px",
                margin: "5px",
                borderColor: "red",
                borderRadius: "10px",
              }}
            >
              {basicFormulas1.map((item, index) => (
                <div key={index} className="flex justify-center items-center">
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
            <div
              className="grid grid-rows-4 grid-flow-col gap-1 p-2"
              style={{
                borderWidth: "1px",
                margin: "5px",
                borderColor: "red",
                borderRadius: "10px",
              }}
            >
              {basicFormulas1.map((item, index) => (
                <div key={index} className="flex justify-center items-center">
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
            <div
              className="grid grid-rows-4 grid-flow-col gap-1 p-2"
              style={{
                borderWidth: "1px",
                margin: "5px",
                borderColor: "red",
                borderRadius: "10px",
              }}
            >
              {basicFormulas1.map((item, index) => (
                <div key={index} className="flex justify-center items-center">
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
            <div
              className="grid grid-rows-4 grid-flow-col gap-1 p-2"
              style={{
                borderWidth: "1px",
                margin: "5px",
                borderColor: "red",
                borderRadius: "10px",
              }}
            >
              {basicFormulas1.map((item, index) => (
                <div key={index} className="flex justify-center items-center">
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
          </div>
          <div className="h-full">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter LaTeX formula"
              className="w-full h-full p-4 text-base mb-4 outline-none"
            />
          </div>
          <div className="p-4 h-full mb-4 text-lg font-medium custom-font-output overflow-auto bg-white">
            <div className="break-words whitespace-pre-wrap text-justify">
              <Latex>{inputText}</Latex>
            </div>
          </div>
        </div>
      </div> */}
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

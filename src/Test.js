import React, { useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons từ react-icons

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [theme, setTheme] = useState("light");
  const [inputText, setInputText] = useState("");
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const updatePreviewContent = () => {
    // Logic cập nhật nội dung preview
  };

  const copyTextToClipboard = (text) => {
    // Logic copy vào clipboard
  };

  const handleCopy = () => {
    // Logic xử lý sao chép
  };

  const insertFormula = (formula) => {
    // Logic chèn công thức
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const insertFormulaShortcut = (event) => {
    // Logic xử lý phím tắt chèn công thức
  };

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-10">
        <button onClick={toggleMenu} className="p-2 bg-gray-200 rounded">
          {isMenuExpanded ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div
        className={`grid grid-cols-1 gap-0 ${
          isMenuExpanded ? "menu-expanded" : "menu-collapsed"
        }`}
      >
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
    </div>
  );
};

const MenuInput = ({
  isChecked,
  handleChange,
  theme,
  handleThemeChange,
  setInputText,
  updateIframeContent,
  copyTextToClipboard,
  handleCopy,
  insertFormula,
}) => {
  // Nội dung của component MenuInput
  return <div className="menu-content">{/* Các phần tử của menu */}</div>;
};

const Editor = ({
  inputRef,
  MathShortcuts,
  insertFormulaShortcut,
  theme,
  handleInputChange,
  inputText,
  snippets,
}) => {
  // Nội dung của component Editor
  return <div>{/* Phần tử editor */}</div>;
};

export default Home;

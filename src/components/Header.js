import React, { useState, useRef, useEffect } from "react";

function Header() {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const shortcutsRef = useRef(null);

  const shortcuts = [
    { name: "$$", key: "Ctrl + Shift + M" },
    { name: "\\dfrac{}{}", key: "Ctrl + Shift + F" },
    { name: "_{}", key: "Ctrl + Shift + D" },
    { name: "^{}", key: "Ctrl + Shift + U" },
    { name: "\\sqrt{}", key: "Ctrl + Shift + Q" },
  ];

  // Close the shortcuts menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        shortcutsRef.current &&
        !shortcutsRef.current.contains(event.target)
      ) {
        setShowShortcuts(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShortcutsClick = () => {
    setShowShortcuts(!showShortcuts);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "5px",
          marginBottom: "5px",
          borderWidth: "1.5px",
          borderColor: "#DDDDDD",
          borderStyle: "solid",
          borderRadius: "5px",
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <a
            href="/"
            style={{
              margin: "0 10px",
              fontWeight: "bold",
              color: "#1F9CF0",

              borderRadius: "5px",
            }}
          >
            Latex AG
          </a>
          <a href="/" className="hover:underline" style={{ margin: "0 10px" }}>
            Trang chủ
          </a>
          <div style={{ position: "relative" }} ref={shortcutsRef}>
            <a
              className="hover:underline"
              style={{ margin: "0 10px", cursor: "pointer" }}
              onClick={handleShortcutsClick}
            >
              Phím tắt
            </a>
            {showShortcuts && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
                  zIndex: 10,
                }}
              >
                <ul
                  style={{ listStyleType: "none", padding: "0", margin: "0" }}
                >
                  {shortcuts.map((shortcut, index) => (
                    <li key={index}>
                      <div
                        // href="/"
                        className="hover:bg-gray-200 block py-2 px-4"
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span style={{ color: "green" }}>{shortcut.name}</span>
                        <span style={{ marginLeft: "20px" }}>
                          {shortcut.key}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <a href="/" className="hover:underline" style={{ margin: "0 10px" }}>
            Hướng Dẫn
          </a>
          <a
            href="/about"
            className="hover:underline"
            style={{ margin: "0 10px" }}
          >
            Giới thiệu
          </a>
          <a
            href="/contact"
            className="hover:underline"
            style={{ margin: "0 10px" }}
          >
            Liên hệ
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;

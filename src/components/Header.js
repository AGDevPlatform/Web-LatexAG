import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
function Header() {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const shortcutsRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        borderBottomWidth: "2px",
        borderColor: "#EFEFEF",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="bg-white flex items-center justify-center w-full">
              <div className="bg-white  rounded-lg p-3 h-full w-full">
                <div>
                  <div className="text-center mb-5">
                    <h1 className="text-6xl font-bold text-blue-500">
                      Latex AG
                    </h1>
                  </div>

                  <div className="text-center space-y-4">
                    <p className="text-lg">
                      Trang Web hỗ trợ soạn thảo công thức Latex.
                    </p>

                    <p>
                      Latex Vật Lý 31415:
                      <a
                        href="https://www.facebook.com/latexvatly31415/"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        https://www.facebook.com/latexvatly31415/
                      </a>
                    </p>

                    <p>
                      Email:{" "}
                      <a
                        href="mailto:latexvatly31415@gmail.com"
                        className="text-blue-600 hover:underline"
                      >
                        latexvatly31415@gmail.com
                      </a>
                    </p>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Copyright &copy; 2024 Latex AG. All right reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
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
          <a
            href="/huongdan"
            className="hover:underline"
            style={{ margin: "0 10px" }}
          >
            Hướng Dẫn
          </a>
          <button
            className="hover:underline"
            style={{ margin: "0 10px" }}
            onClick={handleOpen}
          >
            Giới thiệu
          </button>
          {/* <a
            href="/contact"
            className="hover:underline"
            style={{ margin: "0 10px" }}
          >
            Liên hệ
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default Header;

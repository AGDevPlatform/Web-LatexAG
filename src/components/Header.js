import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import countapi from "countapi-js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
function Header() {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const shortcutsRef = useRef(null);
  const [visits, setVisits] = useState(0);
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
    const incrementVisits = () => {
      const storedVisits = localStorage.getItem("visitCount");
      let currentVisits = storedVisits ? parseInt(storedVisits, 10) : 0;

      // Chỉ tăng số lần truy cập nếu đây là lần đầu tiên trong phiên này
      if (!sessionStorage.getItem("visitIncremented")) {
        currentVisits += 1;
        localStorage.setItem("visitCount", currentVisits.toString());
        sessionStorage.setItem("visitIncremented", "true");
      }

      setVisits(currentVisits);
    };

    incrementVisits();

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
        borderBottomWidth: "1px",
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
                    <h1
                      className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{
                        fontSize: "50px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                      }}
                    >
                      Latex AG
                    </h1>
                  </div>

                  <div className="text-center">
                    <p
                      style={{ fontSize: "15px", marginBottom: "40px" }}
                      className="text-gray-500"
                    >
                      A website that assists in composing LaTeX formulas.
                    </p>
                    <p
                      className=" text-gray-500 dark:text-gray-400"
                      style={{ fontSize: "15px" }}
                    >
                      Made by{" "}
                      <a
                        href="https://github.com/thevi31415"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
                      >
                        @thevi31415
                      </a>
                    </p>
                    <div
                      className="text-center"
                      style={{ marginBottom: "15px" }}
                    >
                      <p className="text-sm text-gray-500">
                        &copy; 2024 Nguyen Duong The Vi. All right reserved.
                      </p>
                    </div>
                    <div className="text-center flex justify-center items-center mb-4">
                      <a
                        href="https://www.producthunt.com/posts/latex-ag?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-latex&#0045;ag"
                        target="_blank"
                      >
                        <img
                          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=468756&theme=light"
                          alt="Latex&#0032;AG - The&#0032;website&#0032;helps&#0032;you&#0032;compose&#0032;LaTeX&#0032;formulas&#0032;quickly | Product Hunt"
                          style={{ width: "250px", height: "54px" }}
                          width="250"
                          height="54"
                        />
                      </a>
                    </div>
                    <div className="text-center">
                      <button
                        className="text-sm text-gray-500"
                        onClick={handleClose}
                        style={{
                          backgroundColor: "#f2f4f5",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <i
                          class="fa-solid fa-x"
                          style={{ color: "#bcbfc3", marginRight: "7px" }}
                        ></i>
                        Close
                      </button>
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
          <button
            href="/"
            style={{
              margin: "0 10px",
              fontSize: "18px",
              borderRadius: "5px",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
            className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Latex AG
          </button>

          <button
            className="hover:underline block text-sm font-medium truncate"
            style={{ margin: "0 10px", fontSize: "16px" }}
          >
            <a href="/"> Home</a>
          </button>

          <button style={{ position: "relative" }} ref={shortcutsRef}>
            <button
              className="hover:underline block text-sm font-medium truncate"
              style={{ margin: "0 10px", cursor: "pointer", fontSize: "16px" }}
              onClick={handleShortcutsClick}
            >
              Shortcuts
            </button>
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
          </button>
          <button
            href="/huongdan"
            className="hover:underline block text-sm font-medium truncate"
            style={{ margin: "0 10px", fontSize: "16px" }}
          >
            <a href="/Guide"> Guide</a>
          </button>
          <button
            className="hover:underline block text-sm font-medium truncate"
            style={{ margin: "0 10px", fontSize: "16px" }}
            onClick={handleOpen}
          >
            About
          </button>
          <div className="flex ml-3">
            <div className="text-xs sm:text-sm text-nowrap flex justify-center items-center gap-x-1.5">
              <div className="relative flex size-2">
                <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
              </div>
              {/* <span
                className="font-bold  truncate"
                style={{ fontSize: "17px" }}
              >
                {visits}
              </span> */}
              <span className="font-bold truncate" style={{ fontSize: "17px" }}>
                {(() => {
                  if (visits < 1000) return visits.toString();
                  if (visits < 1000000) return (visits / 1000).toFixed(1) + "K";
                  if (visits < 1000000000)
                    return (visits / 1000000).toFixed(1) + "M";
                  return (visits / 1000000000).toFixed(1) + "B";
                })()}
              </span>
              <span>your visits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

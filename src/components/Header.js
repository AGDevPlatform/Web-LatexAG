import React, { useState, useRef, useEffect, useCallback } from "react";

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
  p: 2,
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

function Header({ handleOpen3 }) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const shortcutsRef = useRef(null);
  const [visits, setVisits] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shortcuts = [
    { name: "\\\\", key: "Ctrl + L" },
    { name: "\\textbf{}", key: "Ctrl + B" },
    { name: "\\textif{}", key: "Ctrl + I" },
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
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setOpen2(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleClose2 = () => setOpen2(false);

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
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div
            style={{
              width: "100%",
              height: 150,
              marginBottom: 20,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <img
              src="/Bg.png"
              alt="Background"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <Typography
            id="welcome-modal-title"
            className=" text-sm font-medium truncate"
            variant="h6"
            component="h2"
          >
            Welcome to Latex AG.👋👋
          </Typography>
          <Typography id="welcome-modal-description" sx={{ mt: 2 }}>
            If you find the website helpful, please give us an upvote on Product
            Hunt! 👇👇
          </Typography>
          <div className="text-center flex justify-center items-center mt-3">
            <a
              href="https://www.producthunt.com/posts/latex-ag?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-latex&#0045;ag"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=468756&theme=light"
                alt="upvote"
                style={{ width: "250px", height: "54px" }}
              />
            </a>
          </div>
          <Button
            onClick={handleClose2}
            sx={{ mt: 1 }}
            style={{ fontSize: "20px" }}
          >
            Ok
          </Button>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="relative h-8 flex items-center justify-between ">
              <div className="ml-4 flex space-x-2 items-center">
                <span className="h-3 w-3 rounded-full bg-red-400"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                <span className="h-3 w-3 rounded-full bg-green-400"></span>
              </div>
              <div className="mr-4 text-gray-600 flex space-x-2 items-center">
                <button title="Close" onClick={handleClose}>
                  <i class="fa-solid fa-x"></i>
                </button>
              </div>
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-base font-light block text-sm font-medium truncate">
                About
              </div>
            </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* <div
        className="top-0 right-0 flex-shrink-0"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 hidden md:inline">
          New
        </span>
      </div> */}

      <div
        style={{
          marginTop: "1px",
          marginBottom: "1px",
          borderWidth: "1.5px",
          borderColor: "#DDDDDD",
          borderStyle: "solid",
          borderRadius: "8px",
          width: "650px",
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
              fontSize: "16px",
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
              <div className="absolute top-full left-0 bg-white/100  rounded-lg shadow-lg z-10 border border-white/30">
                <ul className="list-none p-0 m-0">
                  {shortcuts.map((shortcut, index) => (
                    <li key={index} style={{ margin: "5px" }}>
                      <div
                        className="block py-1 px-2 flex justify-between items-center whitespace-nowrap transition duration-300 hover:bg-[#158AF5] group"
                        style={{ borderRadius: "7px" }}
                      >
                        <span
                          className="text-black/90 group-hover:text-white "
                          style={{ fontWeight: "500", color: "#56F270" }}
                        >
                          {shortcut.name}
                        </span>
                        <span
                          className="ml-5 text-black/70 group-hover:text-white "
                          style={{ fontWeight: "400" }}
                        >
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
            className="hover:underline block text-sm font-medium truncate"
            style={{ margin: "0 10px", fontSize: "16px" }}
            onClick={handleOpen3}
          >
            Snippet
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

              <span className="font-bold truncate" style={{ fontSize: "15px" }}>
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
        <div
          className="absolute top-0 right-0 hidden md:flex items-center "
          style={{ marginTop: "2.5px", marginRight: "5px", padding: "2px" }}
        >
          <span
            className="bg-blue-100 text-blue-800  font-semibold px-2.5 py-0.5 rounded-lg "
            style={{ fontSize: "13px" }}
          >
            ✨ 11/7/2024 - Cập nhật tô đỏ công thức gõ sai.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;

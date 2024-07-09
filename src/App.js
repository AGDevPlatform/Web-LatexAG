import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Guid from "./pages/Guid";

const App = () => {
  const appContainerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    // overflow: "hidden", // Prevents any overflow causing scrollbars
  };

  return (
    <>
      <div style={appContainerStyle}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <main
          style={{
            height: "100dvh",
            minHeight: "100%",
            position: "relative",
            overflowY: "hidden",
          }}
        >
          {/* <div className="w-full flex justify-center items-start md:items-center box-border  bg-[#E6F8F9] md:px-3 pl-3 pr-12 lg:relative top-0 z-[99999] lg:z-auto">
            <div className="relative my-auto mr-3 mt-0 md:m-0 md:mr-1">
              <span style={{ fontSize: "22px", margin: "5px" }}>🎉</span>
            </div>
            <div>
              <span className="my-auto text-[#414045] font-medium text-14 mr-1">
                Trang web đang trong quá trình phát triển !
              </span>
            </div>
            <button className="absolute md:right-6 right-4 md:top-[15px] top-4">
              <i className="svicon-close text-2xl font-bold"></i>
            </button>
          </div> */}
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gioithieu" element={<About />} />
            <Route path="/huongdan" element={<Guid />} />

            <Route path="/lienhe" element={<Contact />} />
          </Routes>
          {/* <Footer /> */}
        </main>
      </div>
    </>
  );
};

export default App;

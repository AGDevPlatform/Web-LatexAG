import React, { forwardRef, useEffect, useState } from "react";
import "./font.css";
const Preview = forwardRef(({ scale, content }, ref) => {
  const [contentHeight, setContentHeight] = useState("auto");

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const scrollHeight = ref.current.scrollHeight;
        setContentHeight(`${scrollHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [content, ref]);

  return (
    <div
      style={{
        height: "calc(100vh - 0px)",
        overflow: "auto",
        zIndex: 0,
        position: "relative",
      }}
    >
      <div
        ref={ref}
        style={{
          width: "100%",
          minHeight: "100%",
          height: contentHeight,
          backgroundColor: "white",
          zIndex: 0,
          position: "relative",
          borderColor: "#DCDCDC",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          fontSize: "17.5px",
          lineHeight: "1.5",
          padding: "10px",
          paddingBottom: "100000px",
          fontFamily: "'Latin Modern Roman', serif", // Các thuộc tính mới để đảm bảo xuống dòng tự động
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
        }}
      >
        {content}
      </div>
    </div>
  );
});

export default Preview;

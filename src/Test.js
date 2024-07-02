import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

const LatexStyled = styled.div`
  @import url("https://unpkg.com/latex.css/style.min.css");

  /* Add any additional styles or overrides here */
`;

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
      <LatexStyled>
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
            lineHeight: "1.6",
            padding: "10px",
            paddingBottom: "100px",
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          {content}
        </div>
      </LatexStyled>
    </div>
  );
});

export default Preview;

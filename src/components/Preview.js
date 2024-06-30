import React, { forwardRef } from "react";

const Preview = forwardRef(({ scale }, ref) => {
  return (
    <div
      style={{
        height: "calc(100vh - 0px)",
        overflow: "auto",
        zIndex: 0,
        position: "relative",
      }}
    >
      <iframe
        ref={ref}
        title="LaTeX Output"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          zIndex: 0,
          position: "relative",
          borderBottomWidth: "1px",
          borderColor: "#DCDCDC",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
});

export default Preview;

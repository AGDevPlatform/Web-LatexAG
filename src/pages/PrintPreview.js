// PrintPreview.js
import React from "react";

const PrintPreview = ({ content }) => {
  return (
    <div id="print-preview">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PrintPreview;

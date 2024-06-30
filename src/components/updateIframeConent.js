import React, { useEffect } from "react";

const IframeContentUpdater = ({ text, iframeRef }) => {
  useEffect(() => {
    const updateIframeContent = () => {
      if (iframeRef.current) {
        const processedText = text
          .replace(/\\\\(\s*)/g, "<br>")
          .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
          .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
          .replace(
            /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
            '<div style="text-align: center;">$1</div>'
          )
          .replace(
            /\\begin\{flushleft\}([\s\S]*?)\\end\{flushleft\}/g,
            '<div style="text-align: left;">$1</div>'
          )
          .replace(
            /\\begin\{flushright\}([\s\S]*?)\\end\{flushright\}/g,
            '<div style="text-align: right;">$1</div>'
          );

        const iframeContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css">
            <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"></script>
            <style>
              body {
                font-family: Times New Roman, sans-serif;
                white-space: normal;
                word-wrap: break-word;
                padding: 10px;
                font-size: 17.5px;
                line-height: 1.6;
              }
              .katex { font-size: 1.1em; }
              strong { font-weight: bold; }
              em { font-style: italic; }
              u { text-decoration: underline; }
            </style>
          </head>
          <body>
            <div id="latex-content">${processedText}</div>
            <script>
              document.addEventListener("DOMContentLoaded", function() {
                renderMathInElement(document.body, {
                  delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                  ]
                });
              });
            </script>
          </body>
          </html>
        `;
        iframeRef.current.srcdoc = iframeContent;
      }
    };

    updateIframeContent();
  }, [text, iframeRef]);

  return null; // This component doesn't render anything visible
};

export default IframeContentUpdater;

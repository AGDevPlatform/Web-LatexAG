const [stringInit, setStrinhInit] = useState("");
const [inputText, setInputText] = useState(stringInit);
const iframeRef = useRef(null);

const fetchData = async (url, setterFunction) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setterFunction(data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    setterFunction([]);
  }
};

useEffect(() => {
  const dataUrls = [
    { url: "/data.json", setter: setBasicFormulas },
    { url: "/data2.json", setter: setBasicFormulas2 },
    { url: "/data3.json", setter: setBasicFormulas3 },
    { url: "/data4.json", setter: setBasicFormulas4 },
    { url: "/data5.json", setter: setBasicFormulas5 },
    { url: "/data6.json", setter: setBasicFormulas6 },
  ];

  dataUrls.forEach(({ url, setter }) => fetchData(url, setter));

  updateIframeContent(inputText);
}, []);

const updateIframeContent = (text) => {
  if (iframeRef.current) {
    // const processedText = text;
    const processedText = text
      .replace(/\\\\(\s*)/g, "<br>")
      .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
      .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
      // .replace(/\\underline\{([^}]+)\}/g, "<u>$1</u>")
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
      ); // Replace \\ followed by any whitespace with <br>

    const iframeContent = `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css">
                    <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"></script>
                    <style>
                      body { font-family: Times New Roman, sans-serif;
                       white-space: normal;
                word-wrap: break-word;
                padding: 10px;
                font-size: 17px; /* Increased base font size */
          line-height: 1.6; /* Adjusted line height for better readability */ }
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

import React, { useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
const customCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    const completions = [
      {
        value: "alpha ",
        index: 1,
      },
      {
        value: "beta ",
        index: 2,
      },
      {
        value: "zeta ",
        index: 3,
      },
      {
        value: "kappa ",
        index: 4,
      },
      {
        value: "epsilon ",
        index: 5,
      },
    ];
    callback(null, completions);
  },
};
const Editor = ({
  inputRef,
  MathShortcuts,
  insertFormulaShortcut,
  theme,
  handleInputChange,
  inputText,
}) => {
  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.completers = [customCompleter];

      editor.getSession().on("change", function (e) {
        const cursor = editor.getCursorPosition();
        const line = editor.session.getLine(cursor.row);

        if (cursor.column > 0 && line.charAt(cursor.column - 1) === "\\") {
          editor.execCommand("startAutocomplete");
        }
      });
    }
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 0px)",
        overflow: "auto",
        zIndex: 0,
        position: "relative",
      }}
    >
      <AceEditor
        ref={(el) => {
          editorRef.current = el;
          if (inputRef) inputRef.current = el;
        }}
        onLoad={(editorInstance) => {
          // editorInstance.completers = [customCompleter];
          Object.values(MathShortcuts).forEach((shortcut) => {
            editorInstance.commands.addCommand({
              name: shortcut.name,
              bindKey: shortcut.bindKey,
              exec: () => {
                console.log(`Shortcut ${shortcut.name} executed`);
                insertFormulaShortcut(
                  shortcut.formula,
                  shortcut.pos,
                  shortcut.x,
                  shortcut.y,
                  shortcut.check,
                  shortcut.icon
                );
              },
            });
          });
        }}
        mode="latex"
        theme={theme}
        onChange={handleInputChange}
        value={inputText}
        name="latex-editor"
        editorProps={{ $blockScrolling: Infinity }}
        width="100%"
        height="85vh"
        fontSize="14px"
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        wrapEnabled={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        style={{
          zIndex: 0,
          position: "relative",
          borderBottomWidth: "1px",
          borderColor: "#DCDCDC",
        }}
      />
    </div>
  );
};

export default Editor;

import React, { useRef, useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({
  inputRef,
  MathShortcuts,
  insertFormulaShortcut,
  theme,
  handleInputChange,
  inputText,
}) => {
  const editorRef = useRef(null);

  const [hintData, setHintData] = useState({ completions: [] });

  useEffect(() => {
    fetch("/hint.json")
      .then((response) => response.json())
      .then((data) => {
        setHintData(data);
      })
      .catch((error) => console.error("Error loading hint data:", error));
  }, []);

  const customCompleter = {
    getCompletions: (editor, session, pos, prefix, callback) => {
      const completions = hintData.completions;
      callback(
        null,
        completions.map((completion) => ({
          caption: completion.value.trim(),
          value: completion.value,
          score: 1000 - completion.index,
          meta: "",
          completer: {
            insertMatch: function (editor, data) {
              editor.completer.insertMatch({ value: data.value });
              const pos = editor.getCursorPosition();
              editor.moveCursorTo(pos.row, pos.column - completion.index);
            },
          },
        }))
      );
    },
  };

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

      editor.commands.on("afterExec", function (e) {
        if (e.command.name === "insertstring" && /^[\w\.]$/.test(e.args)) {
          editor.execCommand("startAutocomplete");
        }
      });
    }
  }, [hintData]);
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

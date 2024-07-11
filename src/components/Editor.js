import React, { useRef, useState, useEffect } from "react";
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
  snippets,
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
      const completions = [
        ...hintData.completions,
        ...snippets.map((snippet) => ({
          caption: snippet.keyword,
          value: snippet.content,
          score: 1000,
          meta: "snippet",
        })),
      ];

      callback(
        null,
        completions.map((completion) => ({
          caption: completion.caption || completion.value.trim(),
          value: completion.value,
          score: completion.score || 1000 - (completion.index || 0),
          meta: completion.meta || "",
          completer: {
            insertMatch: function (editor, data) {
              editor.completer.insertMatch({ value: data.value });
              if (completion.index) {
                const pos = editor.getCursorPosition();
                editor.moveCursorTo(pos.row, pos.column - completion.index);
              }
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

        // Check for snippet keywords and replace them
        snippets.forEach((snippet) => {
          const keywordLength = snippet.keyword.length;
          // Kiểm tra từ khóa ngay trước vị trí con trỏ
          const textBeforeCursor = line.slice(0, cursor.column);
          if (textBeforeCursor.endsWith(snippet.keyword)) {
            // Xóa từ khóa
            const range = {
              start: {
                row: cursor.row,
                column: cursor.column - keywordLength,
              },
              end: {
                row: cursor.row,
                column: cursor.column,
              },
            };
            editor.session.remove(range);

            // Chèn nội dung snippet
            editor.session.insert(range.start, snippet.content);

            // Di chuyển con trỏ đến cuối đoạn snippet vừa chèn
            const insertedLines = snippet.content.split("\n");
            const lastLineLength =
              insertedLines[insertedLines.length - 1].length;
            const newPosition = {
              row: range.start.row + insertedLines.length - 1,
              column:
                insertedLines.length > 1
                  ? lastLineLength
                  : range.start.column + lastLineLength,
            };
            editor.moveCursorToPosition(newPosition);
            editor.clearSelection();
          }
        });
      });
      editor.commands.on("afterExec", function (e) {
        if (e.command.name === "insertstring" && /^[\w\.]$/.test(e.args)) {
          editor.execCommand("startAutocomplete");
        }
      });
    }
  }, [hintData, snippets]);

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

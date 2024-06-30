import React from "react";
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
        ref={inputRef}
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

<AceEditor
  // ... other props ...
  ref={inputRef}
  onLoad={(editorInstance) => {
    Object.values(MathShortcuts).forEach((shortcut) => {
      editorInstance.commands.addCommand({
        name: shortcut.name,
        bindKey: shortcut.bindKey,
        exec: () => {
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
/>;

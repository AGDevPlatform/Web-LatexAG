onLoad={(editorInstance) => {
  Object.values(MathShortcuts).forEach((shortcut) => {
    editorInstance.commands.addCommand({
      name: shortcut.name,
      bindKey: shortcut.bindKey,
      exec: (editor, args, event) => {
        if (event) {
          event.preventDefault();
        }
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
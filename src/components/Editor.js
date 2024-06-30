import React, { useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
const customCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    const completions = [
      { value: "sqrt{}" },
      { value: "sqrt[]{}" },
      { value: "dfrac{}{}" },
      { value: "sum_{}^{}" },
      { value: "displaystyle\\int{}\\;\\mathrm{d}x" },
      { value: "displaystyle\\int\\limits_{ }^{ } { }\\;\\mathrm{d}x" },
      { value: "displaystyle \\lim_{ \\to 0}" },
      { value: "dfrac{\\mathrm{d} }{\\mathrm{d} x}" },
      { value: "left (  \\right )" },
      { value: "left [  \\right ]" },
      { value: "left\\{  \\right\\}" },
      { value: "left<  \\right>" },
      { value: "left| \\right|" },
      { value: "left\\| \\right\\|" },
      { value: "left \\lfloor \\right \\rfloor" },
      { value: "left \\lceil \\right \\rceil " },
      { value: "binom{}{}" },
      { value: "rightarrow " },
      { value: "leftarrow " },
      { value: "uparrow " },
      { value: "downarrow " },
      { value: "xleftarrow[]{}" },
      { value: "xrightarrow[]{}" },
      { value: "leftrightarrow " },
      { value: "Leftarrow " },
      { value: "Rightarrow " },
      { value: "Leftrightarrow " },
      { value: "leftrightharpoons " },
      { value: "rightleftharpoons " },
      { value: "leftharpoonup " },
      { value: "rightharpoonup " },
      { value: "leftharpoondown  " },
      { value: "rightharpoondown  " },
      { value: "overset{}{\\leftarrow}" },
      { value: "overset{}{\\rightarrow} " },
      { value: "leq ", score: 1000 },
      { value: "geq ", score: 1000 },
      { value: "nless ", score: 1000 },
      { value: "ngtr ", score: 1000 },
      { value: "nleqslant ", score: 1000 },
      { value: "ngeqslant ", score: 1000 },
      { value: "equiv ", score: 1000 },
      { value: "not\\equiv ", score: 1000 },
      { value: "neq  ", score: 1000 },
      { value: "sim ", score: 1000 },
      { value: "approx  ", score: 1000 },
      { value: "simeq  ", score: 1000 },
      { value: "ll ", score: 1000 },
      { value: "gg ", score: 1000 },
      { value: "parallel ", score: 1000 },
      { value: "perp ", score: 1000 },
      { value: "vdash ", score: 1000 },
      { value: "dashv ", score: 1000 },
      { value: "widetilde{}", score: 1000 },
      { value: "widehat{}", score: 1000 },
      { value: "overleftarrow{}", score: 1000 },
      { value: "overrightarrow{}", score: 1000 },
      { value: "overline{}", score: 1000 },
      { value: "underline{}", score: 1000 },
      { value: "overbrace{}", score: 1000 },
      { value: "underbrace{}", score: 1000 },
      { value: "subset ", score: 1000 },
      { value: "supset ", score: 1000 },
      { value: "subseteq ", score: 1000 },
      { value: "supseteq ", score: 1000 },
      { value: "nsubseteq ", score: 1000 },
      { value: "nsupseteq ", score: 1000 },
      { value: "supseteqq ", score: 1000 },
      { value: "subseteqq ", score: 1000 },
      { value: "nsupseteqq ", score: 1000 },
      { value: "in ", score: 1000 },
      { value: "ni ", score: 1000 },
      { value: "notin ", score: 1000 },
      { value: "mathbb{P}", score: 1000 },
      { value: "mathbb{N}", score: 1000 },
      { value: "mathbb{Z}", score: 1000 },
      { value: "mathbb{I}", score: 1000 },
      { value: "mathbb{Q}", score: 1000 },
      { value: "mathbb{R}", score: 1000 },
      { value: "mathbb{C}", score: 1000 },
      { value: "measuredangle ", score: 1000 },
      { value: "sphericalangle ", score: 1000 },
      { value: "angle ", score: 1000 },
      { value: "varnothing ", score: 1000 },
      { value: "infty ", score: 1000 },
      { value: "mho ", score: 1000 },
      { value: "Omega ", score: 1000 },
      { value: "forall ", score: 1000 },
      { value: "exists ", score: 1000 },
      { value: "partial ", score: 1000 },
      { value: "Re ", score: 1000 },
      {
        value: "alpha ",
      },
      {
        value: "beta ",
      },
      {
        value: "zeta ",
      },
      {
        value: "kappa ",
      },
      {
        value: "epsilon ",
      },
      {
        value: "varepsilon ",
      },
      {
        value: "iota ",
      },
      {
        value: "xi ",
      },
      {
        value: "theta ",
      },
      {
        value: "vartheta ",
      },
      {
        value: "nu ",
      },
      {
        value: "varrho ",
      },
      {
        value: "lambda ",
      },
      {
        value: "mu ",
      },
      {
        value: "rho ",
      },
      {
        value: "upsilon ",
      },
      {
        value: "pi ",
      },
      {
        value: "varpi ",
      },
      {
        value: "tau ",
      },
      {
        value: "psi ",
      },
      {
        value: "sigma ",
      },
      {
        value: "varsigma ",
      },
      {
        value: "chi ",
      },
      {
        value: "phi ",
      },
      {
        value: "varphi ",
      },
      {
        value: "delta ",
      },
      {
        value: "omega ",
      },
      {
        value: "gamma ",
      },
      {
        value: "eta ",
      },
      {
        value: "pm ",
      },
      {
        value: "mp ",
      },
      {
        value: "cap ",
      },
      {
        value: "cup ",
      },
      {
        value: "times ",
      },
      {
        value: "odot ",
      },
      {
        value: "wedge ",
      },
      {
        value: "vee ",
      },
      {
        value: "square ",
      },
      {
        value: "Delta ",
      },
      {
        value: "Theta ",
      },
      {
        value: "Lambda ",
      },
      {
        value: "Xi ",
      },
      {
        value: "Pi ",
      },
      {
        value: "Sigma ",
      },
      {
        value: "Upsilon ",
      },
      {
        value: "Phi ",
      },
      {
        value: "Psi ",
      },
      {
        value: "sin{}",
      },
      {
        value: "cos{}",
      },
      {
        value: "tan{}",
      },
      {
        value: "cot{}",
      },
      {
        value: "sec{}",
      },
      {
        value: "log{}",
      },
      {
        value: "log_{}{}",
      },
      {
        value: "ln{}",
      },
      {
        value: "ell ",
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

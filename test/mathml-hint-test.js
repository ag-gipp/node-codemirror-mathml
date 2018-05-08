// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

describe('test mathml cases', () => {
  const CodeMirror = require('codemirror');
  require('../index.js');
  const Pos = CodeMirror.Pos;

  const namespace = "mathml-hint_";

  testData = [
    {
      name: "mathml-element",
      value: "<mat",
      list: ["<math", "<matrix", "<matrixrow"]
    },
    {
      name: "element-close",
      value: "<math>\n</",
      list: ["</math>"]
    },
    {
      name: "id-attribute",
      value: "<csymbol i",
      from: Pos(0, "<csymbol i".length - 1),
      list: ["id"]
    },
    {
      name: "times-completion",
      value: "<tim",
      list: ["<times"]
    }
  ];


  function escapeHtmlList(o) {
    return '<code>' +
      JSON.stringify(o.list, null, 2)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;") +
      '</code>'
      ;
  }
  testData.forEach(function(spec) {
    // Use sane defaults
    const lines = spec.value.split(/\n/);
    spec.to = spec.pos || Pos(lines.length - 1, lines[lines.length - 1].length);
    spec.from = spec.from || Pos(lines.length - 1, 0);
    spec.cursor = spec.cursor || spec.to;
    const name = spec.name || spec.value;
    it(namespace + name, () => {
      {
        const cm = CodeMirror(global.document.body);
        cm.setValue(spec.value);
        cm.setCursor(spec.cursor);
        const completion = CodeMirror.hint.mathml(cm);
        if (!deepCompare(completion.list, spec.list)) {
          throw new Failure("Wrong completion results. Got" +
            escapeHtmlList(completion) + " but expected" +
            escapeHtmlList(spec));
        }
        // eqCharPos(completion.from, spec.from, 'from-failed');
        // eqCharPos(completion.to, spec.to, 'to-failed');
      }
    });
  });


  function deepCompare(a, b) {
    if (a === b) {
      return true;
    }
    if (!(a && typeof a === "object") ||
      !(b && typeof b === "object")) {
      return false;
    }
    var array = Array.isArray(a);
    if (Array.isArray(b) !== array) {
      return false;
    }
    if (array) {
      if (a.length !== b.length) {
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        if (!deepCompare(a[i], b[i])) {
          return false;
        }
      }
    } else {
      for (var p in a) {
        if (!(p in b) || !deepCompare(a[p], b[p])) {
          return false;
        }
      }
      for (var p in b) {
        if (!(p in a)) {
          return false;
        }
      }
    }
    return true;
  }
});

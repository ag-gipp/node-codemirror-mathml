// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("./node_modules/codemirror/lib/codemirror"), require("./node_modules/codemirror/addon/hint/xml-hint"));
   else if (typeof define == "function" && define.amd) // AMD
     define(["node_modules/codemirror/lib/codemirror", "node_modules/codemirror/addon/hint/xml-hint"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var tagNames = [
    "abs",
    "and",
    "annotation",
    "annotation-xml",
    "apply",
    "approx",
    "arccos",
    "arccosh",
    "arccot",
    "arccoth",
    "arccsc",
    "arccsch",
    "arcsec",
    "arcsech",
    "arcsin",
    "arcsinh",
    "arctan",
    "arctanh",
    "arg",
    "bind",
    "bvar",
    "card",
    "cartesianproduct",
    "cbytes",
    "ceiling",
    "cerror",
    "ci",
    "cn",
    "codomain",
    "complexes",
    "compose",
    "condition",
    "conjugate",
    "cos",
    "cosh",
    "cot",
    "coth",
    "cs",
    "csc",
    "csch",
    "csymbol",
    "curl",
    "declare",
    "degree",
    "determinant",
    "diff",
    "divergence",
    "divide",
    "domain",
    "domainofapplication",
    "emptyset",
    "encoding",
    "eq",
    "equivalent",
    "eulergamma",
    "exists",
    "exp",
    "exponentiale",
    "factorial",
    "factorof",
    "false",
    "floor",
    "fn",
    "forall",
    "function",
    "gcd",
    "geq",
    "grad",
    "gt",
    "ident",
    "image",
    "imaginary",
    "imaginaryi",
    "implies",
    "in",
    "infinity",
    "int",
    "integers",
    "intersect",
    "interval",
    "inverse",
    "lambda",
    "laplacian",
    "lcm",
    "leq",
    "limit",
    "list",
    "ln",
    "log",
    "logbase",
    "lowlimit",
    "lt",
    "maction",
    "malign",
    "maligngroup",
    "malignmark",
    "malignscope",
    "math",
    "matrix",
    "matrixrow",
    "max",
    "mean",
    "median",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mfraction",
    "mglyph",
    "mi",
    "min",
    "minus",
    "mlabeledtr",
    "mlongdiv",
    "mmultiscripts",
    "mn",
    "mo",
    "mode",
    "moment",
    "momentabout",
    "mover",
    "mpadded",
    "mphantom",
    "mprescripts",
    "mroot",
    "mrow",
    "ms",
    "mscarries",
    "mscarry",
    "msgroup",
    "msline",
    "mspace",
    "msqrt",
    "msrow",
    "mstack",
    "mstyle",
    "msub",
    "msubsup",
    "msup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "naturalnumbers",
    "neq",
    "none",
    "not",
    "notanumber",
    "notin",
    "notprsubset",
    "notsubset",
    "or",
    "otherwise",
    "outerproduct",
    "partialdiff",
    "pi",
    "piece",
    "piecewice",
    "piecewise",
    "plus",
    "power",
    "primes",
    "product",
    "prsubset",
    "quotient",
    "rationals",
    "real",
    "reals",
    "reln",
    "rem",
    "root",
    "scalarproduct",
    "sdev",
    "sec",
    "sech",
    "select",
    "selector",
    "semantics",
    "sep",
    "set",
    "setdiff",
    "share",
    "sin",
    "sinh",
    "span",
    "subset",
    "sum",
    "tan",
    "tanh",
    "tendsto",
    "times",
    "transpose",
    "true",
    "union",
    "uplimit",
    "var",
    "variance",
    "vector",
    "vectorproduct",
    "xor"
  ];

  var s = { attrs: {} }; // Simple tag, reused for a whole lot of tags
  var data = {};
  for (var t of tagNames) {
    data[t] = s;
  }


  var globalAttrs = {
    id: null,
    xref: null,
  };

  function populate(obj) {
    for (var attr in globalAttrs) {
      if (globalAttrs.hasOwnProperty(attr)) {
        obj.attrs[attr] = globalAttrs[attr];
      }
    }
  }

  populate(s);
  for (var tag in data) {
    if (data.hasOwnProperty(tag) && data[tag] != s) {
      populate(data[tag]);
    }
  }

  CodeMirror.mathmlSchema = data;

  function mathmlHint(cm, options) {
    var local = { schemaInfo: data };
    if (options) {
      for (var opt in options) {
        local[opt] = options[opt];
      }
    }
    return CodeMirror.hint.xml(cm, local);
  }
  CodeMirror.registerHelper("hint", "mathml", mathmlHint);
});

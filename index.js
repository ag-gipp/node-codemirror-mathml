// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
"use strict";

const CodeMirror = require('codemirror/lib/codemirror.js');
require('codemirror/addon/hint/xml-hint');
require('codemirror/mode/xml/xml.js'); // required?
const tagNames = require('mathml-tag-names');
const s = { attrs: {} }; // Simple tag, reused for a whole lot of tags
const data = {};
for (const t of tagNames) {
  data[t] = s;
}


const globalAttrs = {
  id: null,
  xref: null,
};

function populate(obj) {
  for (let attr in globalAttrs) {
    if (globalAttrs.hasOwnProperty(attr)) {
      obj.attrs[attr] = globalAttrs[attr];
    }
  }
}

populate(s);
for (let tag in data) {
  if (data.hasOwnProperty(tag) && data[tag] !== s) {
    populate(data[tag]);
  }
}

CodeMirror.mathmlSchema = data;

function mathmlHint(cm, options) {
  const local = { schemaInfo: data };
  if (options) {
    for (const opt in options) {
      // noinspection JSUnfilteredForInLoop
      local[opt] = options[opt];
    }
  }
  return CodeMirror.hint.xml(cm, local);
}

CodeMirror.registerHelper("hint", "mathml", mathmlHint);


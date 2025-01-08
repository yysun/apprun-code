import { app, Component } from 'apprun';

import Editor from '@monaco-editor/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

const styles = (code_width) => `
apprun-code {
  display: block;
  height:350px;
}
.apprun-play {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.col-editor, .col-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: dotted gray 1px;
}
.col-editor {
  flex: 0 0 ${code_width ? `${code_width};` : '70%'};
  padding-right: 5px;
}
.col-preview {
  flex: 0 0 ${code_width ? `calc(100% - ${code_width});` : '30%'}
}
.editor, .preview {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  overflow: auto;
}
`;

const encodeHTML = code => {
  return code.replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');
}

import apprun from './lib/apprun-html.js?raw';

const code_html = code => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>AppRun Playground</title>
  <style>
    body {
      font-family: "Benton Sans", "Helvetica Neue", helvetica, arial, sans-serif;
      margin: 2em;
    }
  </style>
  <script>
  ${apprun}
  </script>
  <script src="https://cdn.jsdelivr.net/npm/typescript@5.3.3"></script>
</head>
<body>
<pre id="code" style="display:none">${encodeHTML(code)}</pre>
<script>
const code = document.getElementById('code').innerText;
const compiled = ts.transpileModule(code, {
  compilerOptions: {
    "jsx": "react",
    "jsxFactory": "app.h",
    "jsxFragmentFactory": "app.Fragment",
    "target": "es2018",
  },
  reportDiagnostics: true,
});

if (compiled.diagnostics && compiled.diagnostics.length) {
  const pre = document.createElement('pre');
  pre.style = 'font-size: 10px;';
  pre.innerText = compiled.diagnostics.map(d => {
    const start = d.start;
    const end = d.start + d.length;
    const line = code.substring(0, end).split('\\n').length;
    const column = code.substring(0, end).split('\\n').pop().length;
    return \`Line: \${line}, Column: \${column}, \${d.messageText}\`;
  }).join('\\n');
  document.body.appendChild(pre);
} else {
  window.onerror = function () {
    const pre = document.createElement('pre');
    pre.style = 'font-size: 10px;';
    pre.innerText = compiled.outputText;;
    document.body.appendChild(pre);
  };
  const script = document.createElement('script');
  script.text = compiled.outputText;
  document.body.appendChild(script);
}
</script>
</body>
</html>`;

const render = app.render;
const h = app.h;
const Fragment = app.Fragment;

export class Play extends Component {

  view = ({ code, hide_code, code_width }) => {
    app.use_react(React, ReactDOM);
    return <>
      <style>{styles(code_width)}</style>
      {hide_code ?
        <div className="apprun-play">
          <iframe className="preview" />
        </div>
        :
        <div className="apprun-play">
          <div className="col-editor" >
            <Editor
              className="editor"
              defaultLanguage={code.startsWith("<html") ? "html" : "javascript"}
              defaultValue={code}
              options={{ minimap: { enabled: false } }}
              onChange={code => this.run("exec", code)}
            />
          </div>
          <div className="col-preview">
            <iframe className="preview" />
          </div>
        </div>}
    </>;
  }

  rendered = ({ code }) => {
    app.render = render;
    app.h = app.createElement = h;
    app.Fragment = Fragment;
    setTimeout(() => this.run("exec", code), 100);
  }

  mounted = props => {
    const element = this['element'];
    const code_id = props['code-id'];
    const hide_code = props['hide-code'];
    const code_width = props['code-width'];

    let code_area;
    if (code_id) {
      code_area = document.getElementById(code_id);
    } else {
      code_area = element.previousElementSibling ||
        element.parentElement?.previousElementSibling;
    }

    const code = code_area?.innerText // from div
      || code_area?.value // from textarea
      || element.textContent // from child node

    if (code_area) code_area.style.display = 'none';

    return { code: code.trim(), hide_code, code_width, element };
  }

  update = {
    exec: ({ element }, code) => {
      let iframe = element.querySelector('.preview');
      if (!iframe) return;
      const iframe_clone = iframe.cloneNode();
      iframe.parentNode?.replaceChild(iframe_clone, iframe);
      iframe = iframe_clone;
      const doc = iframe.contentWindow?.document;
      if (!doc) return;
      doc.open();
      if (code.indexOf('<html') >= 0)
        doc.write(code);
      else
        doc.write(code_html(code));
      doc.close();
    }
  }
}

app.webComponent('apprun-code', Play);

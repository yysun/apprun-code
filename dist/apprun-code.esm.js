import{app as e,Component as c}from"apprun";import d from"@monaco-editor/react";import p from"react";import m from"react-dom/client";e.use_react(p,m);const u=r=>`
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
  flex: 0 0 ${r?`${r};`:"70%"};
  padding-right: 5px;
}
.col-preview {
  flex: 0 0 ${r?`calc(100% - ${r});`:"30%"}
}
.editor, .preview {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  overflow: auto;
}
`,h=r=>`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/custom-elements/1.1.2/custom-elements.min.js"><\/script>
  <title>AppRun Playground</title>
  <style>
    body {
      font-family: "Benton Sans", "Helvetica Neue", helvetica, arial, sans-serif;
      margin: 2em;
    }
  </style>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <script src="https://unpkg.com/apprun/dist/apprun-html.js"><\/script>
</head>
<body>
<script>
  Babel.registerPlugin("d", [Babel.availablePlugins["proposal-decorators"], {legacy: true}]);
  Babel.registerPlugin("c", [Babel.availablePlugins["proposal-class-properties"], {loose: true}]);
  Babel.registerPlugin("b", [Babel.availablePlugins["proposal-private-methods"], {loose: true}]);
<\/script>
<script type="text/babel" data-plugins="d, c, b">
  ${r}
<\/script>
</body>
</html>`;class b extends c{view=({code:i,hide_code:l,code_width:t})=>e.h(e.Fragment,null,e.h("style",null,u(t)),l?e.h("div",{class:"apprun-play"},e.h("iframe",{class:"preview"})):e.h("div",{class:"apprun-play"},e.h("div",{class:"col-editor"},e.h(d,{class:"editor",defaultLanguage:i.startsWith("<html")?"html":"javascript",defaultValue:i,options:{minimap:{enabled:!1}},onChange:n=>this.run("exec",n)})),e.h("div",{class:"col-preview"},e.h("iframe",{class:"preview"}))));rendered=({code:i})=>{setTimeout(()=>this.run("exec",i),10)};mounted=i=>{const l=this.element,t=i["code-id"],n=i["hide-code"],o=i["code-width"];let s;t?s=document.getElementById(t):s=l.previousElementSibling||l.parentElement?.previousElementSibling;const a=s?.innerText||s?.value||l.textContent;return s&&(s.style.display="none"),{code:a.trim(),hide_code:n,code_width:o,element:l}};update={exec:({element:i},l)=>{let t=i.querySelector(".preview");if(!t)return;const n=t.cloneNode();t.parentNode?.replaceChild(n,t),t=n;const o=t.contentWindow?.document;o&&(o.open(),l.indexOf("<html")>=0?o.write(l):o.write(h(l)),o.close())}}}e.webComponent("apprun-code",b),window.app=null;export{b as Play};

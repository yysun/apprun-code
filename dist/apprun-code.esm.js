import{app as e,Component as c}from"apprun";import d from"@monaco-editor/react";import m from"react";import p from"react-dom/client";const u=r=>`
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
</html>`,g=e.render,b=e.h,v=e.Fragment;class f extends c{view=({code:i,hide_code:l,code_width:t})=>(e.use_react(m,p),e.h(e.Fragment,null,e.h("style",null,u(t)),l?e.h("div",{className:"apprun-play"},e.h("iframe",{className:"preview"})):e.h("div",{className:"apprun-play"},e.h("div",{className:"col-editor"},e.h(d,{className:"editor",defaultLanguage:i.startsWith("<html")?"html":"javascript",defaultValue:i,options:{minimap:{enabled:!1}},onChange:o=>this.run("exec",o)})),e.h("div",{className:"col-preview"},e.h("iframe",{className:"preview"})))));rendered=({code:i})=>{e.render=g,e.h=e.createElement=b,e.Fragment=v,setTimeout(()=>this.run("exec",i),100)};mounted=i=>{const l=this.element,t=i["code-id"],o=i["hide-code"],n=i["code-width"];let a;t?a=document.getElementById(t):a=l.previousElementSibling||l.parentElement?.previousElementSibling;const s=a?.innerText||a?.value||l.textContent;return a&&(a.style.display="none"),{code:s.trim(),hide_code:o,code_width:n,element:l}};update={exec:({element:i},l)=>{let t=i.querySelector(".preview");if(!t)return;const o=t.cloneNode();t.parentNode?.replaceChild(o,t),t=o;const n=t.contentWindow?.document;n&&(n.open(),l.indexOf("<html")>=0?n.write(l):n.write(h(l)),n.close())}}}e.webComponent("apprun-code",f);export{f as Play};

## AppRun Code Editor

This project creates a web component for demonstrating HTML/JS code snippets in web pages, especially for documentation. e.g., It is used in the [AppRun documentation](https://apprun.js.org/docs/).

> It uses the [React Monaco Editor](https://github.com/suren-atoyan/monaco-react) for code editing. And run the code in a preview iframe.
>
> The web component is built with [AppRun](https://github.com/yysun/apprun).

## Use the web component

Place the web component in your HTML file under the code snippet you want to demo.

```html
<pre>
  // some HTML / JS /JSX code here
</pre>
<apprun-code></apprun-code>
```

## Style the web component

You can style the web component with CSS. For example, you can set the height of the web component.

```html
<apprun-code style="height: 90vh"></apprun-code>
```

You can set the width of the source code.
```html
<apprun-code code-with="50%"></apprun-code>
```

You can also completely hide the source code, just to demo the code.

```html
<apprun-code hide-code="true"></apprun-code>
```

## Development

* Use _npm start_ to start the dev server
* Use _npm run build_ to build the demo
* Use _npm run apprun-code_ to build the web component


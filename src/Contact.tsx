import { app, Component } from 'apprun';
import './Play'

const html = `
<html>
<body>
  <script src="https://unpkg.com/apprun/dist/apprun-html.js"></script>
  <script>
    class Counter extends Component {
      state = 0;
      view = state => {
        return html\`<div>
          <h1>\${state}</h1>
          <button @click=\${ () => this.run("-1") }>-1</button>
          <button @click=\${ () => this.run("+1") }>+1</button>
        </div>\`;
      };
      update = {
        '+1': state => state + 1,
        '-1': state => state - 1
      };
    }
    new Counter().start(document.body);
  </script>
</body>
</html>
`


export default class ContactComponent extends Component {

  state = html
  view = state => <div>
    <pre>{state}</pre>
    <apprun-code style={{ height: '80vh' }}></apprun-code>
  </div>;

  update = {
    '#Contact': state => state,
  };

}


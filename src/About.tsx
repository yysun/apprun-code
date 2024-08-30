import { app, Component } from 'apprun';

export default class AboutComponent extends Component {
  state = `class Counter extends Component {
  state = 0;
  view = state => <>
    <h1>{state}</h1>
    <button $onclick='-1'>-1</button>
    <button $onclick='+1'>+1</button>
  </>;
  update = {
    '+1': state => state + 1,
    '-1': state => state - 1
  };
}
new Counter().start(document.body);`;

  view = state => <section>
    <h5>Component (JSX)</h5>
    <pre>{state}</pre>
    <apprun-code style={{ border: "solid 1px red" }}></apprun-code>
    <hr />
    <h5>Hide Code</h5>
    <pre>{state}</pre>
    <apprun-code hide-code="true"></apprun-code>
  </section>;

  update = {
    '#About': state => state,
  };
}


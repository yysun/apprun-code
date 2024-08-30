import { app, Component } from 'apprun';

export default class HomeComponent extends Component {

  state = `// Counter ($onclick)
const state = 0;
const view = state => <div>
  <h1>{state}</h1>
  <button $onclick={state => state - 1}>+1</button>
  <button $onclick={state => state + 1}>+1</button>
</div>;
app.start(document.body, state, view)
`;

  view = state => <>
    <h5>App (JSX)</h5>
    <pre>{state}</pre>
    <apprun-code code-width="50%"></apprun-code>
  </>;

  update = {
    '#,#Home': state => state,
  };
}


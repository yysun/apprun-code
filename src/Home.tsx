import { app, Component } from 'apprun';

export default class HomeComponent extends Component {

  state = `
  async function* getComic() {
    yield { loading: true };
    const response = await fetch('https://my-xkcd-api.glitch.me');
    const comic = await response.json();
    yield { comic };
  }

  const state = {};
  const view = state => <>
    <div><button $onclick=\{getComic}>fetch ...</button></div>
    {state.loading && <div>loading ... </div>}
    {state.comic && <img src={state.comic.img} />}
  </>;  

  app.start(document.body, state, view);
`;

  view = state => <>
    <h5>App (JSX)</h5>
    <pre>{state}</pre>
    <apprun-code></apprun-code>
  </>;

  update = {
    '/': state => state,
  };
}


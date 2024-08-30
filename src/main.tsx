import './Play';

import app from 'apprun';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Layout from './Layout';

const root = document.getElementById('root');

app.render(root, <Layout />);

const element = 'my-app';
new Home().start(element);
new About().mount(element);
new Contact().start(element);

app.run('#Home');
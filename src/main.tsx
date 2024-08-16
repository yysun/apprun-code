import app from 'apprun';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Layout from './Layout';
import React from 'react';
import ReactDOM from 'react-dom/client'
import { flushSync } from 'react-dom';
app.use_react(React, ReactDOM);

const root = document.getElementById('root');
flushSync(() => app.render(root, <Layout />));

const element = 'my-app';
new Home().start(element);
new About().mount(element);
new Contact().start(element);
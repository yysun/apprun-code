import app from 'apprun';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Layout from './Layout';

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// app.use_react(React, ReactDOM);

const root = document.getElementById('root');
app.render(root, <Layout />);

const element = 'my-app';
new Home().start(element);
new About().mount(element);
new Contact().start(element);

app.run('#Home');
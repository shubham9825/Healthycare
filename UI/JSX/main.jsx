import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import Routing from './Routing.jsx';

const element = <Router> <Routing /></Router>;

const root = createRoot(document.getElementById('root'));
root.render(element);

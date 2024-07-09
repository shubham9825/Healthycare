import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import Routing from './Routing.jsx';
import { Toaster } from 'react-hot-toast';
import '../Assets/style.css';

const element = <Router> <Routing /><Toaster position="top-right" /></Router>;

const root = createRoot(document.getElementById('root'));
root.render(element);

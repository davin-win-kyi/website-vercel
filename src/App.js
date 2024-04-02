
import './App.css';

import { Routes, Route} from 'react-router-dom';

import {Home} from "./Components/Home/Home"

import {About} from "./Components/About/About"

import {Contact} from "./Components/Contact/Contact"

import {CiriculumVitae} from "./Components/CiriculumVitae/CiriculumVitae"

import {Projects} from "./Components/Projects/Projects"

import {Teaching} from "./Components/Teaching/Teaching"

import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/CiriculumVitae" element={<CiriculumVitae />} />
      <Route path="/" element={<Home />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Teaching" element={<Teaching />} />
    </Routes>
  );
}

export default App;

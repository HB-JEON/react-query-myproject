import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import Home from "./components/main/Home";
function App() {
  return (
      <Router>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
      </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Files from "./Files";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App = () => {

  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/files" element={<Files />} />
        </Routes>
    </Router>
  );
};

export default App;

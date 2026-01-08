import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/Homepage";
import RecommendationPage from "./components/RecommendationPage";
import SignupPage from "./components/SignupPage";
import ContactPage from "./components/ContactPage";
import StyleGuidePage from "./components/StyleGuidePage";
import FashionQuizPage from "./components/FashionQuizPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recommendations" element={<RecommendationPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/style-guide" element={<StyleGuidePage />} />
          <Route path="/quiz" element={<FashionQuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

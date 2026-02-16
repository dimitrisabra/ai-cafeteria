import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import FloatingChatButton from "./components/FloatingChatButton";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import DailyMealPage from "./pages/DailyMealPage";
import RecommendationPage from "./pages/RecommendationPage";
import ChatbotPage from "./pages/ChatbotPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BeveragesPage from "./pages/BeveragesPage";
import SnacksPage from "./pages/SnacksPage";
import DessertPage from "./pages/DessertPage";

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      <NavigationBar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/beverages" element={<BeveragesPage />} />
          <Route path="/snacks" element={<SnacksPage />} />
          <Route path="/dessert" element={<DessertPage />} />
          <Route path="/daily-meal" element={<DailyMealPage />} />
          <Route path="/recommend" element={<RecommendationPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Container>
      <FloatingChatButton />
    </>
  );
}

export default App;

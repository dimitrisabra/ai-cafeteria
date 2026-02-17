import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import menuGif from "../home/menu.gif";
import dailyMealGif from "../home/dailymeal.gif";
import recommendationGif from "../home/recommendation.gif";
import chatGif from "../home/chat.gif";

const homeCards = [
  {
    title: "View Menu",
    text: "Browse all meals with images and descriptions.",
    buttonText: "Go to Menu",
    to: "/menu",
    variant: "primary",
    image: menuGif,
    alt: "View Menu"
  },
  {
    title: "Daily Meal",
    text: "See one featured meal of the day.",
    buttonText: "Open Daily Meal",
    to: "/daily-meal",
    variant: "warning",
    image: dailyMealGif,
    alt: "Daily Meal"
  },
  {
    title: "Get Recommendation",
    text: "Find meals matching your preferences.",
    buttonText: "Recommend",
    to: "/recommend",
    variant: "success",
    image: recommendationGif,
    alt: "Get Recommendation"
  },
  {
    title: "Chat with AI",
    text: "Ask about vegetarian or spicy meals.",
    buttonText: "Open Chat",
    to: "/chat",
    variant: "dark",
    image: chatGif,
    alt: "Chat with AI"
  }
];

function HomePage() {
  const [showRenderNotice, setShowRenderNotice] = useState(
    () => localStorage.getItem("hideRenderNotice") !== "true"
  );

  const closeRenderNotice = () => {
    setShowRenderNotice(false);
    localStorage.setItem("hideRenderNotice", "true");
  };

  return (
    <div className="home-page">
      <h1 className="page-title mb-3 text-center">Welcome to the University Cafeteria</h1>

      {showRenderNotice ? (
        <div className="render-notice" role="status" aria-live="polite">
          <span>AI features may take up to 1 minute on first use while the backend wakes up.</span>
          <button
            type="button"
            className="render-notice-close"
            aria-label="Close message"
            onClick={closeRenderNotice}
          >
            x
          </button>
        </div>
      ) : null}

      <p className="text-muted mb-4 text-center">
        Explore meals, pick today&rsquo;s special dish, get recommendations, and chat with AI.
      </p>

      <Row className="g-3 justify-content-center home-cards-row">
        {homeCards.map((card) => (
          <Col md={6} lg={3} key={card.title}>
            <Card className="h-100 shadow-sm home-card text-center">
              <Card.Img variant="top" src={card.image} alt={card.alt} className="home-card-image" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Button as={Link} to={card.to} variant={card.variant} className="mt-auto align-self-center">
                  {card.buttonText}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;

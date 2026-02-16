import React from "react";
import { Card } from "react-bootstrap";

function AboutPage() {
  return (
    <div>
      <h2 className="page-title mb-3">About AI Cafeteria</h2>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Text>
            AI Cafeteria is a smart university dining platform that helps students explore meals, discover daily specials, and get quick food suggestions.
          </Card.Text>
          <Card.Text>
            You can browse menu items with images, use preference-based recommendations, and chat with the built-in assistant for fast meal guidance.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AboutPage;

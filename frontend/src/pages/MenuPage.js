import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import mealsData from "../data/mealsData";
import StarRating from "../components/StarRating";

function MenuPage() {
  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem("mealRatings");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("mealRatings", JSON.stringify(ratings));
  }, [ratings]);

  return (
    <div>
      <h2 className="page-title mb-3">Cafeteria Menu</h2>
      <Row className="g-4">
        {mealsData.map((meal) => (
          <Col md={6} lg={4} key={meal.id}>
            <Card className="h-100 shadow-sm meal-card">
              <Card.Img variant="top" src={meal.image} alt={meal.title} className="meal-image" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{meal.title}</Card.Title>
                <div className="meal-tags mb-2">
                  {meal.tags.map((tag) => (
                    <Badge bg="secondary" key={tag} className="me-2 mb-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Card.Text>{meal.description}</Card.Text>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div className="meal-price">${meal.price.toFixed(2)}</div>
                  <StarRating
                    value={ratings[meal.id] || 0}
                    onChange={(value) => setRatings((prev) => ({ ...prev, [meal.id]: value }))}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MenuPage;

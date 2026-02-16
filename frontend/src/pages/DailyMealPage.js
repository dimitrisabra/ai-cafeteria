import React, { useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import mealsData from "../data/mealsData";
import StarRating from "../components/StarRating";

function DailyMealPage() {
  const index = new Date().getDate() % mealsData.length;
  const meal = mealsData[index];
  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem("mealRatings");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("mealRatings", JSON.stringify(ratings));
  }, [ratings]);

  return (
    <div>
      <h2 className="page-title text-center fw-bold mb-4">Daily Meal</h2>
      <div className="daily-meal-page">
        <Card className="shadow-sm daily-card">
          <Card.Img variant="top" src={meal.image} alt={meal.title} className="daily-image" />
          <Card.Body>
            <Card.Title>{meal.title}</Card.Title>
            <div className="meal-tags mb-2">
              {meal.tags.map((tag) => (
                <Badge bg="secondary" key={tag} className="me-2 mb-2">
                  {tag}
                </Badge>
              ))}
            </div>
            <Card.Text>{meal.description}</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <div className="meal-price">${meal.price.toFixed(2)}</div>
              <StarRating
                value={ratings[meal.id] || 0}
                onChange={(value) => setRatings((prev) => ({ ...prev, [meal.id]: value }))}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default DailyMealPage;

import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import mealsData from "../data/mealsData";

const normalizeMealName = (value = "") => value.trim().toLowerCase();

function RecommendationPage() {
  const [form, setForm] = useState({ vegetarian: false, healthy: false, spicy: false });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      vegetarian: form.vegetarian ? 1 : 0,
      healthy: form.healthy ? 1 : 0,
      spicy: form.spicy ? 1 : 0
    };
    const res = await axios.post("/recommend", payload);
    setResults(res.data);
  };

  return (
    <div>
      <h2 className="page-title mb-3">Meal Recommendations</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Check type="checkbox" label="Vegetarian" name="vegetarian" checked={form.vegetarian} onChange={handleChange} />
        <Form.Check type="checkbox" label="Healthy" name="healthy" checked={form.healthy} onChange={handleChange} />
        <Form.Check type="checkbox" label="Spicy" name="spicy" checked={form.spicy} onChange={handleChange} />
        <Button type="submit" className="mt-3">Get Recommendations</Button>
      </Form>

      <Row className="g-3">
        {results.map((meal) => {
          const matchedMeal = mealsData.find(
            (item) => normalizeMealName(item.title) === normalizeMealName(meal.name)
          );

          return (
            <Col md={4} key={meal.name}>
              <Card className="h-100 shadow-sm meal-card">
                {matchedMeal?.image ? (
                  <Card.Img variant="top" src={matchedMeal.image} alt={meal.name} className="meal-image" />
                ) : null}
                <Card.Body>
                  <Card.Title>{meal.name}</Card.Title>
                  <Card.Text className="mb-1">Vegetarian: {meal.vegetarian ? "Yes" : "No"}</Card.Text>
                  <Card.Text className="mb-1">Healthy: {meal.healthy ? "Yes" : "No"}</Card.Text>
                  <Card.Text>Spicy: {meal.spicy ? "Yes" : "No"}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default RecommendationPage;

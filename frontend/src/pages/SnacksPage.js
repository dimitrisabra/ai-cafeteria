import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import candy from "../snacks/candy.png";
import chips from "../snacks/chips.png";
import chocolateBar from "../snacks/chocolate_bar.png";
import cookies from "../snacks/cookies.png";
import fruitChips from "../snacks/fruit_chips.png";
import granolaBar from "../snacks/granola_bar.png";
import nachos from "../snacks/nachos.png";
import popcorn from "../snacks/popcorn.png";
import pretzels from "../snacks/pretzels.png";
import trailMix from "../snacks/trail_mix.png";

const snacks = [
  { id: 1, title: "Candy", description: "Assorted sweet candies for a quick treat.", price: 1.8, image: candy },
  { id: 2, title: "Chips", description: "Crunchy potato chips with classic seasoning.", price: 1.95, image: chips },
  { id: 3, title: "Chocolate Bar", description: "Rich chocolate bar with a smooth texture.", price: 2.1, image: chocolateBar },
  { id: 4, title: "Cookies", description: "Fresh baked cookies with soft centers.", price: 2.25, image: cookies },
  { id: 5, title: "Fruit Chips", description: "Crispy fruit chips with natural sweetness.", price: 2.35, image: fruitChips },
  { id: 6, title: "Granola Bar", description: "Whole grain granola bar for a light snack.", price: 2.0, image: granolaBar },
  { id: 7, title: "Nachos", description: "Crispy nachos perfect for sharing.", price: 2.95, image: nachos },
  { id: 8, title: "Popcorn", description: "Fresh popcorn with a buttery flavor.", price: 2.2, image: popcorn },
  { id: 9, title: "Pretzels", description: "Baked pretzels with a savory bite.", price: 1.9, image: pretzels },
  { id: 10, title: "Trail Mix", description: "Nut and fruit trail mix for an energy boost.", price: 2.65, image: trailMix }
];

function SnacksPage() {
  return (
    <div>
      <h2 className="page-title mb-3">Snacks</h2>
      <Row className="g-4">
        {snacks.map((item) => (
          <Col md={6} lg={4} key={item.id}>
            <Card className="h-100 shadow-sm meal-card">
              <Card.Img variant="top" src={item.image} alt={item.title} className="meal-image" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <div className="mt-auto meal-price">${item.price.toFixed(2)}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SnacksPage;

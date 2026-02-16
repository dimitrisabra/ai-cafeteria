import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import appleJuice from "../beverage/apple_juice.png";
import coffee from "../beverage/coffee.png";
import coke from "../beverage/coke.png";
import greenTea from "../beverage/green_tea.png";
import icedTea from "../beverage/iced_tea.png";
import lemonade from "../beverage/lemonade.png";
import milkshake from "../beverage/milkshake.png";
import orangeJuice from "../beverage/orange_juice.png";
import pepsi from "../beverage/pepsi.png";
import water from "../beverage/water.png";

const beverages = [
  { id: 1, title: "Apple Juice", description: "Fresh and naturally sweet apple juice served chilled.", price: 2.5, image: appleJuice },
  { id: 2, title: "Coffee", description: "Hot brewed coffee with a rich and smooth flavor.", price: 2.75, image: coffee },
  { id: 3, title: "Coke", description: "Classic sparkling cola served cold.", price: 2.25, image: coke },
  { id: 4, title: "Green Tea", description: "Light and refreshing green tea with natural notes.", price: 2.4, image: greenTea },
  { id: 5, title: "Iced Tea", description: "Cold tea with a clean and refreshing taste.", price: 2.5, image: icedTea },
  { id: 6, title: "Lemonade", description: "Fresh lemonade with a tangy citrus twist.", price: 2.6, image: lemonade },
  { id: 7, title: "Milkshake", description: "Creamy milkshake blended to a smooth finish.", price: 3.75, image: milkshake },
  { id: 8, title: "Orange Juice", description: "Bright and fruity orange juice full of flavor.", price: 2.7, image: orangeJuice },
  { id: 9, title: "Pepsi", description: "Bold carbonated cola served ice-cold.", price: 2.25, image: pepsi },
  { id: 10, title: "Water", description: "Pure bottled water.", price: 1.25, image: water }
];

function BeveragesPage() {
  return (
    <div>
      <h2 className="page-title mb-3">Beverages</h2>
      <Row className="g-4">
        {beverages.map((item) => (
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

export default BeveragesPage;

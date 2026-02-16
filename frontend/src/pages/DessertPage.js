import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import applePie from "../dessert/apple_pie.png";
import brownie from "../dessert/brownie.png";
import cheesecake from "../dessert/cheesecake.png";
import chocolateCake from "../dessert/chocolate_cake.png";
import cupcake from "../dessert/cupcake.png";
import donut from "../dessert/donut.png";
import fruitSalad from "../dessert/fruit_salad.png";
import iceCream from "../dessert/ice_cream.png";
import pancake from "../dessert/pancake.png";
import waffle from "../dessert/waffle.png";

const desserts = [
  { id: 1, title: "Apple Pie", description: "Warm apple pie with a flaky golden crust.", price: 3.2, image: applePie },
  { id: 2, title: "Brownie", description: "Fudgy chocolate brownie with deep cocoa flavor.", price: 2.9, image: brownie },
  { id: 3, title: "Cheesecake", description: "Creamy cheesecake with a smooth texture.", price: 3.6, image: cheesecake },
  { id: 4, title: "Chocolate Cake", description: "Moist chocolate cake layered with rich icing.", price: 3.5, image: chocolateCake },
  { id: 5, title: "Cupcake", description: "Soft cupcake topped with sweet cream frosting.", price: 2.75, image: cupcake },
  { id: 6, title: "Donut", description: "Classic donut glazed with a sweet finish.", price: 2.35, image: donut },
  { id: 7, title: "Fruit Salad", description: "Fresh seasonal fruit mix served chilled.", price: 3.0, image: fruitSalad },
  { id: 8, title: "Ice Cream", description: "Creamy ice cream scoop with smooth texture.", price: 2.95, image: iceCream },
  { id: 9, title: "Pancake", description: "Fluffy pancake stack with syrup.", price: 3.25, image: pancake },
  { id: 10, title: "Waffle", description: "Crisp waffle served warm with sweet toppings.", price: 3.4, image: waffle }
];

function DessertPage() {
  return (
    <div>
      <h2 className="page-title mb-3">Dessert</h2>
      <Row className="g-4">
        {desserts.map((item) => (
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

export default DessertPage;

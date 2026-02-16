import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Form } from "react-bootstrap";

function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setStatus({ type: "danger", text: "Please fill name and message." });
      return;
    }

    try {
      setSending(true);
      setStatus({ type: "", text: "" });
      await axios.post("/contact", { name: name.trim(), message: message.trim() });
      setStatus({ type: "success", text: "Email sent successfully." });
      setMessage("");
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Failed to send email.";
      setStatus({ type: "danger", text: errorMessage });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h2 className="page-title mb-3">Contact Us</h2>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="contactName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message"
              />
            </Form.Group>

            <Button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Email"}
            </Button>
          </Form>

          {status.text ? <Alert variant={status.type} className="mt-3 mb-0">{status.text}</Alert> : null}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ContactPage;

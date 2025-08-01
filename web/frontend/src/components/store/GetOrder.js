import React, { useState } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const GetOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrder = async (e) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await axios.get(`/api/store/order/${orderId}`);
      setOrder(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form onSubmit={fetchOrder}>
          <Form.Group className="mb-3">
            <Form.Label>Order ID:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Fetching...' : 'Get Order'}
          </Button>
        </Form>
      </div>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {order && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Order Details</Card.Title>
            <Card.Text>Order ID: {order.id}</Card.Text>
            <Card.Text>Pet ID: {order.petId}</Card.Text>
            <Card.Text>Quantity: {order.quantity}</Card.Text>
            <Card.Text>Ship Date: {order.shipDate}</Card.Text>
            <Card.Text>Status: {order.status}</Card.Text>
            <Card.Text>Complete: {order.complete ? 'Yes' : 'No'}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default GetOrder;
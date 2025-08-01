import React, { useState } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    petId: '',
    quantity: 1,
    status: 'placed',
    complete: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [order, setOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setOrder(null);

    try {
      // Prepare the order object
      const orderData = {
        petId: parseInt(formData.petId),
        quantity: parseInt(formData.quantity),
        status: formData.status,
        complete: formData.complete
      };

      const response = await axios.post('/api/store/order', orderData);
      setSuccess('Order placed successfully');
      setOrder(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Pet ID:</Form.Label>
            <Form.Control
              type="number"
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status:</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="placed">Placed</option>
              <option value="approved">Approved</option>
              <option value="delivered">Delivered</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Complete"
              name="complete"
              checked={formData.complete}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
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
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}

      {order && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Order Placed</Card.Title>
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

export default PlaceOrder;
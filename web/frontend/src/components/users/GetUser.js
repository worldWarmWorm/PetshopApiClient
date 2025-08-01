import React, { useState } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const GetUser = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const response = await axios.get(`/api/user/${username}`);
      setUser(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form onSubmit={fetchUser}>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch User'}
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

      {user && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
            <Card.Text>Email: {user.email}</Card.Text>
            <Card.Text>Phone: {user.phone}</Card.Text>
            <Card.Text>User Status: {user.userStatus}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default GetUser;
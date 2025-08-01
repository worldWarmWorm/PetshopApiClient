import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const DeleteUser = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(`/api/user/${username}`);
      setSuccess('User deleted successfully');
      setUsername('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form onSubmit={handleDelete}>
          <Form.Group className="mb-3">
            <Form.Label>Username to delete:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="danger" type="submit" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete User'}
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
    </div>
  );
};

export default DeleteUser;
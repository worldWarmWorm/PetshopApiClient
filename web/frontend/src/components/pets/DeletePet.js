import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const DeletePet = () => {
  const [petId, setPetId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!petId.trim()) {
      setError('Please enter a pet ID');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(`/api/pet/${petId}`);
      setSuccess('Pet deleted successfully');
      setPetId('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form onSubmit={handleDelete}>
          <Form.Group className="mb-3">
            <Form.Label>Pet ID to delete:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter pet ID"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="danger" type="submit" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Pet'}
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

export default DeletePet;
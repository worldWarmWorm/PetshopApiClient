import React, { useState } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const GetPetById = () => {
  const [petId, setPetId] = useState('');
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPet = async () => {
    if (!petId.trim()) {
      setError('Please enter a pet ID');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/pet/${petId}`);
      setPet(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch pet');
      setPet(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Pet ID:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter pet ID"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={fetchPet}>
            Get Pet
          </Button>
        </Form>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {pet && (
        <Card>
          <Card.Body>
            <Card.Title>{pet.name || 'No Name'}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">ID: {pet.id}</Card.Subtitle>
            <Card.Text>Status: {pet.status}</Card.Text>
            <Card.Text>Category: {pet.category ? pet.category.name : 'None'}</Card.Text>
            {pet.tags && pet.tags.length > 0 && (
              <div>
                <Card.Text>Tags:</Card.Text>
                <ul>
                  {pet.tags.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {pet.photoUrls && pet.photoUrls.length > 0 && (
              <div>
                <Card.Text>Photos:</Card.Text>
                <ul>
                  {pet.photoUrls.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default GetPetById;
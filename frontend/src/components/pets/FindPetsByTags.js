import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const FindPetsByTags = () => {
  const [tags, setTags] = useState('');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/pet/findByTags?tags=${tags}`);
      setPets(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch pets by tags');
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tags (comma separated):</Form.Label>
            <Form.Control
              type="text"
              placeholder="tag1,tag2,tag3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={fetchPets}>
            Find Pets
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

      {!loading && !error && pets.length === 0 && (
        <Alert variant="info">No pets found with these tags.</Alert>
      )}

      <Row>
        {pets.map((pet) => (
          <Col md={4} key={pet.id} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{pet.name || 'No Name'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ID: {pet.id}</Card.Subtitle>
                <Card.Text>Status: {pet.status}</Card.Text>
                <Card.Text>Category: {pet.category ? pet.category.name : 'None'}</Card.Text>
                {pet.tags && pet.tags.length > 0 && (
                  <div>
                    <small className="text-muted">Tags:</small>
                    <ul className="list-unstyled">
                      {pet.tags.map((tag) => (
                        <li key={tag.id}>{tag.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FindPetsByTags;
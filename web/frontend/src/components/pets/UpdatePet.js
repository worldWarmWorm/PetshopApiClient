import React, { useState } from 'react';
import { Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const UpdatePet = () => {
  const [petId, setPetId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    status: 'available',
    categoryName: '',
    photoUrls: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchPet = async () => {
    if (!petId.trim()) {
      setError('Please enter a pet ID');
      return;
    }

    setFetchLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/pet/${petId}`);
      const pet = response.data;
      
      setFormData({
        name: pet.name || '',
        status: pet.status || 'available',
        categoryName: pet.category ? pet.category.name : '',
        photoUrls: pet.photoUrls ? pet.photoUrls.join(', ') : '',
        tags: pet.tags ? pet.tags.map(tag => tag.name).join(', ') : ''
      });
      
      setShowForm(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch pet for update');
      setShowForm(false);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare the pet object
      const pet = {
        id: parseInt(petId),
        name: formData.name,
        status: formData.status,
        photoUrls: formData.photoUrls ? formData.photoUrls.split(',').map(url => url.trim()) : [''],
        category: formData.categoryName ? { name: formData.categoryName } : null,
        tags: formData.tags 
          ? formData.tags.split(',').map(tag => ({ name: tag.trim() })) 
          : []
      };

      const response = await axios.put('/api/pet', pet);
      setSuccess(`Pet "${response.data.name}" updated successfully`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form.Group className="mb-3">
          <Form.Label>Pet ID to update:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
              placeholder="Enter pet ID"
              required
            />
            <Button 
              variant="outline-secondary" 
              onClick={fetchPet}
              disabled={fetchLoading}
            >
              {fetchLoading ? 'Fetching...' : 'Fetch'}
            </Button>
          </InputGroup>
        </Form.Group>

        {fetchLoading && (
          <div className="text-center mt-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {showForm && (
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Photo URLs (comma separated):</Form.Label>
              <Form.Control
                type="text"
                name="photoUrls"
                value={formData.photoUrls}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags (comma separated names):</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="warning" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Pet'}
            </Button>
          </Form>
        )}
      </div>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </div>
  );
};

export default UpdatePet;
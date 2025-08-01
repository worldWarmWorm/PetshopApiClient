import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'available',
    categoryName: '',
    photoUrls: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare the pet object
      const pet = {
        name: formData.name,
        status: formData.status,
        photoUrls: formData.photoUrls ? formData.photoUrls.split(',').map(url => url.trim()) : [''],
        category: formData.categoryName ? { name: formData.categoryName } : null,
        tags: formData.tags 
          ? formData.tags.split(',').map(tag => ({ name: tag.trim() })) 
          : []
      };

      const response = await axios.post('/api/pet', pet);
      setSuccess(`Pet "${response.data.name}" added successfully with ID: ${response.data.id}`);
      
      // Reset form
      setFormData({
        name: '',
        status: 'available',
        categoryName: '',
        photoUrls: '',
        tags: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form onSubmit={handleSubmit}>
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

          <Button variant="success" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Pet'}
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

export default AddPet;
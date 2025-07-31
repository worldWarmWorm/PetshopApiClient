import React, { useState } from 'react';
import { Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const UpdateUser = () => {
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    userStatus: 0
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };

  const fetchUser = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setFetchLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/user/${username}`);
      const user = response.data;
      
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        phone: user.phone || '',
        userStatus: user.userStatus || 0
      });
      
      setShowForm(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch user for update');
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
      // Prepare the user object
      const userData = {
        username: username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        userStatus: formData.userStatus
      };
      
      // Add password only if provided
      if (formData.password) {
        userData.password = formData.password;
      }

      await axios.put(`/api/user/${username}`, userData);
      setSuccess('User updated successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <Form.Group className="mb-3">
          <Form.Label>Username to update:</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <Button 
              variant="outline-secondary" 
              onClick={fetchUser}
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
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User Status:</Form.Label>
              <Form.Control
                type="number"
                name="userStatus"
                value={formData.userStatus}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="warning" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update User'}
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

export default UpdateUser;
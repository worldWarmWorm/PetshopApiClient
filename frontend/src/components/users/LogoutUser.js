import React, { useState } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const LogoutUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.get('/api/user/logout');
      setSuccess(response.data.message || 'Logout successful');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-section">
        <p>Click the button below to log out the current user session.</p>
        <Button 
          variant="primary" 
          onClick={handleLogout} 
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </Button>
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

export default LogoutUser;
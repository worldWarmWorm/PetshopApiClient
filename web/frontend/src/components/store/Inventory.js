import React, { useState } from 'react';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Inventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/store/inventory');
      setInventory(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch inventory');
      setInventory({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="primary" className="mb-3" onClick={fetchInventory} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Inventory'}
      </Button>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && Object.keys(inventory).length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(inventory).map(([status, count]) => (
              <tr key={status}>
                <td>{status}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!loading && !error && Object.keys(inventory).length === 0 && (
        <Alert variant="info">No inventory data available.</Alert>
      )}
    </div>
  );
};

export default Inventory;
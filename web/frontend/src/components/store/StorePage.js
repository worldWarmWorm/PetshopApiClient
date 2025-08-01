import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Inventory from './Inventory';
import PlaceOrder from './PlaceOrder';
import GetOrder from './GetOrder';
import DeleteOrder from './DeleteOrder';

const StorePage = () => {
  const [key, setKey] = useState('inventory');

  return (
    <div className="section">
      <h2>Store</h2>
      <Tabs
        id="store-operations"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="inventory" title="Inventory">
          <Inventory />
        </Tab>
        <Tab eventKey="placeOrder" title="Place Order">
          <PlaceOrder />
        </Tab>
        <Tab eventKey="getOrder" title="Get Order">
          <GetOrder />
        </Tab>
        <Tab eventKey="deleteOrder" title="Delete Order">
          <DeleteOrder />
        </Tab>
      </Tabs>
    </div>
  );
};

export default StorePage;
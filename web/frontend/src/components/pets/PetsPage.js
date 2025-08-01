import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import FindPetsByStatus from './FindPetsByStatus';
import FindPetsByTags from './FindPetsByTags';
import GetPetById from './GetPetById';
import AddPet from './AddPet';
import UpdatePet from './UpdatePet';
import DeletePet from './DeletePet';

const PetsPage = () => {
  const [key, setKey] = useState('findByStatus');

  return (
    <div className="section">
      <h2>Pets</h2>
      <Tabs
        id="pet-operations"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="findByStatus" title="Find by Status">
          <FindPetsByStatus />
        </Tab>
        <Tab eventKey="findByTags" title="Find by Tags">
          <FindPetsByTags />
        </Tab>
        <Tab eventKey="getById" title="Get Pet">
          <GetPetById />
        </Tab>
        <Tab eventKey="addPet" title="Add Pet">
          <AddPet />
        </Tab>
        <Tab eventKey="updatePet" title="Update Pet">
          <UpdatePet />
        </Tab>
        <Tab eventKey="deletePet" title="Delete Pet">
          <DeletePet />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PetsPage;
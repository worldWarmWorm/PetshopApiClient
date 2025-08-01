import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import PetsPage from './components/pets/PetsPage';
import StorePage from './components/store/StorePage';
import UsersPage from './components/users/UsersPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<PetsPage />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
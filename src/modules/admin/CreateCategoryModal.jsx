import React, { useState } from 'react';
import axios from 'axios';
import './../../assets/Components/admin/CreateCategoryModal.scss';

const CreateCategoryModal = ({ onClose, onCategoryCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6868/toystore/categories', {
        name,
        description,
      });
      onCategoryCreated(response.data.category);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear la categoría');
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <h2>Crear Categoría</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="submit-button">Crear</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
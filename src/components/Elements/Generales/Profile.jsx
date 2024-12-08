import React, { useState, useEffect } from 'react';
import './../../../assets/Components/general/Modal.scss';
import { useCustomAlert } from './CustomAlert';
import axios from 'axios';

const Profile = ({ onClose, userId }) => {
  const { alert, showAlert } = useCustomAlert();

  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    phone_number: '',
    password: '',
  });

  const [isEditable, setIsEditable] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false); 

  useEffect(() => {
    if (!isDataFetched) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:6868/toystore/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
              },
            }
          );
          setUserData({
            name: response.data.name || '',
            last_name: response.data.last_name || '',
            phone_number: response.data.phone_number || '',
            password: '', 
          });
          setIsDataFetched(true); 
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          showAlert('Error al cargar los datos del usuario', 'error');
        }
      };

      fetchUserData();
    }
  }, [userId, showAlert, isDataFetched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:6868/toystore/users/${userId}`,
        { ...userData, password: userData.password || undefined },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          },
        }
      );
      showAlert({
        title: "Actualización completada",
        text: "Se ha actualizado correctamente la información del usuario.",
        icon: "success",
    });      setIsEditable(false);
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Ocurrio un error, no se logro actualizar la información del usuario.",
        icon: "error",
    });    }
  };

  return (
    <div
      className="modal-container"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <h2 id="modal-title">Configuración del perfil</h2>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Apellido:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Número de teléfono:</label>
              <input
                type="number"
                id="phone_number"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="modal-buttons">
              {!isEditable ? (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleEdit}
                >
                  Editar
                </button>
              ) : (
                <button
                  type="button"
                  className="save-button"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {alert}
    </div>
  );
};

export default Profile;

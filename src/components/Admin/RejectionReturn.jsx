import React, { useState } from "react";
import axios from "axios";
import { useCustomAlert } from "../Elements/Generales/CustomAlert";
import "./../../assets/Components/admin/CardReturn.scss";

const RejectionReturn = ({ onClose, returnId, userId }) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert } = useCustomAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rejectionReason) {
      await showAlert({
        title: "Motivo requerido",
        text: "Por favor, escribe un motivo para rechazar la devolución.",
        icon: "warning",
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios.put(`http://localhost:6868/toystore/returns/${returnId}`, {
        status: "rechazada",
        rejection_reason: rejectionReason,
        user_id: userId,
      });

      await showAlert({
        title: "Devolución rechazada",
        text: "La devolución ha sido rechazada exitosamente.",
        icon: "success",
      });
      onClose();
    } catch (error) {
      console.error("Error al rechazar la devolución:", error);
      await showAlert({
        title: "Error",
        text: "No se pudo rechazar la devolución.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <h2>Rechazar devolución</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rejectionReason">Motivo del rechazo:</label>
              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows="4"
              />
            </div>
            <div className="modal-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button type="submit" className="save-button" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Rechazar"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {alert}
    </div>
  );
};

export default RejectionReturn;

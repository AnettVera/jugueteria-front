import ReactDOM from "react-dom";
import Alerts from "../../components/Elements/Generales/Alerts";

export const customAlert = ({ message, type = "info", duration = 3000 }) => {
  const alertContainer = document.createElement("div");
  document.body.appendChild(alertContainer);

  const closeAlert = () => {
    ReactDOM.unmountComponentAtNode(alertContainer);
    document.body.removeChild(alertContainer);
  };

  ReactDOM.render(
    <Alerts message={message} type={type} onClose={closeAlert} />,
    alertContainer
  );

  setTimeout(closeAlert, duration);
};

export const confirmAlert = ({ message, onConfirm, onCancel }) => {
  const alertContainer = document.createElement("div");
  document.body.appendChild(alertContainer);

  const handleConfirm = () => {
    onConfirm && onConfirm();
    closeAlert();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    closeAlert();
  };

  const closeAlert = () => {
    ReactDOM.unmountComponentAtNode(alertContainer);
    document.body.removeChild(alertContainer);
  };

  ReactDOM.render(
    <div className="modal-container">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleConfirm}>Aceptar</button>
          <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>,
    alertContainer
  );
};

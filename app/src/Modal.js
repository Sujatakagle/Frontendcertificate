// Modal.js
import React from 'react';
import './Modal.css'; // Add styles for the modal

const Modal = ({ isOpen, onClose, certificate }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Certificate Details</h2>
        <p><strong>Name:</strong> {certificate.name}</p>
        <p><strong>College Name:</strong> {certificate.collegename}</p>
        <p><strong>City:</strong> {certificate.city}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

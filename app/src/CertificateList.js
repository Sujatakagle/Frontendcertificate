import React, { useEffect, useState } from 'react';
import CertificateForm from './CertificateForm'; // Adjust import path if needed
import Modal from './Modal'

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/certificates');
        if (response.ok) {
          const data = await response.json();
          setCertificates(data);
        } else {
          console.error('Error fetching data');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCertificates();
  }, []);

  const handleNewCertificate = (newCertificate) => {
    setCertificates((prevCertificates) => [...prevCertificates, newCertificate]);
  };

  const handleViewClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <div>
      <CertificateForm onFormSubmit={handleNewCertificate} />
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>College Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td>{certificate.name}</td>
              <td>{certificate.collegename}</td>
              <td>{certificate.city}</td>
              <td>
                <button onClick={() => handleViewClick(certificate)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCertificate && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          certificate={selectedCertificate}
        />
      )}
    </div>
  );
};

export default CertificateList;

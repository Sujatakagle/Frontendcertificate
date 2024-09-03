import React, { useState } from 'react';

const CertificateForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({ name: '', collegename: '', city: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCertificate = await response.json();
        onFormSubmit(newCertificate); // Pass the new data to the parent component
        setFormData({ name: '', collegename: '', city: '' }); // Clear the form
        alert('Data submitted successfully!');
      } else {
        alert('Error submitting data');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="collegename">College Name:</label>
        <input
          type="text"
          id="collegename"
          name="collegename"
          value={formData.collegename}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CertificateForm;

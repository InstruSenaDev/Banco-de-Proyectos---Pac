// SendEmailForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SendEmailForm = () => {
  const [emailData, setEmailData] = useState({
    recipient: '',
    subject: '',
    message: '',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSendEmail = async () => {
    if (!emailData.recipient || !emailData.subject || !emailData.message || !pdfFile) {
      setError('Todos los campos son necesarios y debe adjuntar un archivo PDF.');
      return;
    }

    setSending(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('recipient', emailData.recipient);
    formData.append('subject', emailData.subject);
    formData.append('message', emailData.message);
    formData.append('pdf', pdfFile);

    try {
      const response = await axios.post('http://localhost:4000/api/send-email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Correo enviado exitosamente.');
    } catch (err) {
      setError('Error al enviar el correo: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enviar Reporte por Correo</h1>
      <form className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label htmlFor="recipient" className="font-semibold">Correo del destinatario:</label>
          <input
            type="email"
            id="recipient"
            name="recipient"
            value={emailData.recipient}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subject" className="font-semibold">Asunto:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="font-semibold">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={emailData.message}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pdf" className="font-semibold">Adjuntar PDF:</label>
          <input
            type="file"
            id="pdf"
            accept=".pdf"
            onChange={handleFileChange}
            className="border p-2"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleSendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={sending}
          >
            {sending ? 'Enviando...' : 'Enviar Correo'}
          </button>
        </div>
        {success && <p className="text-green-500 mt-2">{success}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SendEmailForm;

// ReportForm.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';

const ReportForm = () => {
  const [report, setReport] = useState({
    title: '',
    description: '',
    projectStatus: '',
    tasksCompleted: '',
    tasksPending: '',
    observations: '',
    conclusions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Add Company Logo or Name
    const img = new Image();
    img.src = '/Img/Logo.png'; // Path to the image in the public folder

    

    // Wait for image to load
    img.onload = () => {

        const imgSize = 20; // Size of the image in mm
        const x = (doc.internal.pageSize.width - imgSize) / 2; // Center horizontally
        const y = 20; // Y position from the top of the page
      doc.setFontSize(24);
      doc.setTextColor(0, 102, 204);
      doc.text('Company Name', 20, 20);

      // Add Image
      doc.addImage(img, 'PNG', 20, 30, 50, 50); // Adjust x, y, width, height as needed

      // Add Title
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text('Reporte de Avance de Proyecto', 20, 100);

      // Add Report Details
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Título: ${report.title}`, 20, 120);
      doc.text(`Descripción: ${report.description}`, 20, 130);
      doc.text(`Estado del Proyecto: ${report.projectStatus}`, 20, 140);
      doc.text(`Tareas Completadas: ${report.tasksCompleted}`, 20, 150);
      doc.text(`Tareas Pendientes: ${report.tasksPending}`, 20, 160);
      doc.text(`Observaciones: ${report.observations}`, 20, 170);
      doc.text(`Conclusiones: ${report.conclusions}`, 20, 180);

      // Add Footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Generado por Company Name', 20, 290);
      doc.text('www.companywebsite.com', 20, 295);

      doc.save('report.pdf');
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulario de Reporte</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={report.title}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={report.description}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="projectStatus" className="font-semibold">Estado del Proyecto:</label>
          <input
            type="text"
            id="projectStatus"
            name="projectStatus"
            value={report.projectStatus}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tasksCompleted" className="font-semibold">Tareas Completadas:</label>
          <textarea
            id="tasksCompleted"
            name="tasksCompleted"
            value={report.tasksCompleted}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tasksPending" className="font-semibold">Tareas Pendientes:</label>
          <textarea
            id="tasksPending"
            name="tasksPending"
            value={report.tasksPending}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="observations" className="font-semibold">Observaciones:</label>
          <textarea
            id="observations"
            name="observations"
            value={report.observations}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="conclusions" className="font-semibold">Conclusiones:</label>
          <textarea
            id="conclusions"
            name="conclusions"
            value={report.conclusions}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex justify-between col-span-2 mt-4">
          <button
            type="button"
            onClick={generatePDF}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generar PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;

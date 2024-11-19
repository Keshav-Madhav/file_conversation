// PreviewPdf.tsx
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

interface PreviewPdfProps {
  pdfPath: string;
}

const PreviewPdf: React.FC<PreviewPdfProps> = () => {
  return (
    <div>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl="C:/Users/kartik/Downloads/Untitled document (3).pdf" />
      </Worker>
    </div>
  );
};

export default PreviewPdf;

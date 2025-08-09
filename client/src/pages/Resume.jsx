import React, { useEffect, useState } from 'react';
import ResumeTemplate1 from '../components/ResumeTemplates/Template1';
import ResumeTemplate2 from '../components/ResumeTemplates/Template2';
import ResumeTemplate3 from '../components/ResumeTemplates/Template3';
import ResumeTemplate4 from '../components/ResumeTemplates/Template4';
import { useParams } from 'react-router-dom';

export default function Resume() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const { template } = useParams();

  useEffect(() => {
    if (template) {
      // Extract the template number from the URL
      const templateNumber = parseInt(template.split('=')[1]);
      setSelectedTemplate(templateNumber);
    }
  }, [template]);

  return (
    <>
      {selectedTemplate === 1 ? (
        <ResumeTemplate1 />
      ) : (
        <ResumeTemplate2 />
      ) || selectedTemplate === 2 ? (
        <ResumeTemplate2 />
      ) : (
        selectedTemplate === 3 ? (
          <ResumeTemplate3 />
        ) : (
          <ResumeTemplate4 />
        )
      )}
    </>
  );
}

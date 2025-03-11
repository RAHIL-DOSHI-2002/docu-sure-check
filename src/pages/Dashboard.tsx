
import { useEffect } from 'react';
import { DocumentProvider } from '@/contexts/DocumentContext';
import Navbar from '@/components/Navbar';
import FileUpload from '@/components/FileUpload';
import VerificationResult from '@/components/VerificationResult';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Document Verification - DocuSureCheck';
  }, []);
  
  return (
    <DocumentProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Document Verification Dashboard
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FileUpload />
            <VerificationResult />
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">How Our Verification Works</h2>
            <p className="text-gray-600 mb-4">
              Our document verification system uses advanced algorithms to analyze various aspects of your uploaded documents:
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-doc-blue mr-2">•</span>
                <span><strong>Digital Signatures:</strong> We verify if digital signatures are valid and from trusted authorities.</span>
              </li>
              <li className="flex items-start">
                <span className="text-doc-blue mr-2">•</span>
                <span><strong>Content Analysis:</strong> We check for inconsistencies in text, fonts, and formatting.</span>
              </li>
              <li className="flex items-start">
                <span className="text-doc-blue mr-2">•</span>
                <span><strong>Metadata Verification:</strong> We examine hidden metadata for signs of tampering.</span>
              </li>
              <li className="flex items-start">
                <span className="text-doc-blue mr-2">•</span>
                <span><strong>Pattern Recognition:</strong> Our AI detects abnormal patterns that may indicate forgery.</span>
              </li>
            </ul>
          </div>
        </main>
        
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2023 DocuSureCheck. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </DocumentProvider>
  );
};

export default Dashboard;

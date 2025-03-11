
import { useEffect } from 'react';
import { DocumentProvider, useDocumentContext } from '@/contexts/DocumentContext';
import Navbar from '@/components/Navbar';
import DocumentList from '@/components/DocumentList';

const HistoryContent = () => {
  const { documents } = useDocumentContext();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Verification History
        </h1>
        <p className="text-center text-gray-600 mb-8">
          View your past document verifications and their results
        </p>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Documents</h2>
              <span className="text-sm text-gray-500">
                {documents.length} {documents.length === 1 ? 'document' : 'documents'}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <DocumentList />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 DocuSureCheck. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const History = () => {
  useEffect(() => {
    document.title = 'Verification History - DocuSureCheck';
  }, []);
  
  return (
    <DocumentProvider>
      <HistoryContent />
    </DocumentProvider>
  );
};

export default History;


import React, { createContext, useState, useContext, ReactNode } from 'react';

export type VerificationStatus = 'pending' | 'processing' | 'authentic' | 'forged';

export interface DocumentRecord {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  status: VerificationStatus;
  confidenceScore?: number;
}

interface DocumentContextType {
  documents: DocumentRecord[];
  addDocument: (file: File) => Promise<void>;
  currentDocument: DocumentRecord | null;
  setCurrentDocument: (doc: DocumentRecord | null) => void;
  isProcessing: boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [currentDocument, setCurrentDocument] = useState<DocumentRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate document verification process
  const verifyDocument = async (file: File): Promise<VerificationStatus> => {
    // This is a simulation - in a real app, this would call an API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly decide if document is authentic or forged for demo purposes
        const result = Math.random() > 0.5 ? 'authentic' : 'forged';
        resolve(result as VerificationStatus);
      }, 3000); // Simulate a 3-second processing time
    });
  };

  const addDocument = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Create a new document record
      const newDoc: DocumentRecord = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        uploadedAt: new Date(),
        status: 'processing',
      };
      
      setCurrentDocument(newDoc);
      setDocuments(prev => [newDoc, ...prev]);
      
      // Process the document
      const status = await verifyDocument(file);
      const confidenceScore = Math.round(Math.random() * 30 + 70); // Random score between 70-100
      
      // Update the document with verification results
      const updatedDoc = { ...newDoc, status, confidenceScore };
      setCurrentDocument(updatedDoc);
      setDocuments(prev => 
        prev.map(doc => doc.id === newDoc.id ? updatedDoc : doc)
      );
    } catch (error) {
      console.error("Error processing document:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        addDocument,
        currentDocument,
        setCurrentDocument,
        isProcessing
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

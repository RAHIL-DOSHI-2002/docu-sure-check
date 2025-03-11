
import { Check, X, AlertTriangle, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DocumentRecord, 
  VerificationStatus, 
  useDocumentContext 
} from '@/contexts/DocumentContext';
import { Progress } from '@/components/ui/progress';

const statusConfig: Record<VerificationStatus, {
  icon: React.ReactNode,
  title: string,
  description: string,
  color: string
}> = {
  pending: {
    icon: <Clock className="h-10 w-10 text-gray-500" />,
    title: 'Awaiting Upload',
    description: 'Upload a document to begin verification',
    color: 'bg-gray-200'
  },
  processing: {
    icon: <Shield className="h-10 w-10 text-blue-500 animate-pulse-opacity" />,
    title: 'Processing Document',
    description: 'Analyzing document authenticity...',
    color: 'bg-blue-500'
  },
  authentic: {
    icon: <Check className="h-10 w-10 text-doc-green" />,
    title: 'Document Authentic',
    description: 'This document appears to be genuine',
    color: 'bg-doc-green'
  },
  forged: {
    icon: <X className="h-10 w-10 text-doc-red" />,
    title: 'Potential Forgery Detected',
    description: 'This document shows signs of tampering or manipulation',
    color: 'bg-doc-red'
  }
};

const VerificationResult = () => {
  const { currentDocument, isProcessing } = useDocumentContext();
  
  // Default to pending status if no document
  const document: DocumentRecord = currentDocument || {
    id: 'pending',
    name: '',
    size: 0,
    uploadedAt: new Date(),
    status: 'pending'
  };
  
  const { icon, title, description, color } = statusConfig[document.status];
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-4 rounded-full ${document.status === 'processing' ? 'bg-blue-100' : document.status === 'authentic' ? 'bg-green-100' : document.status === 'forged' ? 'bg-red-100' : 'bg-gray-100'}`}>
            {icon}
          </div>
          
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
          
          {document.status === 'processing' && (
            <div className="w-full mt-4">
              <Progress className="h-2" value={45} />
              <p className="text-sm text-gray-500 mt-2">Analyzing document...</p>
            </div>
          )}
          
          {(document.status === 'authentic' || document.status === 'forged') && document.confidenceScore && (
            <div className="w-full mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Confidence Score</span>
                <span className="font-medium">{document.confidenceScore}%</span>
              </div>
              <Progress 
                className={`h-2 ${document.status === 'authentic' ? 'bg-doc-green' : 'bg-doc-red'}`} 
                value={document.confidenceScore} 
              />
            </div>
          )}
          
          {document.status === 'forged' && (
            <div className="flex items-center mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="h-5 w-5 text-doc-red mr-2 flex-shrink-0" />
              <p className="text-sm text-red-800">
                We recommend further verification before accepting this document.
              </p>
            </div>
          )}
          
          {document.name && (
            <div className="w-full border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">File name:</span> {document.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Uploaded:</span> {document.uploadedAt.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationResult;

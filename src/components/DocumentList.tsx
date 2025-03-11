
import { FileText, Check, X, Clock } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DocumentRecord, 
  VerificationStatus, 
  useDocumentContext 
} from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const statusConfig: Record<VerificationStatus, {
  icon: React.ReactNode,
  label: string,
  color: string
}> = {
  pending: {
    icon: <Clock className="h-4 w-4" />,
    label: 'Pending',
    color: 'bg-gray-200 text-gray-800 hover:bg-gray-200'
  },
  processing: {
    icon: <Clock className="h-4 w-4" />,
    label: 'Processing',
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
  },
  authentic: {
    icon: <Check className="h-4 w-4" />,
    label: 'Authentic',
    color: 'bg-green-100 text-green-800 hover:bg-green-100'
  },
  forged: {
    icon: <X className="h-4 w-4" />,
    label: 'Forged',
    color: 'bg-red-100 text-red-800 hover:bg-red-100'
  }
};

const DocumentList = () => {
  const { documents, setCurrentDocument } = useDocumentContext();
  const navigate = useNavigate();
  
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No documents yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload a document to verify its authenticity.
        </p>
        <Button 
          onClick={() => navigate('/dashboard')} 
          className="mt-4 bg-doc-blue hover:bg-doc-blue/90"
        >
          Verify a Document
        </Button>
      </div>
    );
  }
  
  const handleViewDetails = (document: DocumentRecord) => {
    setCurrentDocument(document);
    navigate('/dashboard');
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => {
            const { icon, label, color } = statusConfig[doc.status];
            
            return (
              <TableRow key={doc.id}>
                <TableCell className="font-medium flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="truncate max-w-[150px] sm:max-w-xs">{doc.name}</span>
                </TableCell>
                <TableCell>{doc.uploadedAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={`flex items-center space-x-1 ${color}`}>
                    {icon}
                    <span>{label}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  {doc.confidenceScore ? `${doc.confidenceScore}%` : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewDetails(doc)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;

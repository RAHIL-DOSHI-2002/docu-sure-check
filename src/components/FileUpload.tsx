
import { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDocumentContext } from '@/contexts/DocumentContext';

const FileUpload = () => {
  const { addDocument, isProcessing } = useDocumentContext();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    
    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      await addDocument(selectedFile);
      toast.success('Document uploaded successfully');
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Failed to upload document');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Upload Document for Verification</h2>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? 'border-doc-blue bg-blue-50' : 'border-gray-300'
          } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-doc-blue mr-3" />
                  <div className="text-left">
                    <p className="font-medium truncate max-w-[180px] sm:max-w-xs">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-gray-400 mb-3" />
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={handleChange}
            disabled={isProcessing}
          />
        </div>
        
        <div className="flex justify-center">
          {selectedFile ? (
            <Button 
              className="bg-doc-blue hover:bg-doc-blue/90"
              onClick={handleUpload}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Verify Document'}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleButtonClick}
              disabled={isProcessing}
            >
              Select PDF File
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;

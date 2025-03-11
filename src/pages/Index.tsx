
import { Button } from '@/components/ui/button';
import { FileCheck, Shield, FileText, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Secure Document Verification & Forgery Detection
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Our advanced AI technology analyzes your documents for authenticity,
              helping you identify forgeries and protect against fraud.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-doc-blue hover:bg-doc-blue/90 text-white px-8 py-6 text-lg rounded-md"
            >
              Verify A Document
            </Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-doc-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Upload Document</h3>
                <p className="text-gray-600">
                  Securely upload your PDF document for analysis. Your privacy is guaranteed.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-doc-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced algorithms analyze multiple aspects of your document for authenticity.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8 text-doc-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
                <p className="text-gray-600">
                  Get detailed verification results within seconds with a confidence score.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Trusted Security For Your Documents</h2>
                <p className="text-gray-600 mb-6">
                  Our document verification technology uses advanced pattern recognition and machine learning to identify signs of document tampering or forgery.
                </p>
                <ul className="space-y-4">
                  {[
                    "Detect alterations in official documents",
                    "Verify authenticity of legal paperwork",
                    "Identify suspicious patterns in financial documents",
                    "Secure your verification process"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 text-doc-green">
                        <Check className="h-5 w-5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <div className="aspect-video bg-blue-100 rounded-md flex items-center justify-center">
                  <Lock className="h-20 w-20 text-doc-blue opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-doc-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Verify Your Documents?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Start using our document verification system today to protect yourself and your organization from fraud.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline" 
              className="bg-white text-doc-blue hover:bg-gray-100 border-white"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 DocuSureCheck. All rights reserved.</p>
          <p className="text-sm mt-2">
            This is a demonstration app for document verification.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

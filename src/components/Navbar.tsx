
import { Link, useLocation } from 'react-router-dom';
import { FileText, History, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-doc-blue" />
              <span className="ml-2 text-xl font-bold text-doc-blue">DocuSureCheck</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? "default" : "ghost"} 
                className={isActive('/dashboard') ? "bg-doc-blue hover:bg-doc-blue/90" : ""}
              >
                <FileText className="mr-2 h-4 w-4" />
                Verify Documents
              </Button>
            </Link>
            <Link to="/history">
              <Button 
                variant={isActive('/history') ? "default" : "ghost"}
                className={isActive('/history') ? "bg-doc-blue hover:bg-doc-blue/90" : ""}
              >
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

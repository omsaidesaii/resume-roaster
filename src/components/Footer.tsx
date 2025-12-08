import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Resume<span className="text-orange-500">Roaster</span></h3>
            <p className="text-gray-500 max-w-sm">
              The only AI career counselor that destroys your ego to build your character. (Not really, we just roast you).
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-orange-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Pricing (It's Free)</a></li>
              <li><a href="https://aistudio.google.com/" className="hover:text-orange-400 transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Insult</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Emotional Damages</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Resume Roaster. Made with 💔 by <span>
              <a href="https://www.linkedin.com/in/omsai-desai" className="hover:text-orange-400 transition-colors"> Omsai Desai</a>
            </span>
           
          </p>
          <div className="flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-green-500"></span>
  <span className="text-gray-500 text-xs">
    System Status: Online & Savage
  </span>
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Upload, FileText, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  error?: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, error }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-gray-900 border-2 border-dashed border-gray-700 hover:border-orange-500 rounded-lg p-10 flex flex-col items-center justify-center transition-all duration-300">
          <input
            type="file"
            accept=".pdf,.docx,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          <div className="bg-gray-800 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-orange-400" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Drop your resume here</h3>
          <p className="text-gray-400 text-center text-sm mb-4">
            PDF, DOCX, or Images (JPG/PNG). <br/> 
            <span className="text-orange-400 font-semibold">Max Size: 4MB</span> (We can't handle heavy files).
          </p>

          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md text-xs text-gray-400 border border-gray-700">
            <FileText className="w-4 h-4" />
            <span className="opacity-50">|</span>
            <ImageIcon className="w-4 h-4" />
            <span>Maximum fun, minimal chance of survival</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-200 animate-pulse">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
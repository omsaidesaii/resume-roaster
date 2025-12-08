import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import LoadingState from './components/LoadingState';
import RoastDisplay from './components/RoastDisplay';
import LandingContent from './components/LandingContent';
import Footer from './components/Footer';
import { processFile } from './services/fileService';
import { generateRoast } from './services/geminiService';
import { AppStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [roastText, setRoastText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setStatus(AppStatus.PARSING);
    setErrorMessage(null);

    try {
      // 1. Process File (Extract Text or Convert to Base64 for multimodal)
      const processedFile = await processFile(file);
      
      // Basic validation
      if (processedFile.isText && processedFile.data.length < 50) {
        throw new Error("Text extraction failed or resume is too short. Try uploading it as an Image/PDF instead.");
      }

      // 2. Roast It
      setStatus(AppStatus.ROASTING);
      const roast = await generateRoast(processedFile);
      
      setRoastText(roast);
      setStatus(AppStatus.COMPLETE);

    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Something went wrong. Even the error is confused.");
      setStatus(AppStatus.IDLE); // Go back to idle to allow retry
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setRoastText("");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#111] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#111] to-[#000] text-white flex flex-col font-sans">
      
      <Navbar />

      <div className="flex-grow flex flex-col">
        {/* HERO SECTION CONTAINER */}
        <div className={`container mx-auto px-4 ${status === AppStatus.IDLE ? 'pt-32 pb-10' : 'pt-24'}`}>
          
          {/* Always show Header (maybe slightly adapted in future, but fine for now) */}
          {status !== AppStatus.COMPLETE && <Header />}

          <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
            
            {status === AppStatus.IDLE && (
              <div className="animate-fade-in w-full mb-12">
                <FileUpload 
                  onFileSelect={handleFileSelect} 
                  error={errorMessage} 
                />
              </div>
            )}

            {(status === AppStatus.PARSING || status === AppStatus.ROASTING) && (
              <LoadingState />
            )}

            {status === AppStatus.COMPLETE && (
              <RoastDisplay 
                roast={roastText} 
                onReset={handleReset} 
              />
            )}

            {status === AppStatus.ERROR && (
              <div className="text-center p-8 bg-red-900/10 border border-red-500/30 rounded-xl max-w-md mx-auto mt-8">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Error 404: Skill Not Found</h2>
                <p className="text-gray-300 mb-6">{errorMessage}</p>
                <button 
                  onClick={handleReset}
                  className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition"
                >
                  Try Again
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Marketing Content - Only visible on Landing Page (IDLE) */}
        {status === AppStatus.IDLE && (
          <div className="animate-fade-in-up delay-200">
            <LandingContent />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
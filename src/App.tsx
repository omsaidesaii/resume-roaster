import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FileUpload from './components/FIleUpload';
import LoadingState from './components/LoadingState';
import RoastDisplay from './components/RoastDialog';
import LandingContent from './components/LandingContent';
import Footer from './components/Footer';
import { processFile } from './services/fileService';
import { generateRoast } from './services/geminiService';
import type { AppStatus } from './type';
import { APP_STATUS_VALUES } from './type';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(APP_STATUS_VALUES.IDLE);
  const [roastText, setRoastText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setStatus(APP_STATUS_VALUES.PARSING);
    setErrorMessage(null);

    try {
      // 1. Process File (Extract Text or Convert to Base64 for multimodal)
      const processedFile = await processFile(file);
      
      // Basic validation
      if (processedFile.isText && processedFile.data.length < 50) {
        throw new Error("Text extraction failed or resume is too short. Try uploading it as an Image/PDF instead.");
      }

      // 2. Roast It
      setStatus(APP_STATUS_VALUES.ROASTING);
      const roast = await generateRoast(processedFile);
      
      setRoastText(roast);
      setStatus(APP_STATUS_VALUES.COMPLETE);

    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Something went wrong. Even the error is confused.");
      setStatus(APP_STATUS_VALUES.IDLE); // Go back to idle to allow retry
    }
  };

  const handleReset = () => {
    setStatus(APP_STATUS_VALUES.IDLE);
    setRoastText("");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#111] bg-[radial-gradient(ellipse_at_top,_#111827_0%,_#111111_50%,_#000000_100%)] text-white flex flex-col font-sans">
      
      <Navbar />

      <div className="flex-grow flex flex-col">
        {/* HERO SECTION CONTAINER */}
        <div className={`container mx-auto px-4 ${status === APP_STATUS_VALUES.IDLE ? 'pt-32 pb-10' : 'pt-24'}`}>
          
          {/* Always show Header (maybe slightly adapted in future, but fine for now) */}
          {status !== APP_STATUS_VALUES.COMPLETE && <Header />}

          <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
            
            {status === APP_STATUS_VALUES.IDLE && (
              <div className="animate-fade-in w-full mb-12">
                <FileUpload 
                  onFileSelect={handleFileSelect} 
                  error={errorMessage} 
                />
              </div>
            )}

             {(status === APP_STATUS_VALUES.PARSING || status === APP_STATUS_VALUES.ROASTING) && (
              <LoadingState />
            )}

            {status === APP_STATUS_VALUES.COMPLETE && (
              <RoastDisplay 
                roast={roastText} 
                onReset={handleReset} 
              />
            )}

            {status === APP_STATUS_VALUES.ERROR && (
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
        {status === APP_STATUS_VALUES.IDLE && (
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
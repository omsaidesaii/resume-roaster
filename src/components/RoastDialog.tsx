import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { RefreshCw, Copy } from 'lucide-react';
import { searchGif, FALLBACK_GIFS } from '../services/tenorService.ts';

interface RoastDisplayProps {
  roast: string;
  onReset: () => void;
}

const RoastDisplay: React.FC<RoastDisplayProps> = ({ roast, onReset }) => {
  const [processedRoast, setProcessedRoast] = useState<string>(roast);

  const handleCopy = () => {
    navigator.clipboard.writeText(roast);
    alert("Roast copied! Go insult yourself in the group chat.");
  };

  // Process the roast to replace meme placeholders with actual GIFs
  useEffect(() => {
    const processRoast = async () => {
      let updatedRoast = roast;
      
      // Find all image markdown patterns
      const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
      const matches = [...roast.matchAll(imageRegex)];
      
      // Process all matches concurrently
      const replacements = await Promise.all(
        matches.map(async (match) => {
          const [fullMatch, altText, imageUrl] = match;
          
          // Check if it's a Tenor search term (using our custom scheme)
          if (imageUrl.startsWith('tenor:')) {
            // Extract search term from our custom scheme
            const searchTerm = imageUrl.substring(6); // Remove 'tenor:' prefix
            
            // Try to fetch a GIF based on the search term
            try {
              const gifUrl = await searchGif(searchTerm);
              
              if (gifUrl) {
                return {
                  original: fullMatch,
                  replacement: `![${altText}](${gifUrl})`
                };
              } else {
                // Use fallback GIF
                // Try to match the search term to a specific fallback
                let fallbackKey = "generic";
                if (searchTerm.toLowerCase().includes("bad") && searchTerm.toLowerCase().includes("format")) {
                  fallbackKey = "bad-resume-formatting";
                } else if (searchTerm.toLowerCase().includes("fake") && searchTerm.toLowerCase().includes("skill")) {
                  fallbackKey = "fake-skills";
                } else if (searchTerm.toLowerCase().includes("career") || searchTerm.toLowerCase().includes("advice")) {
                  fallbackKey = "career-advice";
                } else if (searchTerm.toLowerCase().includes("overconfident") || searchTerm.toLowerCase().includes("jalwa")) {
                  fallbackKey = "overconfident";
                }
                
                const fallbackGif = FALLBACK_GIFS[fallbackKey as keyof typeof FALLBACK_GIFS] || 
                                  FALLBACK_GIFS.generic;
                return {
                  original: fullMatch,
                  replacement: `![${altText}](${fallbackGif})`
                };
              }
            } catch (error) {
              console.error("Error processing meme:", error);
              // Use fallback GIF
              const fallbackGif = FALLBACK_GIFS.generic;
              return {
                original: fullMatch,
                replacement: `![${altText}](${fallbackGif})`
              };
            }
          }
          
          // Return unchanged if not a Tenor search term
          return {
            original: fullMatch,
            replacement: fullMatch
          };
        })
      );
      
      // Apply all replacements
      replacements.forEach(({ original, replacement }) => {
        updatedRoast = updatedRoast.replace(original, replacement);
      });
      
      setProcessedRoast(updatedRoast);
    };
    
    processRoast();
  }, [roast]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in-up">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">
        
        {/* Report Header Bar */}
        <div className="bg-gradient-to-r from-red-950 via-gray-900 to-gray-900 p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-gray-400 font-mono tracking-wider">CONFIDENTIAL // ROAST-REPORT.md</span>
          </div>
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium"
            title="Copy Text"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy Report</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 text-gray-300 leading-relaxed font-sans">
          <ReactMarkdown
            components={{
              // H1: Main Title
              h1: ({node, ...props}) => (
                <div className="mb-10 text-center pb-6 border-b-2 border-dashed border-gray-800">
                   <h1 {...props} className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm uppercase italic" />
                </div>
              ),
              // H2: Section Headers
              h2: ({node, ...props}) => (
                <h2 {...props} className="text-2xl font-bold text-orange-400 mt-10 mb-6 pb-2 border-b border-gray-700 flex items-center gap-2" />
              ),
              // H3: Subheaders (like the Award)
              h3: ({node, ...props}) => (
                <h3 {...props} className="text-xl font-bold text-yellow-400 mt-8 mb-4 bg-yellow-900/20 p-3 rounded-lg border border-yellow-500/30 inline-block" />
              ),
              // P: Paragraphs
              p: ({node, ...props}) => <p className="mb-4 text-lg font-light leading-7 text-gray-200" {...props} />,
              // UL: Unordered Lists
              ul: ({node, ...props}) => <ul className="space-y-3 my-6 pl-4" {...props} />,
              // LI: List Items
              li: ({node, ...props}) => (
                <li className="flex items-start gap-3 text-lg group">
                   <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 group-hover:scale-150 transition-transform"/> 
                   <span className="flex-1" {...props} />
                </li>
              ),
              // Strong/Bold Text
              strong: ({node, ...props}) => <strong className="font-bold text-red-300" {...props} />,
              // Blockquote (Verdict)
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-orange-500 bg-gray-900/80 p-6 rounded-r-lg my-8 italic text-xl text-gray-300 shadow-inner relative overflow-hidden" {...props}>
                   <div className="absolute top-0 right-0 p-2 opacity-10">
                     <span className="text-6xl text-white">"</span>
                   </div>
                </blockquote>
              ),
              // HR: Divider
              hr: ({node, ...props}) => <hr className="border-gray-800 my-10" {...props} />,
              // Images (Memes)
              img: ({node, ...props}) => {
                const {src, alt} = props as any;
                if (!src) return null;
                
                // Use a span wrapper because standard markdown parsers put images inside <p> tags.
                // A <div> inside a <p> is invalid HTML and causes rendering issues (React hydration or browser auto-correction).
                return (
                  <span className="block my-8 relative group max-w-md mx-auto">
                    <span className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></span>
                    <img 
                      src={src} 
                      alt={alt || "Meme"}
                      className="relative rounded-lg shadow-2xl w-full border border-gray-700 bg-gray-900" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to a default SVG if the image fails to load
                        e.currentTarget.src = FALLBACK_GIFS.generic;
                        // If even the SVG fails, show a simple colored div
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.backgroundColor = "#333";
                        e.currentTarget.style.minHeight = "200px";
                        e.currentTarget.style.display = "flex";
                        e.currentTarget.style.alignItems = "center";
                        e.currentTarget.style.justifyContent = "center";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.fontFamily = "Arial, sans-serif";
                        e.currentTarget.textContent = "Meme Placeholder";
                      }}
                    />
                    <span className="block text-center mt-2 text-xs text-gray-600 font-mono">Figure: Emotional Damage</span>
                  </span>
                );
              },
            }}
          >
            {processedRoast}
          </ReactMarkdown>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-950 p-6 flex flex-col items-center justify-center border-t border-gray-800 gap-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-500 hover:scale-105 transition-all transform shadow-xl shadow-orange-900/20 group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Roast Another Resume
          </button>
          <p className="text-gray-600 text-sm">Don't take it personally. AI is just a bunch of if-else statements.</p>
        </div>
      </div>
    </div>
  );
};

export default RoastDisplay;
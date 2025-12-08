import { TENOR_API_KEY } from "../constants.ts";

// Cache for storing fetched GIFs to avoid redundant API calls
const gifCache: Record<string, string> = {};

// Function to search for GIFs using Tenor API
export const searchGif = async (query: string): Promise<string | null> => {
  // Return cached result if available
  if (gifCache[query]) {
    return gifCache[query];
  }

  // If no API key, return a default GIF
  if (!TENOR_API_KEY) {
    console.warn("Tenor API key not found, returning placeholder");
    const defaultGif = "https://media.tenor.com/262I3JtT0joAAAAM/bawasir-panchayat.gif";
    gifCache[query] = defaultGif;
    return defaultGif;
  }

  try {
    const clientKey = "resume-roaster-app";
    const limit = 1;
    
    // Properly encode the query parameter
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://tenor.googleapis.com/v2/search?q=${encodedQuery}&key=${TENOR_API_KEY}&client_key=${clientKey}&limit=${limit}`;
    
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`Tenor API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Return the GIF URL in the best available format
      const gif = data.results[0];
      const gifUrl = gif.media_formats?.gif?.url || gif.url;
      
      // Cache the result
      gifCache[query] = gifUrl;
      return gifUrl;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching GIF from Tenor:", error);
    return null;
  }
};

// Function to register a share event with Tenor (for analytics)
export const registerShare = async (gifId: string, searchTerm: string) => {
  if (!TENOR_API_KEY) return;
  
  try {
    const clientKey = "resume-roaster-app";
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const shareUrl = `https://tenor.googleapis.com/v2/registershare?id=${gifId}&key=${TENOR_API_KEY}&client_key=${clientKey}&q=${encodedSearchTerm}`;
    
    await fetch(shareUrl);
  } catch (error) {
    console.error("Error registering share with Tenor:", error);
  }
};

// Predefined fallback SVG data URLs for common scenarios
export const FALLBACK_GIFS = {
  "bad-resume-formatting": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23fff'%3EBad Resume%3C/text%3E%3C/svg%3E`,
  "fake-skills": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23fff'%3EFake Skills%3C/text%3E%3C/svg%3E`,
  "career-advice": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23fff'%3ECareer Advice%3C/text%3E%3C/svg%3E`,
  "overconfident": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23fff'%3EOverconfident%3C/text%3E%3C/svg%3E`,
  "generic": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23fff'%3EMeme%3C/text%3E%3C/svg%3E`
};

// Function to get a colored 1x1 pixel GIF as fallback
const getColoredPixelGif = (color = "ff0000") => {
  return `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`;
};

// Test to verify URLs are working
const verifyFallbackUrls = () => {
  Object.entries(FALLBACK_GIFS).forEach(([key, url]) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          console.warn(`Fallback GIF URL for '${key}' returned status ${response.status}`);
        }
      })
      .catch(error => {
        console.warn(`Failed to fetch fallback GIF for '${key}':`, error);
      });
  });
};

// Uncomment the line below to test URLs (comment out for production)
// verifyFallbackUrls();

// Test function to verify the service is working
export const testTenorService = async () => {
  console.log("Testing Tenor service...");
  try {
    const testQuery = "funny resume";
    const result = await searchGif(testQuery);
    console.log(`Test result for "${testQuery}":`, result);
    return result;
  } catch (error) {
    console.error("Test failed:", error);
    return null;
  }
};
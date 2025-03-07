
import { useState, useEffect } from 'react';
import { Establishment } from '@/data/establishmentData';

type EstablishmentEntry = [string, Establishment];

export function useSearchResults() {
  const [searchResults, setSearchResults] = useState<EstablishmentEntry[] | null>(null);
  
  useEffect(() => {
    // Listen for the custom searchResults event
    const handleSearchResults = (event: CustomEvent) => {
      if (event.detail && event.detail.results) {
        setSearchResults(event.detail.results);
      }
    };
    
    // Add event listener
    window.addEventListener('searchResults', handleSearchResults as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('searchResults', handleSearchResults as EventListener);
    };
  }, []);
  
  // Function to clear search results
  const clearSearchResults = () => {
    setSearchResults(null);
  };
  
  return { searchResults, clearSearchResults };
}

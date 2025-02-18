import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'university';
  description: string;
  link: string;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch results');
        
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError('Failed to load search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-6 w-6 text-gray-400" />
        <h1 className="text-2xl font-semibold">
          Search Results for "{query}"
        </h1>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!isLoading && !error && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No results found for "{query}"</p>
          <p className="text-gray-400 mt-2">Try adjusting your search terms or browse our categories</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-medium text-gray-900">
                  <a href={result.link} className="hover:text-indigo-600">
                    {result.title}
                  </a>
                </h2>
                <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mt-2">
                  {result.type}
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
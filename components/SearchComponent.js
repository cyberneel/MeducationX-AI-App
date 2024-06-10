import React, { useState } from 'react';
import Fuse from 'fuse.js';
import diseases from '../public/conditions.json'; // Adjust the path if necessary
import DetailModal from './DetailModal';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const fuse = new Fuse(diseases, {
    keys: ['name', 'symptoms'],
    includeMatches: true,
    threshold: 0.3,
    distance: 25,
    minMatchCharLength: 2
  });

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      const symptoms = searchQuery.split(',').map(symptom => symptom.trim());
      const allResults = [];
      symptoms.forEach(symptom => {
        const searchResults = fuse.search(symptom);
        allResults.push(...searchResults);
      });
      const combinedResults = combineResults(allResults);
      setResults(combinedResults);
    } else {
      setResults([]);
    }
  };

  const combineResults = (allResults) => {
    const resultsMap = new Map();
    allResults.forEach(result => {
      if (!resultsMap.has(result.item.name)) {
        resultsMap.set(result.item.name, result);
      } else {
        // Merge matches
        const existingResult = resultsMap.get(result.item.name);
        existingResult.matches = existingResult.matches.concat(result.matches);
      }
    });
    return Array.from(resultsMap.values());
  };

  const highlightMatches = (text, matches) => {
    if (!matches || matches.length === 0) return text;

    let highlightedText = text;
    matches.forEach(({ indices }) => {
      indices.forEach(([start, end]) => {
        const match = text.substring(start, end + 1);
        highlightedText = highlightedText.replace(match, `<mark>${match}</mark>`);
      });
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const handleResultClick = (disease) => {
    setSelectedDisease(disease);
  };

  const handleCloseModal = () => {
    setSelectedDisease(null);
  };

  return (
    <div style={{textAlign:'center'}}>
      <input 
        type="text" 
        value={query} 
        onChange={handleSearch} 
        placeholder="Search for diseases..."
        style={{ padding: '10px', margin: '10px 0', fontSize: '16px' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((result, index) => (
          <li 
            key={index} 
            style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}
            onClick={() => handleResultClick(result.item)}
          >
            <h3>{highlightMatches(result.item.name, result.matches ? result.matches.filter(m => m.key === 'name') : [])}</h3>
            <p><strong>Symptoms:</strong> {result.item.symptoms.map((symptom, i) => (
              <span key={i}>
                {highlightMatches(symptom, result.matches ? result.matches.filter(m => m.key === 'symptoms' && m.value === symptom) : [])}
                {i < result.item.symptoms.length - 1 && ', '}
              </span>
            ))}</p>
            
          </li>
        ))}
      </ul>
      <DetailModal isOpen={selectedDisease !== null} onClose={handleCloseModal} disease={selectedDisease} />
    </div>
  );
};

export default SearchComponent;

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import data from '../public/data.json';
import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/Layout';

const Home = () => {
  const [results, setResults] = useState([]);
  const [queryHome, setQueryHome] = useState('');

  const handleSearch = (query) => {
    if (query) {
      setQueryHome(query)
      //queryMain = query.toString();
      //console.log(typeof(queryMain));
      const filteredData = data
        .filter(item => {
          const nameMatch = item.name.toLowerCase().includes(query.toLowerCase());
          const emailMatch = item.email.toLowerCase().includes(query.toLowerCase());
          return nameMatch || emailMatch;
        })
        .sort((a, b) => {
          const aMatches = countMatches(a, query);
          const bMatches = countMatches(b, query);
          return bMatches - aMatches; // Sort by number of matches
        });
      setResults(filteredData);
    } else {
      setResults([]);
    }
  };

  const countMatches = (item, query) => {
    const regex = new RegExp(query, 'gi');
    const nameMatches = (item.name.match(regex) || []).length;
    const emailMatches = (item.email.match(regex) || []).length;
    return nameMatches + emailMatches;
  };

  const highlightMatch = (text, queryLocal) => {
    if (queryLocal == "k") return text;
    //console.log(queryLocal);
    const regex = new RegExp(`(${queryLocal})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === queryLocal.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div style={{textAlign: 'center'}}>
      <Head>
        <title>MedX Plus</title>
      </Head>
      <h1>Search MedX Database</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map(item => (
              <li key={item.id} className={styles.resultListItem}>
                {highlightMatch(item.name, queryHome)} - {highlightMatch(item.email, queryHome)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Home;

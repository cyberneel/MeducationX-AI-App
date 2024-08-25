import { useState } from 'react';
import LoadingSpinnerLLM from '../components/LoadingSpinnerLLM';
import styles from './chat.module.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      
      // Parse and format the response text
      const formattedResponse = formatResponse(data.response);
      setResponse(formattedResponse);
    } catch (error) {
      console.error(error);
      setResponse('Error: Unable to get a response');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const formatResponse = (text) => {
    // Convert **text** to <strong>text</strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert lines starting with * or - to list items
    formattedText = formattedText.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> elements with <ul>
    formattedText = formattedText.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

    return formattedText;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Med+ AI Assistant</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="symptoms">What are your symptoms?</label>
        <textarea 
          id="symptoms"
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          required 
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
      {loading && <LoadingSpinnerLLM />}
      <div className={styles.responseContainer}>
        <h2 className={styles.responseHeading}>Response:</h2>
        <div 
          className={styles.responseContent}
          dangerouslySetInnerHTML={{ __html: response }} 
        />
      </div>
    </div>
  );
}

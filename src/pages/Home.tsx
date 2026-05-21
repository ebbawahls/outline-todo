import { useEffect, useState } from 'react';
import { getRandomQuote } from '../api/quotesApi';
import type { Quote } from '../types/Quote';

export function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const data = await getRandomQuote();
        setQuote(data);
      } catch (error) {
        console.error('Failed to load quote', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, []);

  return (
    <div className="homePage">
      <h1>Organize the thoughts and outline what needs to be done</h1>
      {loading ? (
        <p>Loading quote...</p>
      ) : (
        quote && (
          <div className="quoteBox">
            <p>"{quote.quote}"</p>
            <span>- {quote.author}</span>
          </div>
        )
      )}
    </div>
  );
}

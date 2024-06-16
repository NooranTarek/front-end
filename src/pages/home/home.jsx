import React, { useEffect, useState } from 'react';
import './home.css';
import { getAllPopularSources } from '../../axios/source.axios';

const Home = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await getAllPopularSources();
        console.log('Fetched sources:', response.data); 
        if (Array.isArray(response.data)) {
          setSources(response.data);
        } else {
          setSources([]);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSources();
  }, []);



  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='page-container'>
      <header className='header'>
        <h1>Most Subscribed Sources</h1>
      </header>
      <main className='main'>
        {Array.isArray(sources) && sources.length > 0 ? (
          sources.map((source, index) => (
            <article key={index} className='article'>
              <div className='name'>
                <h2 className='title'>{source.name}</h2>
              </div>
              <div className='details'>
                <p className='summary'>{source.description}</p>
              </div>
              <div className='details'>
                <p className='summary'>{source.subscribers}</p>
              </div>
            </article>
          ))
        ) : (
          <p>No Popular sources available.</p>
        )}
      </main>
    </div>
  );
};

export default Home;

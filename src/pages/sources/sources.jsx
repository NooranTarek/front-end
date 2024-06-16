import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import './source.css';
import { getAllSources, subscribeToSource, unsubscribeFromSource } from '../../axios/source.axios';

const Source = () => {
  const [userId, setUserId] = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('decodedToken.user._id:', decodedToken.user._id); 
        setUserId(decodedToken.user._id); 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    const fetchSources = async () => {
      try {
        const data = await getAllSources();
        console.log('Fetched sources:', data); 
        if (Array.isArray(data)) {
          setSources(data);
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

  const handleSubscribe = async (sourceId) => {
    try {
      const response = await subscribeToSource({ userId, sourceId });
      console.log(response); 
      Swal.fire({
        title: 'Subscribed!',
        text: 'You have successfully subscribed to the source.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Subscribe error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Already SUBSCRIBED OR Failed to subscribe to the source.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUnsubscribe = async (sourceId) => {
    try {
      const response = await unsubscribeFromSource({ userId, sourceId });
      console.log(response); 
      Swal.fire({
        title: 'Unsubscribed!',
        text: 'You have successfully unsubscribed from the source.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Unsubscribe error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Already SUBSCRIBED OR Failed to subscribe to the source',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='page-container'>
      <header className='header'>
        <h1>Sources</h1>
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
                <p><strong>Category:</strong> {source.category}</p>
                <p><strong>Language:</strong> {source.language}</p>
                <p><strong>Country:</strong> {source.country}</p>
                <div className='button-group'>
                  <button className='details-button'>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">More</a>
                  </button>
                  <button className='subscribe-button' onClick={() => handleSubscribe(source.id)}>Subscribe</button>
                  <button className='unsubscribe-button' onClick={() => handleUnsubscribe(source.id)}>Unsubscribe</button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>No sources available.Login First</p>
        )}
      </main>
    </div>
  );
};

export default Source;

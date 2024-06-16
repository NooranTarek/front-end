import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './history.css';
import { getUserLogs } from '../../axios/history.axios';

const History = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [history, setHistory] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.user._id);
          setUserName(decodedToken.user.fullName);
          setUserEmail(decodedToken.user.email);

        }

        const response = await getUserLogs();
        console.log('History response:', response);

        if (response && Array.isArray(response)) {
          setHistory(response);
        } else {
          setHistory([]); 
        }

        setLoading(false);
      } catch (error) {
        console.error('Fetch history error:', error);
        setError('Failed to fetch history');
        setLoading(false);
      }
    };

    fetchHistory();
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
        <h1>User Logs History</h1>
      </header>
      <main className='main'>
        {Array.isArray(history) && history.length > 0 ? (
          history.map((log, index) => (
            <article key={index} className='article'>
              <div className='details'>
                <p><strong>User:</strong> {userName} ({userEmail})</p>
                <p><strong>Action:</strong>  <span style={{ color: log.success ? 'green' : 'red' }}>
                    {log.success ? 'Successful' : 'Failed'}
                  </span></p>
                <p><strong>Date:</strong> {new Date(log.timestamp).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleTimeString()}</p>
                
              </div>
            </article>
          ))
        ) : (
          <p>No news history available.</p>
        )}
      </main>

    </div>
  );
};

export default History;

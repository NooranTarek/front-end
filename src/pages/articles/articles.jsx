import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './articles.css';
import { getNews } from '../../axios/news.axios';

const Articles = () => {
  const [userId, setUserId] = useState(null);
  const [articles, setArticles] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.user._id);
        }

        const response = await getNews();
        console.log('News response:', response);

        if (response && Array.isArray(response)) {
          setArticles(response);
        } else {
          setArticles([]); 
        }

        setLoading(false);
      } catch (error) {
        console.error('Fetch news error:', error);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
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
        <h1>News Articles</h1>
      </header>
      <main className='main'>
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article, index) => (
            <article key={index} className='article'>
              <div className='title'>
                <h2>{article.title}</h2>
              </div>
              <div className='details'>
                <p className='description'>{article.description}</p>
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
              </div>
            </article>
          ))
        ) : (
          <p>No articles available.Login First</p>
        )}
      </main>

    </div>
  );
};

export default Articles;
